const reservationService = require("./reservationService");
import { response } from "../../config/response";

/**
 * API Name : 예약 API
 * [POST] /reservation/:lecture_id
 */
exports.postReservation = async function (req, res) {
  /**
   * Query: personnel
   */
  const { personnel } = req.query;
  const lectureId = req.params.lecture_id;
  const userId = 1;
  const reservationResponse = await reservationService.createReservation(userId, lectureId, personnel);

  return res.json(response({ reservationId: reservationResponse }));
};
