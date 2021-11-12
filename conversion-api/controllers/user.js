const User = require("../models/user");

exports.add = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = {
      email,
      password,
      role,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const data = await User.create(user);
    res.status(200).json({
      code: 200,
      data,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Something went wrong on the server.",
    });
  }
};

exports.get = async (req, res, next) => {
  try {
    const { email, password } = req.params;
    const data = await User.findOne({
      where: {
        email,
        password
      },
    });

    res.status(200).json({
      code: 200,
      data,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Something went wrong in the server.",
    });
    next();
  }
};