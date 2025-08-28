import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.get('/', userController.getAllWaiters);

export default router;