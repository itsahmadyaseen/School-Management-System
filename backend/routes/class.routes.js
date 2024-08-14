import Router from "express";
import {
  createClass,
  getClassDetails,
  getClasses,
} from "../controllers/class.controller.js";

const router = new Router();

router.post("/create", createClass);
router.get("/get-classes", getClasses);
router.get("/get-class", getClassDetails);

export default router;
