import { Router } from "express";
import {
  addAttendance,
  getAttendanceForStudent,
  getAttendanceForTeacher,
} from "../controllers/attendance.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = new Router();

router.post("/add", verifyJWT, addAttendance);
router.get("/get-student", verifyJWT, getAttendanceForStudent);
router.get("/get-teacher", verifyJWT, getAttendanceForTeacher);

export default router;
