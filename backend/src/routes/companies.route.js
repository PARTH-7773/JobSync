import express from "express";
import { employerMiddleware } from "../middlewares/auth.middleware.js";
import companies from "../controllers/companies.controller.js";
import { NewCompanyValidation } from "../validations/UserInput.validation.js";

const companieRouter = express.Router();

companieRouter.post("/create-companie", employerMiddleware, NewCompanyValidation, companies.createComponie)
companieRouter.get("/get-coompanie-profile", employerMiddleware, companies.Profile)

export default companieRouter;