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

exports.category_create_get = (req, res, next) => {
  res.render("category_form", { title: "Create category" });
};

exports.category_create_post = [
  body("name", "Category name must be at least 2 characters long")
    .trim()
    .isLength({ min: 2 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      const categoryExists = await Category.findOne({
        name: req.body.name,
      }).exec();
      if (categoryExists) {
        res.redirect(categoryExists.url);
      } else {
        await category.save();
        res.redirect(category.url);
      }
    }
  }),
];

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const [category, allItemsByCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }, "name description").exec(),
  ]);

  if (Category === null) {
    res.redirect("/catalog/categorys");
  }

  res.render("category_delete", {
    title: "Delete category",
    category: category,
    category_items: allItemsByCategory,
  });
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  const [category, allItemsBycategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Book.find({ category: req.params.id }, "title summary").exec(),
  ]);

  if (allItemsByCategory.length > 0) {
    res.render("category_delete", {
      title: "Delete category",
      category: category,
      category_items: allItemsBycategory,
    });
    return;
  } else {
    await Category.findByIdAndRemove(req.body.categoryid);
    res.redirect("/categorys");
  }
});
