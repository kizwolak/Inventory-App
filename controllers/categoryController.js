const { body, validationResult } = require("express-validator");
const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

exports.get_categories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({});

  res.render("category_list", {
    categories: categories,
  });
});

exports.get_category = asyncHandler(async (req, res, next) => {
  const [category, items] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).exec(),
  ]);

  if (category === null) {
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }

  res.render("category_detail", {
    category: category,
    items: items,
  });
});
