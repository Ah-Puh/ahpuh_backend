import express from "express";
import beachRouter from "../src/beach/beachRouter";
import tutorRouter from "../src/tutor/tutorRouter";
import dayRouter from "../src/day/dayRouter";
import reservationRouter from "../src/reservation/reservationRouter";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/beach", beachRouter);
app.use("/tutor", tutorRouter);
app.use("/day", dayRouter);
app.use("/reservation", reservationRouter);

export default app;
