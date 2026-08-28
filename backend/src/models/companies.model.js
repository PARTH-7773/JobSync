import mongoose from "mongoose";

const companiesSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'User ID is required'],
    },
    company_name: {
        type: String,
        minlength: [5, 'Company name is must 5 charactors long'],
        required: [true, 'Company name is required']
    },
    description: {
        type: String,
        minlength: [10, 'Company description is must 10 charactors long'],
        required: [true, 'Company description is required']
    },
    industry: {
        type: String,
        required: [true, 'Company industry is required'],
        enum: ['technology', 'healthcare', 'finance', 'eduction', 'manufacturing', 'retail', 'other','marketing']
    },
    website: {
        type: String,
        required: [true, 'Company website is required'],
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Job location is required'],
        minlength: [3, 'Job location must 10 charactors long'],
        trim: true
    },
    logo: {
        type: String
    }

}, { timestamps: true })


const Companies = mongoose.model('companie', companiesSchema);

export default Companies;