import mongoose from "mongoose";


const applicationSchema = new mongoose.Schema({
    seeker_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'seeker_profiles',
        required: [true, 'Seeker ID id required'],
        index: true
    },
    job_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'job',
        required: [true, 'Job ID is required'],
    },
    cover_letter: {
        type: String,
        required: [true, 'Cover letter is required'],
        trim: true,
        minlength: [10, "Cover letter too short"]
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'accepted', 'rejected'],
        default: 'pending'
    },
    applied_date: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true })

const Application = mongoose.model('application', applicationSchema);
export default Application;