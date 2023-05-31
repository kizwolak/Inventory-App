const { body, validationResult } = require("express-validator");
const Format = require("../models/format");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

exports.get_formats = asyncHandler(async (req, res, next) => {
  const formats = await Format.find({});

  res.render("format_list", {
    formats: formats,
  });
});

exports.get_format = asyncHandler(async (req, res, next) => {
  const [format, items] = await Promise.all([
    Format.findById(req.params.id).exec(),
    Item.find({ format: req.params.id }).exec(),
  ]);

  if (format === null) {
    const err = new Error("Error not found");
    err.status = 404;
    return next(err);
  }

  res.render("format_detail", {
    format: format,
    items: items,
  });
});

exports.format_create_get = (req, res, next) => {
  res.render("format_form", { title: "Create Format" });
};

exports.format_create_post = [
  body("name", "Format name must be at least 2 characters long")
    .trim()
    .isLength({ min: 2 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const format = new Format({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render("format_form", {
        title: "Create Format",
        format: format,
        errors: errors.array(),
      });
      return;
    } else {
      const formatExists = await Format.findOne({ name: req.body.name }).exec();
      if (formatExists) {
        res.redirect(formatExists.url);
      } else {
        await format.save();
        res.redirect(format.url);
      }
    }
  }),
];

exports.format_delete_get = asyncHandler(async (req, res, next) => {
  const [format, allItemsByFormat] = await Promise.all([
    Format.findById(req.params.id).exec(),
    Item.find({ format: req.params.id }, "name description").exec(),
  ]);

  if (format === null) {
    res.redirect("/catalog/formats");
  }

  res.render("format_delete", {
    title: "Delete format",
    format: format,
    format_items: allItemsByFormat,
  });
});

exports.format_delete_post = asyncHandler(async (req, res, next) => {
  const [format, allItemsByformat] = await Promise.all([
    Format.findById(req.params.id).exec(),
    Book.find({ format: req.params.id }, "title summary").exec(),
  ]);

  if (allItemsByformat.length > 0) {
    res.render("format_delete", {
      title: "Delete format",
      format: format,
      format_items: allItemsByFormat,
    });
    return;
  } else {
    await format.findByIdAndRemove(req.body.formatid);
    res.redirect("/formats");
  }
});

exports.format_update_get = asyncHandler(async (req, res, next) => {
  const [format] = await Promise.all([Format.findById(req.params.id).exec()]);

  if (format === null) {
    const err = new Error("Format not found");
    err.status = 404;
    return next(err);
  }

  res.render("format_form", {
    title: "Update format",
    format: format,
  });
});

exports.format_update_post = [
  body("name", "Format name must be at least 2 characters long")
    .trim()
    .isLength({ min: 2 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const format = new Format({ name: req.body.name, _id: req.params.id });

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      const theformat = await Format.findByIdAndUpdate(
        req.params.id,
        format,
        {}
      );
      res.redirect(theformat.url);
    }
  }),
];
