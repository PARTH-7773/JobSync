import jwt from "jsonwebtoken";

import BlackListToken from "../models/blackList.model.js";
import config from "../config/ENV.config.js";
import User from "../models/user.model.js";


export const authMiddleware = async (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    // console.log(token)
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }

    try {
        const isBlackListed = await BlackListToken.findOne({ token })
        if (isBlackListed) {
            res.clearCookie('token');
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        const decode = jwt.verify(token, config.JWT_SECRET)
        // const user = await User.findById(decode._id);
        // req.user = user;

        req.user = decode
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
}

// export const captainMiddleware =async (req, res, next) => {
//     const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({
//             success: false,
//             message: "Unauthorized"
//         })
//     }

//     try {
//         const isBlackListToken = await BlackListToken.findOne({ token });
//         if (isBlackListToken) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Unauthorized"
//             })
//         }

//         const decoded = jwt.verify(token, config.JWT_SECRET);
//         const captain = await captainModel.findById(decoded._id);
//         req.captain = captain;
//         next();
//     } catch (error) {
//         return res.status(401).json({
//             success: false,
//             message: "Unauthorized"
//         })
//     }

// }

export const employerMiddleware = async (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }

    try {

        const blacklistToken = await BlackListToken.findOne({ token })
        if (blacklistToken) {
            req.clearCookie('token')
            return res.status(401).json({
                success: false,
                message: "Invalid token, Please login"
            })
        }
        const decoded = jwt.verify(token, config.JWT_SECRET);
        // console.log(decoded)
        if (decoded.role !== 'employer') {
            return res.status(403).json({
                success:false,
                message:"You don't have access"
            })
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
}

export const seekerMiddleware = async(req,res,next)=>{
    const token = req.cookies?.token || req.headers.authMiddleware?.split(" ")[ 1 ];

    if (!token) {
        return res.status(401).json({
            success:false,
            message:"Unauthorized"
        })
    }

    try {

        const blackListToken = await BlackListToken.findOne({token});
        if (blackListToken) {
            res.clearCookie('token')
            return res.status(401).json({
                success:false,
                message:"Invalid token please login"
            })
        }
        const decoded = await jwt.verify(token, config.JWT_SECRET);
        if (decoded.role !== 'seeker') {
            return res.status(403).json({
                success:false,
                message:"You can't have access"
            })
        }

        req.user = decoded;
        next();
        
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Unauthorized"
        })
    }
}