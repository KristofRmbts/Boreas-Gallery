const { Schema, model } = require("mongoose");

const itemSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    exhibition: {
      type: String,
      required: [true, "Exhibition name is required."],
    },
    artist: {
      type: String,
      required: [true, "Artist name is required."],
    },
    quantity: {
      type: String,
    },
    size: [
      {
        type: String,
        enum: ["8x12", "10x15", "12x18", "16x24"],
        required: [true, "Available sizes are required."],
      },
    ],
    material: [
      {
        type: String,
        enum: ["Professional paper", "Fine art paper"],
        required: [true],
      },
    ],
    border: [
      {
        type: String,
        enum: ["No border", "White border"],
        required: [true],
      },
    ],
    imageUrl: {
      type: String,
      required: [true, "Image is required."],
    },
  },
  {
    timestamps: true,
  }
);

const Item = model("Item", itemSchema);

module.exports = Item;
