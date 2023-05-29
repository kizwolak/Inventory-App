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