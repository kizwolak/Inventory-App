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
