import Companies from "../models/companies.model.js";

export const createNewCompany = async (user_id, company_name, description, industry, website, location) => {

    if (!user_id || !company_name || !description || !industry || !website || !location) {
        throw new Error("All fields are required..");
    }

    const companyExist = await Companies.findOne({ user_id })
    if (companyExist) {
        companyExist.company_name = company_name;
        companyExist.description = description;
        companyExist.industry = industry;
        companyExist.website = website;
        companyExist.location = location;
        await companyExist.save()

        return companyExist;
    }
    const company = await Companies.create({
        user_id, company_name, description, industry, website, location
    })
    return company;
}

export const getCompanyProfile = async (user_id) => {
    if (!user_id) {
        throw new Error("User ID required for get company profile");
    }
    return await Companies.findOne({ user_id });
}