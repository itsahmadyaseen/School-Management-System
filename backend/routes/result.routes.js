import Router from "express";
import {
  fetchResult,
  fetchResultForTeacher,
  generateResult,
  submitResponse,
} from "../controllers/resultController.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = new Router();

router.post("/submit-response", verifyJWT, submitResponse);
router.post("/generate-result", verifyJWT, generateResult);
router.get("/fetch-result/:testId", verifyJWT, fetchResult);
router.get("/fetch-result-teacher/:testId", verifyJWT, fetchResultForTeacher);

export default router;
