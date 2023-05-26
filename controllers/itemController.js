const { body, validationResult } = require("express-validator");
const Item = require("../models/item");
const Category = require("../models/category");
const Author = require("../models/author");
const Format = require("../models/format");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const [items, categories] = await Promise.all([
    Item.find().exec(),
    Category.find().exec(),
  ]);

  res.render("index", {
    title: "The Record Shop",
    items: items,
    categories: categories,
  });
});

exports.itemDetail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id)
    .populate("author")
    .populate("format")
    .populate("category")
    .exec();

  if (item === null) {
    const err = new Error("Item not found");
    err.status = 404;
    return next(err);
  }

  res.render("item_detail", {
    item: item,
  });
});
