const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const catchAsync = require("./../utils/catchAsyc");
const User = require("../models/userModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = signToken(newUser._id);
  // console.log(newUser);

  res.status(201).json({
    status: "success",
    token,
    data: {
      newUser,
    },
  });
});

exports.signin = catchAsync(async (req, res, next) => {
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

  if (!user || !(password === user.password)) {
    res.status(400).json({
      status: "fail",
      message: "Incorrect email or password!",
    });
  }

  const token = signToken(user._id);
  user.password = undefined;

  res.status(201).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(400).json({
      status: "fail",
      message: "You are not log-in!, Please log-in to get access",
    });
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    res.status(401).json({
      status: "fail",
      message: "The user whit this email, was not exist!",
    });
  }

  req.user = currentUser;
  next();
});
