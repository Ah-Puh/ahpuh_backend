import express from "express";
import beachController from "./beachController";

const beachRouter = express.Router();

beachRouter.get("/", beachController.getBeaches);

export default beachRouter;
