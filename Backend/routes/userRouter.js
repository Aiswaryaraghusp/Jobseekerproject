import express from 'express';
import {login, logout, register} from  "../controllers/userController.js";
const router = express.Router();
import {isAuthorized} from "../middlewares/auth.js";
import { deleteJob, updateJob } from '../controllers/jobController.js';

router.post("/register",register);
router.post("/login",login);
router.get("/logout",isAuthorized,logout);
router.put("/getmyjobs",isAuthorized,updateJob);
router.delete("/delete/:id",isAuthorized,deleteJob);

export default router;