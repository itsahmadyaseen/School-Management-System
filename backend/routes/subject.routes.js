import Router from "express";
import { createSubject, getSubjects } from "../controllers/subject.controller.js";

const router = new Router();

router.post("/create", createSubject);
router.get("/get", getSubjects);

export default router;
