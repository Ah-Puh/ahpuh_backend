import express from "express";
import tutorController from "./tutorController";

const tutorRouter = express.Router();

tutorRouter.get("/", tutorController.getTutors);
tutorRouter.get("/:tutor_id", tutorController.getTutorDetailById);

export default tutorRouter;
