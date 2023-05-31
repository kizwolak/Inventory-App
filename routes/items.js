const express = require("express");
const router = express.Router();
const item_controller = require("../controllers/itemController");

router.get("/", item_controller.index);

router.get("/item/:id", item_controller.itemDetail);

router.get("/add", item_controller.item_create_get);
router.post("/add", item_controller.item_create_post);

router.get("/item/:id/delete", item_controller.item_delete_get);
router.post("/item/:id/delete", item_controller.item_delete_post);

router.get("/item/:id/update", item_controller.item_update_get);
router.post("/item/:id/update", item_controller.item_update_post);

module.exports = router;
