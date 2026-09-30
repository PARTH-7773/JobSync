import { Router } from "express";
import { employerMiddleware } from "../middlewares/auth.middleware.js";
import jobController from "../controllers/jobs.controller.js";
import { newJobValdation } from "../validations/UserInput.validation.js";


const jobRouter = Router();
/**
 * @route - GET api/v1/job/get-all-jobs
 * @description - get all jobs
 * @access public 
*/
jobRouter.get('/get-all-jobs', jobController.getAllJobs)
/**
 * @route - POST api/v1/job/new-job
 * @description - create new job if only have access employer
 * @access private only employer are access this route  
*/
jobRouter.post('/new-job', employerMiddleware, newJobValdation, jobController.newJob)

jobRouter.get('/browse-all-jobs', jobController.browseAllJobs)

jobRouter.get("/get-job/:id", jobController.getJob);
jobRouter.get("/active-jobs/:company_id", employerMiddleware , jobController.activeJobs)

export default jobRouter;