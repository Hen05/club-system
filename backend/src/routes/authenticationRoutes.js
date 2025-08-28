import authController from "../controllers/authenticationController.js";
import tokenMiddleware from "../middlewares/tokenMiddleware.js";
import express from "express";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import {USER_ROLES_DIC} from "../constants/roles.js";

const router = express.Router();

router.post('/register', authorizeRoles(USER_ROLES_DIC.BARMAN, USER_ROLES_DIC.MANAGER), authController.register);
router.post('/login', authController.login);
router.post('/logout', tokenMiddleware, authController.logout);
router.get('/getUserInfos', tokenMiddleware, authController.getUserInfos);
router.get('/isAuthenticated', tokenMiddleware, authController.isAuthenticated);

export default router;