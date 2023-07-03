export const selectLatandLon = async (connection, beach_id) => {
    const selectLLQuery = 'SELECT lat, lon FROM beaches WHERE beach_id = ?'
    const [[LL]] = await connection.query(selectLLQuery, beach_id);
    return LL;
}