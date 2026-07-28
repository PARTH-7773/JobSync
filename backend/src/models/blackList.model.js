import mongoose from "mongoose";

const blackListShema = new mongoose.Schema({
   token: {
        type: String,
        required: [true,"Token is required to blacklist"],
        unique: [true, "Token is already blacklisted"]
    }
},{
    timestamps: true
})

blackListShema.index({ createAt: 1},{
    expireAfterSeconds: 60 * 60 * 24 * 3
})

const BlackListToken = mongoose.model("backlistToken", blackListShema);
export default BlackListToken;