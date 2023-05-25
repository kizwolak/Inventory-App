#! /usr/bin/env node

// Get arguments passed on command line

const Category = require("./models/category");
const Item = require("./models/item");
const Author = require("./models/author");
require("dotenv").config();

const categories = [];
const items = [];
const authors = [];

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

async function createItems() {
  console.log("Adding items");
  await Promise.all([
    itemCreate(
      "Music Has The Right To Children",
      authors[0],
      "The best place to start listening to artsy electronic music. A little dated nowadays, but the ambience of the album is unreproducible.",
      "Vinyl",
      categories[0],
      29.99,
      10
    ),
    itemCreate(
      "Untrue",
      authors[1],
      "This is what electronic music fans mean when they say 'dubstep'.",
      "Vinyl",
      categories[0],
      19.99,
      10
    ),
    itemCreate(
      "Music for 18 Musicians",
      authors[2],
      false,
      "CD",
      categories[1],
      24.99,
      10
    ),
    itemCreate(
      "Souvlaki",
      authors[4],
      false,
      "Casette",
      categories[2],
      24.99,
      1
    ),
    itemCreate(
      "Surrealistic Pillow",
      authors[3],
      false,
      "Vinyl",
      categories[3],
      249.99,
      12
    ),
    itemCreate(
      "Geogaddi",
      authors[0],
      "Scary and satanic. Not for little kids!",
      "Ultra-rare Japanese promo casette tape signed by the band",
      categories[0],
      9001,
      1
    ),
    itemCreate(
      "Souvlaki",
      authors[4],
      "Self-titled and awesome.",
      "Vinyl",
      categories[2],
      24.99,
      1
    ),
  ]);
}

// async function createBooks() {
//   console.log("Adding Books");
//   await Promise.all([
//     bookCreate(
//       "The Name of the Wind (The Kingkiller Chronicle, #1)",
//       "I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.",
//       "9781473211896",
//       authors[0],
//       [genres[0]]
//     ),
//     bookCreate(
//       "The Wise Man's Fear (The Kingkiller Chronicle, #2)",
//       "Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.",
//       "9788401352836",
//       authors[0],
//       [genres[0]]
//     ),
//     bookCreate(
//       "The Slow Regard of Silent Things (Kingkiller Chronicle)",
//       "Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.",
//       "9780756411336",
//       authors[0],
//       [genres[0]]
//     ),
//     bookCreate(
//       "Apes and Angels",
//       "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...",
//       "9780765379528",
//       authors[1],
//       [genres[1]]
//     ),
//     bookCreate(
//       "Death Wave",
//       "In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...",
//       "9780765379504",
//       authors[1],
//       [genres[1]]
//     ),
//     bookCreate(
//       "Test Book 1",
//       "Summary of test book 1",
//       "ISBN111111",
//       authors[4],
//       [genres[0], genres[1]]
//     ),
//     bookCreate(
//       "Test Book 2",
//       "Summary of test book 2",
//       "ISBN222222",
//       authors[4],
//       false
//     ),
//   ]);
// }

// async function createBookInstances() {
//   console.log("Adding authors");
//   await Promise.all([
//     bookInstanceCreate(books[0], "London Gollancz, 2014.", false, "Available"),
//     bookInstanceCreate(books[1], " Gollancz, 2011.", false, "Loaned"),
//     bookInstanceCreate(books[2], " Gollancz, 2015.", false, false),
//     bookInstanceCreate(
//       books[3],
//       "New York Tom Doherty Associates, 2016.",
//       false,
//       "Available"
//     ),
//     bookInstanceCreate(
//       books[3],
//       "New York Tom Doherty Associates, 2016.",
//       false,
//       "Available"
//     ),
//     bookInstanceCreate(
//       books[3],
//       "New York Tom Doherty Associates, 2016.",
//       false,
//       "Available"
//     ),
//     bookInstanceCreate(
//       books[4],
//       "New York, NY Tom Doherty Associates, LLC, 2015.",
//       false,
//       "Available"
//     ),
//     bookInstanceCreate(
//       books[4],
//       "New York, NY Tom Doherty Associates, LLC, 2015.",
//       false,
//       "Maintenance"
//     ),
//     bookInstanceCreate(
//       books[4],
//       "New York, NY Tom Doherty Associates, LLC, 2015.",
//       false,
//       "Loaned"
//     ),
//     bookInstanceCreate(books[0], "Imprint XXX2", false, false),
//     bookInstanceCreate(books[1], "Imprint XXX3", false, false),
//   ]);
// }
