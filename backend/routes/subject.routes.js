import Router from "express";
import {
  createSubject,
  getSubjectsByClass,
  getSubjectById,
  getSubjects,
} from "../controllers/subject.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = new Router();

router.post("/create", createSubject);
router.get("/get", getSubjects);
router.get("/get-subjects", verifyJWT, getSubjectsByClass);
router.get("/get/:subjectId", getSubjectById);

export default router;
