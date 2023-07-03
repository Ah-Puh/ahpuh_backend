// 예약 생성
async function insertReservation(connection, insertReservationParams) {
    const insertReservationQuery = `
        INSERT INTO reservations(user_id, lecture_id, personnel)
        VALUES (?, ?, ?);
    `;
    const insertReservationRow = await connection.query(
        insertReservationQuery,
        insertReservationParams
    );

    return insertReservationRow;
}

module.exports = {
    insertReservation
};
