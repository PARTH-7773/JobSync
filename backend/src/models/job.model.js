import mongoose from "mongoose";


const jobSchema = new mongoose.Schema({
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "companie",
        required: [true, 'Company ID is required'],
        index:true
    },
    title: {
        type: String,
        required: [true, 'Job title is required'],
        minlength: [5, 'Job title must 5 charactors long']
    },
    description: {
        type: String,
        required: [true, 'Job description is required'],
        minlength: [10, 'Job description must 10 charactors long']
    },
    requirements: {
        type: String,
        required: [true, 'Job requirements is required'],
        minlength: [10, 'Job requirements must 10 charactors long']
    },
    location: {
        type: String,
        required: [true, 'Job location is required'],
        minlength: [3, 'Job location must 10 charactors long'],
        trim: true
    },
    salary_range: {
        type: String,
        required: [true, 'Job salary range is required'],
    },
    job_type: {
        type: String,
        required: [true, 'Job type is required'],
        enum: ['full-time', 'part-time', 'contract', 'internship']
    },
    category: {
        type: String,
        required: [true, 'Job category is required'],
        enum: ['technology', 'eduction', 'headlthcare', 'finance', 'marketing', 'sales', 'engineering']
    },
    status: {
        type: String,
        enum: ['active', 'closed'],
        default: 'active'
    },
    posted_date: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true })


const Job = mongoose.model('job', jobSchema);

export default Job;