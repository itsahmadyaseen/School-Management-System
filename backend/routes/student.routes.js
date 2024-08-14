import Router from "express";
import { getStudents, login, register } from "../controllers/student.controller.js";

const router = new Router();

router.post("/register", register);
router.post("/login", login);
router.get("/get", getStudents);

export default router;
