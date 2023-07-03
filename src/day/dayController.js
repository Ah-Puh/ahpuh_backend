import { surfingIndex } from "./dayProvider";
import { response } from "../../config/response";
const dayController = {
  getSurfingIndex: async (req, res) => {
    try {
      const surf_ind = await surfingIndex(req);
      return res.send(response(surf_ind));
    } catch (error) {
      console.log(error);
    }
  },
};

export default dayController;
