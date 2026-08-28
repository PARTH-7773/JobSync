import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

import router from "./routes/user.route.js";
import jobRouter from "./routes/jobs.route.js";
import companieRouter from "./routes/companies.route.js";
import config from "./config/ENV.config.js";
import applicationRouter from "./routes/application.route.js";



const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: config.FRONTEND_URL,
    credentials: true
}))

app.use('/api/v1/user', router)
app.use('/api/v1/job', jobRouter)
app.use('/api/v1/companies', companieRouter)
app.use('/api/v1/application',applicationRouter)

export default app;