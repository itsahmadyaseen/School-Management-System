import Router from "express";
import {
  getTeacherById,
  login,
  register,
} from "../controllers/teacher.controller.js";

const router = new Router();

router.post("/register", register);
router.post("/login", login);
router.post("/teacher", getTeacherById);

export default router;
