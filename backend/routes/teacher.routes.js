import Router from "express";
import {
  getTeacherById,
  getTeachers,
  login,
  register,
} from "../controllers/teacher.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = new Router();

router.post("/register", register);
router.post("/login", login);
router.post("/teacher", getTeacherById);
router.get("/get", verifyJWT, getTeachers);

export default router;
