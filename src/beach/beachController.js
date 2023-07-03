const beachController = {
  getBeaches: async (req, res) => {
    const {
      query: { keyword },
    } = req;

    console.log(keyword);

    if (keyword) {
      return res.json("good");
    }

    return res.json("goodgood");
  },
};

export default beachController;
