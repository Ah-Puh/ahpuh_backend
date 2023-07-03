import { surfingIndex } from "./dayProvider";
const dayController = {
    getSurfingIndex : async (req, res) => {
        const surf_ind = await surfingIndex(req);
        return res.send(surf_ind) 
    } 
}

export default dayController;