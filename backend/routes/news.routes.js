import { Router } from "express";
import { addNews, getNewsForClass } from "../controllers/news.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = new Router();

router.post("/add", verifyJWT, addNews);
router.get("/get", verifyJWT, getNewsForClass);

export default router;
