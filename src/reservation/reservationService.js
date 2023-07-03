import pool from "../../config/database";
const userDao = require("./reservationDao");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createReservation = async function (userId, lectureId, personnel) {
    try {

        const insertReservationParams = [userId, lectureId, personnel];

        const connection = await pool.getConnection(async (conn) => conn);

        const reservationResult = await userDao.insertReservation(connection, insertReservationParams);
        const result = reservationResult[0].insertId;
        console.log(`추가된 예약 : ${result}`);

        connection.release();

        return result;

    } catch (err) {
        console.log(`App - createReservation Service error : ${err.message}`);
    }
};