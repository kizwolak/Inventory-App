const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Author = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 150 },
});