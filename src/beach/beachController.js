import { response } from "../../config/response";
import beachProvider from "./beachProvider";

const beachController = {
  getBeaches: async (req, res) => {
    const {
      query: { keyword },
    } = req;

    if (keyword) {
      return res.json(response(await beachProvider.getBeachesByKeyword(keyword)));
    }

    return res.json(response(await beachProvider.getAllBeaches()));
  },
};

export default beachController;
