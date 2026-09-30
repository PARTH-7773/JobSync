import { createApplication, getAllApplied, getApplication, getJobsApplication } from "../services/application.service.js";

const applyJob = async (req, res) => {

    const { job_id, cover_letter } = req.body
    const user_id = req.user._id;
    // console.log(user_id)

    try {
        const application = await createApplication(user_id, job_id, cover_letter)
        // console.log(application)
        return res.status(201).json({
            success: true,
            message: "Applied successfully",
            data: application
        })
    } catch (error) {

        if (error instanceof Error) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }

};
const getAllApplications = async (req, res) => {

    const user_id = req.user._id;
    try {
        const allApplications = await getAllApplied(user_id)


        return res.status(200).json({
            success: true,
            message: 'All applications fetch successfully',
            data: allApplications.length > 0 ? allApplications : null
        })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

const getApply = async (req, res) => {
    const job_id = req.params._id;
    const user_id = req.user._id;
    try {


        const job = await getApplication(user_id, job_id)
        // console.log(job)
        if (job) {
            return res.status(200).json({
                success: true,
                message: 'You are already applied this job post'
            })
        }
        return res.status(200).json({
            success: false,
        })

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// const getAllJobsApplications = async (req, res) => {

//     const ids = req.params.jobs_id;
//     let jobsIds = ids.split(',')
//     console.log(jobsIds)

//     try {

//         const applications = await getJobsApplication(jobsIds);
//         console.log(await applications)
//         if (applications.length > 0) {
//             // console.log('Application here -> ', await application);
//             return res.status(200).json({
//                 success: true,
//                 message: 'Jobs applications fetch succefully.',
//                 data:applications
//             })
//         }
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }


const getAllJobsApplications = async (req, res) => {

    const emp_id = req.user._id

    try {
        const applications = await getJobsApplication(emp_id);

        if (applications.length > 0) {
            return res.status(200).json({
                success: true,
                message: 'All applications fetch successfully',
                applications
            })
        }
        return res.status(200).json({
            success: true,
            message: 'No such applications exist.',
            applications: null
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export default { getAllApplications, applyJob, getApply, getAllJobsApplications }