const { body, validationResult } = require("express-validator");
const Item = require("../models/item");
const Category = require("../models/category");
const Author = require("../models/author");
const Format = require("../models/format");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const [items, categories] = await Promise.all([Item.find().exec()]);

  res.render("index", {
    title: "The Record Shop",
    items: items,
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

exports.item_create_get = asyncHandler(async (req, res, next) => {
  const [allAuthors, allCategories, allFormats] = await Promise.all([
    Author.find().exec(),
    Category.find().exec(),
    Format.find().exec(),
  ]);
  res.render("item_form", {
    authors: allAuthors,
    categories: allCategories,
    formats: allFormats,
  });
});

exports.item_create_post = [
  (req, res, next) => {
    if (!(req.body.category instanceof Array)) {
      if (typeof req.body.category === undefined) req.body.category = [];
      else req.body.category = new Array(req.body.category);
    }
    next();
  },

  body("name", "Name must not be empty").trim().isLength({ min: 1 }).escape(),
  body("author", "Author must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary").trim().escape(),
  body("category.*").escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      author: req.body.author,
      description: req.body.description,
      format: req.body.format,
      category: req.body.category,
      price: req.body.price,
      in_stock: req.body.in_stock,
    });

    console.log(item);

    if (!errors.isEmpty()) {
      const [allAuthors, allCategories, allFormats] = await Promise.all([
        Author.find().exec(),
        Category.find().exec(),
        Format.find.exec(),
      ]);
      for (const category of allCategories) {
        if (book.category.indexOf(genre._id) > -1) {
          category.checked = "true";
        }
      }
      res.render("item_form", {
        name: req.body.name,
        author: req.body.author,
        description: req.body.description,
        format: req.body.format,
        category: req.body.category,
        price: req.body.price,
        in_stock: req.body.in_stock,
        errors: errors.array(),
        authors: allAuthors,
        categories: allCategories,
        formats: allFormats,
      });
    } else {
      await item.save();
      res.redirect(item.url);
    }
  }),
];

exports.item_delete_get = asyncHandler(async (req, res, next) => {
  const [item] = await Promise.all([Item.findById(req.params.id).exec()]);

  if (item === null) {
    res.redirect("/");
  }

  res.render("item_delete", {
    title: "Delete item",
    item: item,
  });
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
  const [item] = await Promise.all([Item.findById(req.params.id).exec()]);
  console.log(item);
  await Item.findByIdAndRemove(req.body.itemid);
  res.redirect("/");
});

exports.item_update_get = asyncHandler(async (req, res, next) => {
  const [item, allAuthors, allCategories, allFormats] = await Promise.all([
    Item.findById(req.params.id)
      .populate("author")
      .populate("category")
      .populate("format")
      .exec(),
    Author.find().exec(),
    Category.find().exec(),
    Format.find().exec(),
  ]);

  if (item === null) {
    const err = new Error("Book not found");
    err.status = 404;
    return next(err);
  }

  res.render("item_form", {
    title: "Update item",
    authors: allAuthors,
    categories: allCategories,
    formats: allFormats,
  });
});

exports.item_update_post = [
  (req, res, next) => {
    if (!(req.body.category instanceof Array)) {
      if (typeof req.body.category === undefined) req.body.category = [];
      else req.body.category = new Array(req.body.category);
    }
    next();
  },

  body("name", "Name must not be empty").trim().isLength({ min: 1 }).escape(),
  body("author", "Author must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary").trim().escape(),
  body("category.*").escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      author: req.body.author,
      description: req.body.description,
      format: req.body.format,
      category: req.body.category,
      price: req.body.price,
      in_stock: req.body.in_stock,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      const [allAuthors, allCategories, allFormats] = await Promise.all([
        Author.find().exec(),
        Category.find().exec(),
        Format.find.exec(),
      ]);
      for (const category of allCategories) {
        if (book.category.indexOf(genre._id) > -1) {
          category.checked = "true";
        }
      }
      res.render("item_form", {
        name: req.body.name,
        author: req.body.author,
        description: req.body.description,
        format: req.body.format,
        category: req.body.category,
        price: req.body.price,
        in_stock: req.body.in_stock,
        errors: errors.array(),
        authors: allAuthors,
        categories: allCategories,
        formats: allFormats,
      });
    } else {
      const theitem = await Item.findByIdAndUpdate(req.params.id, item, {});
      res.redirect(theitem.url);
    }
  }),
];
