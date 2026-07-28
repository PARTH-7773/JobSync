import http from "http"
import app from "./src/app.js"
import config from "./src/config/ENV.config.js";
import connectDB from "./src/config/db.config.js";

const server = http.createServer(app);

server.listen(config.PORT,()=>{
    console.log(`Server is running port http://localhost:${config.PORT}`)
    connectDB()
})