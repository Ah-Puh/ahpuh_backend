import express from "express";
const reservation = require('./reservationController');

const reservationRouter = express.Router();

reservationRouter.post('/:lecture_id', reservation.postReservation);

export default reservationRouter;
