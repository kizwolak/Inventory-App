const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AutorSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 150 },
});

AutorSchema.virtual("url").get(function () {
  return `/authors/author/${this._id}`;
});

module.exports = mongoose.model("Author", AutorSchema);
