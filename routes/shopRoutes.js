const express = require("express");
const shopController = require("../controllers/shopController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(shopController.getAllShop)
  .post(shopController.createShop);

router
  .route("/:id")
  .get(shopController.getOneShop)
  .patch(shopController.updateShop)
  .delete(shopController.deleteShop);

module.exports = router;
