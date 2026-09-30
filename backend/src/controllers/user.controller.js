import { validationResult } from "express-validator";
import Redis from 'ioredis'
import { createUser, seekerProfile, seekerProfileUpdate } from "../services/user.service.js";
import BlackListToken from "../models/blackList.model.js";
import User from "../models/user.model.js";

// Redis Client
const redis = new Redis(process.env.REDIS_URI)

const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log(errors.array());
        return res.status(400).json({ data: errors.array() })
    }

    // console.log(req.body)
    const { fullname, username, email, password, role } = req.body
    if (await User.findOne({
        $or: [{ email }, { username }]
    })) {
        return res.status(422).json({
            success: false,
            message: "User already exist",
        })
    }
    const hasedPassword = await User.hashPassword(password)
    // console.log(hasedPassword);
    const { user, token } = await createUser({ fullname, username, email, hasedPassword, role })


    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        samSite: "strict",
        maxAge: 60 * 60 * 24 * 3 * 1000
    })

    redis.set(`user:${user._id}`, JSON.stringify(user), 'EX', 60 * 60 * 24 * 3);
    res.status(201).json({
        success: true,
        message: "User register successfully",
        data: user,
        token
    })
}

const loginUser = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "User not found"
        })
    }

    const matchPassword = await user.comparePassword(password);
    // console.log(validPassword);
    if (!matchPassword) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password",
            data: null
        })
    }

    const token = await user.generateAuthToken()
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        samSite: "lax",
        maxAge: 60 * 60 * 24 * 1000
    })
    user.password = undefined
    redis.set(`user:${user._id}`, JSON.stringify(user), 'EX', 60 * 60 * 24 * 3);
    res.status(200).json({
        success: true,
        message: "User login success.",
        data: user,
        token
    })
}

const getUserProfile = async (req, res) => {
    // console.log('wait broo',req.user)

    // return res.status(200).json({
    //     success: true,
    //     message: "User profile fetch success",
    //     data: req.user
    // })
    const user = await redis.get(`user:${req.user._id}`)
    // console.log(user)

    return res.status(200).json({
        success: true,
        message: "Redis data fetch",
        data: JSON.parse(user)
    })
}

const logoutUser = async (req, res) => {

    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    await BlackListToken.create({ token: token })
    res.clearCookie('token');

    redis.del(`user:${req.user._id}`)
    res.status(200).json({
        success: true,
        message: "User logged out"
    })
}

const updateSeekerProfile = async (req, res) => {
    const { _id } = req.user
    const { phone, skills, experience, education } = req.body

    if (!skills || !experience || !education) {
        return res.status(400).json({
            success: false,
            message: "All feilds are required"
        })
    }
    try {
        const seeker = await seekerProfileUpdate(_id, skills, experience, education)
        return res.status(200).json({
            success: true,
            message: "Seeker profile update successfully.",
            data: seeker
        })
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            return res.status(401).json({
                success: false,
                message: error.message
            })  
        }
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getSeekerProfile = async (req, res) => {
    const user_id = req.user._id;
    try {
        const profile = await seekerProfile(user_id);
        return res.status(profile ? 200 : 404).json({
            success: profile ? true : false,
            message: profile ? "Seeker profile fetched" : "Seeker Not Found",
            data: profile ? profile : null
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export default { registerUser, loginUser, getUserProfile, logoutUser, updateSeekerProfile, getSeekerProfile }

