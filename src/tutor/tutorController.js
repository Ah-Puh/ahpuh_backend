import { response } from "../../config/response";
import tutorService from "./tutorService";

const tutorController = {
  getTutors: async (req, res) => {
    const { beach_id, day, time, level } = req.query;

    console.log(beach_id, day, time, level);

    res.json(response(await tutorService.getTutors(beach_id, day, time, level)));
  },
};

export default tutorController;
