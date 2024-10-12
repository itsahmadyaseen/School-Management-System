import Router from "express";
import { createTest, getTestById, getTests } from "../controllers/test.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = new Router();

router.post("/create", verifyJWT, createTest);
router.get("/get", getTests);
router.get("/get/:testId", verifyJWT, getTestById);

export default router;
