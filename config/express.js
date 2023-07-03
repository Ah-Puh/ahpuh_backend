import express from "express";
import compression from "compression";
import methodOverride from "method-override";
import cors from "cors";
import beachRouter from "../src/beach/beachRouter";
import tutorRouter from "../src/tutor/tutorRouter";
import dayRouter from "../src/day/dayRouter";
import reservationRouter from "../src/reservation/reservationRouter";

const app = express();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cors());

app.use("/beach", beachRouter);
app.use("tutor", tutorRouter);
app.use("/day", dayRouter);
app.use("reservation", reservationRouter);

export default app;
