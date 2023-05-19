const { Schema, model } = require("mongoose");

const artistSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    email: {
      type: String,
    },
    social1: {
      type: String,
    },
    social2: {
      type: String,
    },
    social3: {
      type: String,
    },
    imageUrl: {
      type: String,
      required: [true, "Image is required."],
    },
  },
  {
    timestamps: true,
  }
);

const Artist = model("Artist", artistSchema);

module.exports = Artist;
