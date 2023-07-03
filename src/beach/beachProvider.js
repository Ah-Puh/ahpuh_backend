import pool from "../../config/database";
import beachDao from "./beachDao";

const beachProvider = {
  getAllBeaches: async () => {
    const connection = await pool.getConnection(async (pool) => pool);
    const beaches = await beachDao.selectAllBeaches(connection);

    connection.release();

    return beaches;
  },

  getBeachesByKeyword: async (keyword) => {
    const connection = await pool.getConnection(async (pool) => pool);
    const [beaches] = await beachDao.selectBeachesByKeyword(connection, keyword);

    connection.release();

    return beaches;
  },
};

export default beachProvider;
