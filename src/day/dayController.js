import { surfingIndex } from "./dayProvider";
import { response } from "../../config/response";
const dayController = {
    getSurfingIndex : async (req, res) => {
        const surf_ind = await surfingIndex(req);
        return res.send(response(surf_ind)) 
    } 
}

export default dayController;