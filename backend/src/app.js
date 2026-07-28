import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

import router from "./routes/user.route.js";
import jobRouter from "./routes/jobs.route.js";


const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use('/api/v1/user', router)
app.use('/api/v1/job', jobRouter)

export default app;