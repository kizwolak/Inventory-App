const express = require("express");
const router = express.Router();
const author_controller = require("../controllers/authorController");

router.get("/", author_controller.get_authors);

router.get("/author/:id", author_controller.get_author);

router.get("/create", author_controller.author_create_get);
router.post("/create", author_controller.author_create_post);

module.exports = router;
