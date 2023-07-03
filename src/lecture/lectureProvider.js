import pool  from "../../config/database.js"
import { selectLecturesByTutorAndLevel } from "./lectureDao.js"
import mysql from "mysql2/promise"

export const findLectures = async (tutor_id, level, day) => {
    const connection = await pool.getConnection(async conn => conn);
    const lectures = await selectLecturesByTutorAndLevel(connection, tutor_id, level, day);
    connection.release();
    return lectures;
}
