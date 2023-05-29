const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Category = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
});

// Virtual for this genre instance URL.
Category.virtual("url").get(function () {
  return "/categories/category/" + this._id;
});

// Export model.
module.exports = mongoose.model("Category", Category);
