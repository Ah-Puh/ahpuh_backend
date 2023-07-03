import express from "express";
import lectureController from "./lectureController";

const lectureRouter = express.Router();

lectureRouter.get('/', lectureController.getLectures);

export default lectureRouter;
