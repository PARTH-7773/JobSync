import { validationResult } from "express-validator"
import { createJob, findJob, findjobs } from "../services/job.service.js"

const newJob = async (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }
    const { company_id, title, description, requirements, location, salary_range, job_type, category } = req.body

    try {
        const job = await createJob({ company_id, title, description, requirements, location, salary_range, job_type, category })
        console.log(job)

        return res.status(job ? 201 : 404).json({
            success: job ? true : false,
            message: job ? "Job create successfully" : 'Company not register',
            data: job ? job : null
        })
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    success: false,
                    message: error.message,
                })
            }
        }
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

async function getAllJobs(req, res) {
    try {
        return res.status(200).json({
            success: true,
            message: "Jobs fetch successfully",
            data: await findjobs()
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

async function getJob(req, res) {
    const _id = req.params.id;
    // console.log(_id)
    try {

        const job = await findJob(_id);
        return res.status(200).json({
            success:true,
            message:"Job fetched successfully",
            data:job
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export default { newJob, getAllJobs, getJob }