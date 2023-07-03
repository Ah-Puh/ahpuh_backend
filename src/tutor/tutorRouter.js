import express from "express";
import tutorController from "./tutorController";

const tutorRouter = express.Router();

tutorRouter.get("/", tutorController.getTutors);

export default tutorRouter;
