import express from "express";
import dayController from "./dayController";

const dayRouter = express.Router();

dayRouter.get('/', dayController.getSurfingIndex);

export default dayRouter;
