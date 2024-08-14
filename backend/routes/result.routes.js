import Router from "express";
import {
  generateResult,
  submitResponse,
} from "../controllers/resultController.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = new Router();

router.post("/submit-response", verifyJWT, submitResponse);
router.post("/generate-result", verifyJWT, generateResult);

export default router;
