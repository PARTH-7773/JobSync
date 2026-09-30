import SeekerProfile from "../models/seekerProfile.model.js";
import User from "../models/user.model.js";

export const createUser = async ({ fullname, username, email, hasedPassword, role }) => {
    if (!fullname || !username || !email || !hasedPassword) {
        throw new Error("All fields are required.");
    }
    const user = await User.create({
        fullname, username,
        email,
        password: hasedPassword, role: role ? role : 'seeker'
    });

    const token = await user.generateAuthToken()
    if (user.role === 'seeker') {
        createSeekerProfile(user)
    }
    user.toObject()

    user.password = undefined

    return { user, token }
}

export const findUserDB = async (email) => {
    if (!email) {
        throw new Error("Email not exist");
    }
    return await userModel.findOne({ email }).select("+password")
}


export const createSeekerProfile = async (user) => {
    if (!user) {
        throw new Error("User Details are required for creating the seeker profile");
    }

    const seeker = await SeekerProfile.create({ user_id: user._id })
    // console.log(seeker)
}


export const seekerProfileUpdate = async (user_id, skills, experience, education) => {
    if (!user_id || !skills || !experience || !education) {
        throw new Error("All feilds are required!");
    }
    const seeker = await SeekerProfile.findOneAndUpdate({ user_id }, { skills, experience, education }, { returnDocument: "after" });

    return seeker
}

export const seekerProfile = async (user_id) => {
    if (!user_id) {
        throw new Error("Seeker ID is Missing");
    }

    return await SeekerProfile.findOne({ user_id })
}
