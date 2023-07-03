const tutorDao = {
  selectTutors: async (connection, beach_id, day, time, level) => {
    let sql = `
        select distinct t.tutor_id, t.name
        from tutors t join lectures l on t.tutor_id = l.tutor
        where t.beach = ${beach_id} and date(l.start_time) = '${day}'
        `;

    if (time) {
      sql += ` and l.start_time > '${day} ${time}'`;
    }

    if (level) {
      sql += ` and l.level = '${level}'`;
    }

    const [queryResult] = await connection.query(sql);

    return queryResult;
  },
  selectTutorTags: async (connection, tutorId) => {
    const sql = `
    select h.name
    from tutor_tag t
        join hash_tags h on t.tag_id = h.tag_id
    where t.tutor_id = ${tutorId}`;

    const [queryResult] = await connection.query(sql);

    return queryResult;
  },
  selectLevels: async (connection, tutorId) => {
    const sql = `select distinct level from lectures where tutor = ${tutorId}`;

    const [queryResult] = await connection.query(sql);

    return queryResult;
  },

  // 강사id, 날짜에 맞는 강좌 조회
  selectLectureByTutorId: async (connection, selectLectureParams) => {
    const {tutorId, day} = selectLectureParams;
    const selectLectureByIdQuery = `
        SELECT lecture_id, tutor, TIME(start_time), level, price 
        FROM lectures 
        WHERE tutor = ? AND DATE(start_time) = ?;
    `;

    const selectLectureRow = await connection.query(
        selectLectureByIdQuery,
        selectLectureParams
    );

    return selectLectureRow;
  },

  //강사 이름, 소개글, 전화번호, 주소 조회
  selectTutorById: async (connection, tutorId) => {
    const selectTutorByIdQuery = `
      SELECT tutor.name, tutor.phone, tutor.introduction, beaches.name AS address
      FROM (SELECT * FROM tutors WHERE tutor_id = ?) AS tutor
      JOIN beaches
      ON tutor.beach = beaches.beach_id;
    `;

    const selectTutorRow = await connection.query(
        selectTutorByIdQuery,
        tutorId
    );

    return selectTutorRow;
  },
  //강사 해시태그 조회
  selectTutorTagById: async (connection, tutorId) => {
    const selectTutorTagByIdQuery = `
      SELECT hash_tags.name
      FROM (SELECT * FROM tutor_tag WHERE tutor_id = ?) AS tutortag
      JOIN hash_tags
      ON tutortag.tag_id = hash_tags.tag_id
    `;

    const selectTutorTagRow = await connection.query(
        selectTutorTagByIdQuery,
        tutorId
    );

    return selectTutorTagRow;
  }
};


export default tutorDao;
