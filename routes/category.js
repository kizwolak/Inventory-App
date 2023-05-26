const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const category_controller = require("../controllers/categoryController");

mongoose.set("strictQuery", false);

router.get("/", category_controller.get_categories);

router.get("/category/:id", category_controller.get_category);

module.exports = router;
