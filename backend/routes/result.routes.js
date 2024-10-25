import Router from "express";
import {
  assignMarks,
  fetchResult,
  fetchResultForTeacher,
  generateResult,
  submitResponse,
} from "../controllers/resultController.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = new Router();

router.post(
  "/submit-response",
  verifyJWT,
  upload.single("responsePdfUrl"),
  submitResponse
);
router.post("/generate-result", verifyJWT, generateResult);
router.get("/fetch-result/:testId", verifyJWT, fetchResult);
router.get("/fetch-result-teacher/:testId", verifyJWT, fetchResultForTeacher);
router.post("/assign-marks", assignMarks);

export default router;
