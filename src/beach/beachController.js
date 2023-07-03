import { response } from "../../config/response";
import beachProvider from "./beachProvider";

const beachController = {
  getBeaches: async (req, res) => {
    try {
      const {
        query: { keyword },
      } = req;

      if (keyword) {
        return res.json(response(await beachProvider.getBeachesByKeyword(keyword)));
      }

      return res.json(response(await beachProvider.getAllBeaches()));
    } catch (error) {
      console.log(error);
    }
  },
};

export default beachController;
