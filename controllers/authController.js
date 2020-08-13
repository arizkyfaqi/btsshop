const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsyc");
const AppError = require("./../utils/appError");
const User = require("../models/userModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1) Check if email and password exist
  if (!email || !password) {
    res.status(400).json({
      status: "fail",
      message: "provide email and password",
    });
  }

  //2) Check if user exist && password correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(400).json({
      status: "fail",
      message: "Incorrect email or password!",
    });
  }

  //3) if evrything ok, send token to client
  const token = signToken(user._id);
});
