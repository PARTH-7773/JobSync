import express from 'express';
import { employerMiddleware, seekerMiddleware } from '../middlewares/auth.middleware.js';
import applicationController from '../controllers/application.controller.js';


const applicationRouter = express.Router();


applicationRouter.get('/get-all-application', seekerMiddleware, applicationController.getAllApplications)
applicationRouter.post('/apply-job', seekerMiddleware, applicationController.applyJob)
applicationRouter.get('/me-applied/:_id', seekerMiddleware, applicationController.getApply)

// applicationRouter.get('/get-all-jobs-application/:jobs_id', employerMiddleware, applicationController.getAllJobsApplications)
applicationRouter.get('/get-all-jobs-application', employerMiddleware, applicationController.getAllJobsApplications)


export default applicationRouter;