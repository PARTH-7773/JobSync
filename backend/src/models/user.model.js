import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/ENV.config.js";


const userSchme = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Usename is required'],
        unique: true,
        trim: true,
        lowarecase: true,
        minlength: [3, 'Username must 3 charactores long']
    },
    fullname: {
        type: String,
        required: [true, 'Fullname is required'],
        minlength: [5, 'Username must 3 charactores long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowarecase: true,
        unique: true,
        index: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,}$/, "Invalid email format"],
    },
    password: {
        type: String,
        required: [true, "Password is required for creating account"],
        minlength: [6, "Password should contain more than 6 character"],
        select: false
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        enum: ['seeker', 'admin', 'employer'],
        default: 'seeker'
    },
    phone: {
        type: String
    }

}, { timestamps: true })


userSchme.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchme.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, role: this.role }, config.JWT_SECRET, { expiresIn: '3d' });
    return token;
}

userSchme.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const User = mongoose.model('user', userSchme);

export default User;