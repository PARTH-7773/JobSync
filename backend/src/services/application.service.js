import mongoose from "mongoose";
import Application from "../models/applications.model.js";


export const createApplication = async (user_id, job_id, cover_letter) => {
    if (!user_id || !job_id || !cover_letter) {
        throw new Error("All fields are required for job application");
    }

    const apply = await Application.create({ seeker_id: user_id, job_id, cover_letter })

    return apply;
}

export const getAllApplied = async (seeker_id) => {
    if (!seeker_id) {
        throw new Error("User ID is required for get all application.");
    }

    // console.log(user_id)

    // return await Application.find({ seeker_id: user_id });

    const _id = new mongoose.Types.ObjectId(seeker_id);
    const Jobs = await Application.aggregate([
        { $match: { seeker_id: _id } },
        {
            $lookup: {
                from: 'jobs',
                localField: 'job_id',
                foreignField: '_id',
                as: 'job_detail',

                pipeline: [{
                    $lookup: {
                        from: 'companies',
                        localField: 'company_id',
                        foreignField: '_id',
                        as: 'company_detail'
                    }
                }, {
                    $unwind: '$company_detail'
                }]
            }
        },
        { $unwind: "$job_detail" },

        { $sort: { createdAt: -1 } }
    ])
    return Jobs
}

export const getApplication = async (user_id, job_id) => {
    if (!job_id) {
        throw new Error("Job Id required for get application");
    }

    return await Application.findOne({ seeker_id: user_id, job_id })
}

export const getJobsApplication = async (emp_id) => {
    // if (jobsIds.length < 0 || !jobsIds) {
    //     throw new Error("Jobs Application Not Availables");
    // }

    // const applications = await jobsIds.map(async(id) => {
    //     return await Application.find({ job_id: id })
    // })

    // return applications;

    const employer_id = new mongoose.Types.ObjectId(emp_id);

    const dashBoardData = await Application.aggregate([
        // 1. Loo up job datails
        {
            $lookup: {
                from: 'jobs',
                localField: 'job_id',
                foreignField: '_id',
                as: 'job'
            }
        },
        { $unwind: '$job' },
        // 2. Looking up company details using job.company_id
        {
            $lookup: {
                from: 'companies',
                localField: 'job.company_id',
                foreignField: '_id',
                as: 'company'
            }
        },
        { $unwind: '$company' },

        // 3. Filter applications where the company owner matches employer_id 
        {
            $match: {
                'company.user_id': employer_id
            }
        },

        // 4. Look up applicant(seeker) details
        {
            $lookup: {
                from: 'users',
                localField: 'seeker_id',
                foreignField: '_id',
                as: 'applicant'
            }
        },
        { $unwind: '$applicant' },
        // 5. Group all applications by Job ID 
        {
            $group: {
                _id: '$job._id',
                jobTitle: { $first: '$job.title' },
                jobLocation: { $first: '$job.location' },
                jobType: { $first: '$job.job_type' },
                companyName: { $first: '$company.company_name' },
                totalApplications: { $sum: 1 },
                application: {
                    $push: {
                        applicationId: '$_id',
                        applicantName: '$applicant.fullname',
                        applicantEmail: '$applicant.email',
                        cover_letter:'$cover_letter',
                        status: '$status',
                        appliedAt: '$applied_date',
                    }
                }
            }
        },
        { $sort: { totalApplications: -1 } }
    ])

    return dashBoardData
}