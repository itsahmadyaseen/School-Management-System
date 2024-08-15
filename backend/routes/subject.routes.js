import Router from "express";
import {
  createSubject,
  getSubjectById,
  getSubjects,
} from "../controllers/subject.controller.js";

const router = new Router();

router.post("/create", createSubject);
router.get("/get", getSubjects);
router.get("/get/:subjectId", getSubjectById);

export default router;
