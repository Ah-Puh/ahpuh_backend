const beachDao = {
  selectAllBeaches: async (connection) => {
    const sql = `select beach_id id, name from beaches`;
    const [queryResult] = await connection.query(sql);

    return queryResult;
  },
  selectBeachesByKeyword: async (connection, keyword) => {
    const sql = `select beach_id id, name from beaches where name like '%${keyword}%'`;
    const [queryResult] = await connection.query(sql);

    return queryResult;
  },
};

export default beachDao;
