import { body } from "express-validator";

export const userRegisterValidation = [

    body('fullname').isLength({ min: 5 }).withMessage('Fullname must be at least 3 charactors long.'),
    body('username').isLength({ min: 3 }).withMessage(' Username must be at least 3 charactors long.'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('email').isLowercase().withMessage('Please email should be lowercase'),
    body('password').isLength({ min: 6 }).trim().withMessage('Password must be at least 6 charactors long'),
]

export const userLoginValidation = [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).trim().withMessage('Password must be at least 6 charactors long')
]

export const newJobValdation = [
    // body('company_id').isMongoId().withMessage("Company ID is missing"),
    body('title').trim().isLength({ min: 5 }).withMessage('Job title is too short'),
    body('description').trim().isLength().withMessage('Job description is too short'),
    body('requirements').trim().isLength({ min: 10 }).withMessage('job requirements is too short'),
    body('location').trim().isLength({ min: 3 }).withMessage('invalid location'),
    body('salary_range').trim().notEmpty().withMessage('Job Salary are required'),
]

export const NewCompanyValidation = [
    body('company_name').trim().isLength({min:5}).withMessage('Company name too short'),
    body('description').trim().isLength({min:10}).withMessage('Company description too short'),
    body('website').trim().notEmpty().withMessage('Company website is required'),
    body('location').trim().isLength({min:3}).withMessage('Company location too short'),
]