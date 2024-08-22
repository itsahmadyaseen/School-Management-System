import Router from "express";
import {
  createSubject,
  getSubjectsByClass,
  getSubjectById,
  getSubjects,
} from "../controllers/subject.controller.js";

const router = new Router();

router.post("/create", createSubject);
router.get("/get", getSubjects);
router.get("/get-subjects/:classId", getSubjectsByClass);
router.get("/get/:subjectId", getSubjectById);

export default router;
