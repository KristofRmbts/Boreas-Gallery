const { Schema, model } = require("mongoose");

const exhibitionSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      unique: true,
    },
    artist: {
      type: String,
      required: [true, "Artist is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    runningTime: {
      type: String,
      required: [true, "Running time is required."],
    },
    subtext1: {
      type: String,
    },
    subtext2: {
      type: String,
    },
    subtext3: {
      type: String,
    },
    images: [
      {
        type: String,
        required: [true],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Item = model("Exhibition", exhibitionSchema);

module.exports = Item;
