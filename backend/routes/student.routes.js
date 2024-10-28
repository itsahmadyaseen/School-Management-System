import Router from "express";
import {
  getStudentById,
  getStudents,
  login,
  logout,
  register,
} from "../controllers/student.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = new Router();

router.post("/register", register);
router.post("/login", login);
router.post("/student", getStudentById);
router.get("/get", verifyJWT, getStudents);
router.post("/logout", logout);

export default router;
