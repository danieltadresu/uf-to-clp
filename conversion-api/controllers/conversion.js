// const Stopwatch = require("../models/stopwatch");
const axios = require('axios');

exports.get = async (req, res) => {
  try {
    const { date, amount } = req.params;

    // Call to API for getting the UF value on CLP.
    const { data, status } = await axios.get(`https://mindicador.cl/api/uf/${date}`);

    const conversion = (amount * data.serie[0].valor).toFixed();

    res.status(200).json({
      code: 200,
      data: {
        clp: data,
        conversion,
      },
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: 'Something went wrong on the server.',
    });
  }
};