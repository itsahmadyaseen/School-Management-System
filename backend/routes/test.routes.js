import Router from "express";
import { createTest, getTestById, getTests } from "../controllers/test.controller.js";

const router = new Router();

router.post("/create", createTest);
router.get("/get", getTests);
router.get("/get/:testId", getTestById);

export default router;
