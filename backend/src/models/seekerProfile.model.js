import mongoose from "mongoose";

const seekerProfileSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "User ID is required"],
        unique:true,
        index: true
    },
    resume: {
        type: String,
    },
    skills: {
        type: String
    },
    experience: String,
    education: String

}, { timestamps: true })

const SeekerProfile = mongoose.model("seeker_profiles",seekerProfileSchema);

export default SeekerProfile;