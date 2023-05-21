const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Item = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: false, maxLength: 300 },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true, min: 1 },
  in_stock: { type: Number, required: true, min: 0 },
});

ItemSchema.virtual("url").get(function () {
  return `/item/${this._id}`;
});

module.exports = mongoose.model("Item", Item);
