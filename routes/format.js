const express = require("express");
const router = express.Router();
const format_controller = require("../controllers/formatController");

router.get("/", format_controller.get_formats);

router.get("/format/:id", format_controller.get_format);

router.get("/create", format_controller.format_create_get);
router.post("/create", format_controller.format_create_post);

module.exports = router;