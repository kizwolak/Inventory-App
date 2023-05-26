const Author = require("../models/author");
const Item = require("../models/item");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.get_authors = asyncHandler(async (req, res, next) => {
  const authors = await Author.find({});

  res.render("author_list", {
    authors: authors,
  });
});

exports.get_author = asyncHandler(async (req, res, next) => {
  const [author, records] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Item.find({ author: req.params.id }).exec(),
  ]);

  if (author === null) {
    const err = new Error("Artist not found");
    err.status = 404;
    return next(err);
  }

  res.render("author_detail", {
    author: author,
    records: records,
  });
});
