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
};

export default tutorDao;
