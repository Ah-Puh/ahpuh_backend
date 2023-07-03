export const selectLecturesByTutorAndLevel = async (connection, tutor_id, level, day) => {
    const selectLecturesByTutorAndLevelQuery = 
        `SELECT l.lecture_id, l.start_time FROM lectures as l
            WHERE DATE(l.start_time) = '${day}' AND l.level = '${level}' AND l.tutor = ${tutor_id}`
    const [lectures] = await connection.query(selectLecturesByTutorAndLevelQuery);
    return lectures;
}