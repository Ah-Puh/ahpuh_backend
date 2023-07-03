import pool from "../../config/database";
import tutorDao from "./tutorDao";

const tutorService = {
  getTutors: async (beach_id, day, time, level) => {
    const connection = await pool.getConnection(async (conn) => conn);

    const tutors_raw = await tutorDao.selectTutors(connection, beach_id, day, time, level);
    let tutors = [];
    tutors = await Promise.all(
      tutors_raw.map(async ({ tutor_id: id, name }) => {
        const tags = await tutorDao.selectTutorTags(connection, id);
        return { id, name, tags };
      })
    );

    connection.release();

    return tutors;
  },
};

export default tutorService;
