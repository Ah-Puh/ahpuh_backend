import pool from "../../config/database";

import tutorDao from "./tutorDao";
const {selectTutorTagById} = require("./tutorDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveTutorDetail = async function (tutorId, day) {
    const selectLectureParams = [tutorId, day];

    const connection = await pool.getConnection(async (conn) => conn);

    const tutorResult = await tutorDao.selectTutorById(connection, tutorId);
    const lectureResult = await tutorDao.selectLectureByTutorId(connection, selectLectureParams);
    const tutorTagResult = await tutorDao.selectTutorTagById(connection, tutorId);

    const result = {"tutor" : tutorResult[0], "tutorTag" : tutorTagResult[0], "lectures" : lectureResult[0]};

    connection.release();

    return result;
};