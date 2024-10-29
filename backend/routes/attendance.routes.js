import { Router } from "express";
import {
  addAttendance,
  getAttendanceForStudent,
} from "../controllers/attendance.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = new Router();

router.post("/add", verifyJWT, addAttendance);
router.get("/get-student", verifyJWT, getAttendanceForStudent);

export default router;
