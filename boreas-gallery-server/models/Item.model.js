const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const itemSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required.'],
      unique: true
    },
    description: {
      type: String,
      required: [true, 'Description is required.']
    },
    exhibition: {
      type: String,
      required: [true, 'Exhibition name is required.']
    },
    price: {
      type: Number,
      required: [true, 'Price is required.'],
    },
    size: [{
      type: String,
      enum: ["8x12", "10x15", "12x18", "16x24"],
      // required: [true, 'Available sizes are required.'],
    }],
    material: [{
      type: String,
      // required: [true],
    }],
    border: [{
      type: String,
      enum: ["No border", "White border"],
      // required: [true],
    }],
    imageUrl: {
        type: String,
        required: [true, 'Image is required.'],
      },
    order: [
      {type: Schema.Types.ObjectId, ref: "Order"},
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Item = model("Item", itemSchema);

module.exports = Item;
