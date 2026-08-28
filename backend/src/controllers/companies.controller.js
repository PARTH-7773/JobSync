import { validationResult } from "express-validator";
import { createNewCompany, getCompanyProfile } from "../services/companies.service.js";

async function createComponie(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }

    const user_id = req.user._id
    const { company_name, description, industry, website, location } = req.body;

    try {
        const response = await createNewCompany(user_id, company_name, description, industry, website, location)
        // console.log("Company details :", response);
        return res.status(200).json({
            success: true,
            message: "Company profile update succesfully.",
            data: response
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }

}

async function Profile(req, res) {
    const user_id = req.user._id
    try {
        const profile = await getCompanyProfile(user_id);
        return res.status(200).json({
            success: true,
            message: 'Company profile fetch successfully.',
            data: profile
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export default { createComponie, Profile }