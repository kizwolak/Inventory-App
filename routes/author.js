const express = require("express");
const router = express.Router();
const author_controller = require("../controllers/authorController");

router.get("/", author_controller.get_authors);

router.get("/author/:id", author_controller.get_author);

module.exports = router;
