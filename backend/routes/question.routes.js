import Router from "express";
import {
  createQuestion,
  deleteQuestion,
  getQuestions,
} from "../controllers/question.controller.js";

const router = new Router();

router.post("/create/:subjectId", createQuestion);
router.get("/get", getQuestions);
router.delete("/delete", deleteQuestion);

export default router;
