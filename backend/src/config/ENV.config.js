import dotenv from "dotenv";
dotenv.config()


if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI  not defined in envornment variabls");
}


const config = {
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_URI:process.env.MONGO_URI,
    PORT:process.env.PORT,
}

export default config;