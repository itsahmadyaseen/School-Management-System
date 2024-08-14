import Router from "express";
import { createQuestion, getQuestions } from "../controllers/question.controller.js";

const router = new Router();

router.post("/create", createQuestion);
router.get("/get", getQuestions);

export default router;
