import { Router } from "express";
import { addAttendance } from "../controllers/attendance.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = new Router();

router.post("/add", verifyJWT, addAttendance);

export default router;
