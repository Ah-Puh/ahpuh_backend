import { findLectures } from "./lectureProvider";
import { response } from "../../config/response";

const lectureController = {
  getLectures: async (req, res) => {
    const { tutor_id, level, day } = req.query;
    const result = await findLectures(tutor_id, level, day);
    return res.send(response(result));
  },
};

export default lectureController;
