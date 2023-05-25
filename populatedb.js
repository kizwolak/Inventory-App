#! /usr/bin/env node

// Get arguments passed on command line

const Category = require("./models/category");
const Item = require("./models/item");
const Author = require("./models/author");
const Format = require("./models/format");
require("dotenv").config();

const categories = [];
const items = [];
const authors = [];
const formats = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = process.env.MONGODB_SECRET;

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createAuthors();
  await createFormats();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function categoryCreate(name) {
  const category = new Category({ name: name });
  await category.save();
  categories.push(category);
  console.log(`Added category: ${name}`);
}

async function authorCreate(name) {
  const author = new Author({ name: name });
  await author.save();
  authors.push(author);
  console.log(`Added author: ${name}`);
}

async function formatCreate(name) {
  const format = new Format({ name: name });
  await format.save();
  formats.push(format);
  console.log(`Added format: ${format}`);
}

async function itemCreate(
  name,
  description,
  format,
  category,
  price,
  in_stock
) {
  itemdetail = {
    name: name,
    description: description,
    format: format,
    category: category,
    price: price,
    in_stock: in_stock,
  };
  if (description != false) itemdetail.description = description;

  const item = new Item(itemdetail);

  await item.save();
  items.push(item);
  console.log(`Added item: ${name}`);
}

async function createAuthors() {
  console.log("Adding authors");
  await Promise.all([
    authorCreate("Boards of Canada"),
    authorCreate("Burial"),
    authorCreate("Steve Reich"),
    authorCreate("Jefferson Airplane"),
    authorCreate("Slowdive"),
  ]);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate("Electronic Music"),
    categoryCreate("Classical"),
    categoryCreate("Shoegaze"),
    categoryCreate("Psychedelic Rock"),
  ]);
}

async function createFormats() {
  console.log("Adding formats");
  await Promise.all([
    formatCreate("Vinyl"),
    formatCreate("CD"),
    formatCreate("Casette"),
  ]);
}

async function createItems() {
  console.log("Adding items");
  await Promise.all([
    itemCreate(
      "Music Has The Right To Children",
      authors[0],
      "The best place to start listening to artsy electronic music. A little dated nowadays, but the ambience of the album is unreproducible.",
      formats[0],
      categories[0],
      29.99,
      10
    ),
    itemCreate(
      "Untrue",
      authors[1],
      "This is what electronic music fans mean when they say 'dubstep'.",
      formats[0],
      categories[0],
      19.99,
      10
    ),
    itemCreate(
      "Music for 18 Musicians",
      authors[2],
      false,
      formats[1],
      categories[1],
      24.99,
      10
    ),
    itemCreate(
      "Souvlaki",
      authors[4],
      false,
      formats[2],
      categories[2],
      24.99,
      1
    ),
    itemCreate(
      "Surrealistic Pillow",
      authors[3],
      false,
      formats[0],
      categories[3],
      249.99,
      12
    ),
    itemCreate(
      "Geogaddi",
      authors[0],
      "Scary and satanic. Not for little kids!",
      formats[2],
      "Ultra-rare Japanese promo casette tape signed by the band",
      categories[0],
      9001,
      1
    ),
    itemCreate(
      "Souvlaki",
      authors[4],
      "Self-titled and awesome.",
      formats[2],
      categories[1],
      24.99,
      1
    ),
  ]);
}
