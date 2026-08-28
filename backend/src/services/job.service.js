import mongoose from "mongoose"
import Companies from "../models/companies.model.js"
import Job from "../models/job.model.js"

export const createJob = async ({ company_id, title, description, requirements, location, salary_range, job_type, category }) => {

    console.log(company_id, title, description, requirements, location, salary_range, job_type, category)
    if (!company_id || !title || !description || !requirements || !location || !salary_range || !job_type || !category) {
        throw new Error("All fields are required")
    }

    const companyExist = await Companies.findById(company_id)
    if (companyExist) {
        const job = await Job.create({
            company_id,
            title,
            description,
            requirements,
            location,
            salary_range,
            job_type,
            category
        })

        return job
    }

    return null
}


export const findjobs = async () => {
    return await Job.aggregate([{
        $match: { status: 'active' }
    }, {
        $lookup: {
            from: "companies",
            localField: 'company_id',
            foreignField: '_id',
            as: "company_detail"
        }
    }, {
        $unwind: "$company_detail"
    }, {
        $sort: { createdAt: -1 }
    }]).limit(6)
}

export const browseJobs = async () => {
    return await Job.aggregate([{
        $match: { status: 'active' }
    }, {
        $lookup: {
            from: "companies",
            localField: 'company_id',
            foreignField: '_id',
            as: "company_detail"
        }
    }, {
        $unwind: "$company_detail"
    }, {
        $sort: { createdAt: -1 }
    }])
}

export const findJob = async (_id) => {
    return await Job.findById(_id)
}

export const companyJobs = async (company_id) => {
    if (!company_id) {
        throw new Error("Company ID is Missing..");
    }
    return await Job.find({ company_id }).sort({ createdAt: -1 })
}       