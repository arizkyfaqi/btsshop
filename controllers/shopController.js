const Shop = require("../models/shoppingModel");
const catchAsync = require("../utils/catchAsyc");

exports.createShop = catchAsync(async (req, res, next) => {
  const newShop = await Shop.create(req.body);

  console.log(newShop);

  res.status(200).json({
    status: "success",
    data: {
      newShop,
    },
  });
});

exports.getOneShop = catchAsync(async (req, res, next) => {
  const shop = await Shop.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      shop,
    },
  });
});

exports.getAllShop = catchAsync(async (req, res, next) => {
  const shops = await Shop.find();

  res.status(200).json({
    status: "success",
    data: {
      shops,
    },
  });
});

exports.updateShop = catchAsync(async (req, res, next) => {
  const updateShop = await Shop.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      updateShop,
    },
  });
});

exports.deleteShop = catchAsync(async (req, res, next) => {
  await Shop.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    data: null,
  });
});
