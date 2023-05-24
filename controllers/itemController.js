const { body, validationResult } = require("express-validator");
const Item = require("../models/item");
const Category = require("../models/category");
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
