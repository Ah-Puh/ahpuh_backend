import { response } from "../../config/response";
import tutorService from "./tutorService";
import tutorProvider from "./tutorProvider";

const tutorController = {
  getTutors: async (req, res) => {
    try {
      const { beach_id, day, time, level } = req.query;

      console.log(beach_id, day, time, level);

      res.json(response(await tutorService.getTutors(beach_id, day, time, level)));
    } catch (error) {
      console.log(error);
    }
  },

  getTutorDetailById: async (req, res) => {
    //강사 디테일 요청 API
    /**
     * Query String : day
     */
    try {
      const tutorId = req.params.tutor_id;
      const day = req.query.day;
      const tutorDetailById = await tutorProvider.retrieveTutorDetail(tutorId, day);

      res.json(response(tutorDetailById));
    } catch (error) {
      console.log(error);
    }
  },
};

export default tutorController;
