import { findLectures } from "./lectureProvider";
import { response } from "../../config/response";

const lectureController = {
  getLectures: async (req, res) => {
    try {
      const { tutor_id, level, day } = req.query;
      const result = await findLectures(tutor_id, level, day);
      return res.send(response(result));
    } catch (error) {
      console.log(error);
    }
  },
};

export default lectureController;
