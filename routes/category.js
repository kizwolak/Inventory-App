const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const category_controller = require("../controllers/categoryController");

mongoose.set("strictQuery", false);

router.get("/", category_controller.get_categories);

router.get("/category/:id", category_controller.get_category);

router.get("/create", category_controller.category_create_get);
router.post("/create", category_controller.category_create_post);

router.get("/category/:id/delete", category_controller.category_delete_get);
router.post("/category/:id/delete", category_controller.category_delete_post);

router.get("/category/:id/update", category_controller.category_update_get);
router.post("/category/:id/update", category_controller.category_update_post);

module.exports = router;
