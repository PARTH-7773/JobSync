import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { authMiddleware, seekerMiddleware } from "../middlewares/auth.middleware.js";
import { userLoginValidation, userRegisterValidation } from "../validations/UserInput.validation.js";

const router = Router()
/**
 * POST - POST/api/v1/user/register
 * @access - public
 * @description - user register OR create new user account
*/
router.post("/register", userRegisterValidation,
    userController.registerUser);

/**
 * POST - POST/api/v1/user/login
 * @access - public
 * @description - user login 
*/
router.post("/login", userLoginValidation, userController.loginUser)

router.get("/profile", authMiddleware, userController.getUserProfile);
router.get("/logout", authMiddleware, userController.logoutUser)

router.patch("/update-profile", seekerMiddleware, userController.updateSeekerProfile);

export default router;