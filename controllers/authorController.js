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

exports.author_create_get = (req, res, next) => {
  res.render("author_form", { title: "Create Author" });
};

exports.author_create_post = [
  body("name", "Author name must be at least 2 characters long")
    .trim()
    .isLength({ min: 2 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const author = new Author({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render("author_form", {
        title: "Create Author",
        author: author,
        errors: errors.array(),
      });
      return;
    } else {
      const authorExists = await Author.findOne({ name: req.body.name }).exec();
      if (authorExists) {
        res.redirect(authorExists.url);
      } else {
        await author.save();
        res.redirect(author.url);
      }
    }
  }),
];

exports.author_delete_get = asyncHandler(async (req, res, next) => {
  const [author, allItemsByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Item.find({ author: req.params.id }, "name description").exec(),
  ]);

  if (author === null) {
    res.redirect("/catalog/authors");
  }

  res.render("author_delete", {
    title: "Delete Author",
    author: author,
    author_items: allItemsByAuthor,
  });
});

exports.author_delete_post = asyncHandler(async (req, res, next) => {
  const [author, allItemsByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id }, "title summary").exec(),
  ]);

  if (allItemsByAuthor.length > 0) {
    res.render("author_delete", {
      title: "Delete Author",
      author: author,
      author_items: allItemsByAuthor,
    });
    return;
  } else {
    await Author.findByIdAndRemove(req.body.authorid);
    res.redirect("/authors");
  }
});
