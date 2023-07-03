import express from "express";
import beachController from "./beachController";

const beachRouter = express.Router();

beachRouter.get("/", (req, res) => {
  return res.send("hi");
});

export default beachRouter;
