const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  description: { type: String, required: false, maxLength: 300 },
  format: { type: Schema.Types.ObjectId, ref: "Format", required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true, min: 1 },
  in_stock: { type: Number, required: true, min: 0 },
});

ItemSchema.virtual("url").get(function () {
  return `/items/item/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);
