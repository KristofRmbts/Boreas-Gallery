const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      unique: true
    },
    description: {
      type: String,
      required: [true, 'Description is required.']
    },
    price: {
      type: Number,
      required: [true, 'Price is required.'],
    },
    size: [{
      type: String,
      required: [true, 'Description is required.'],
      enum: ["8x12", "10x15", "12x18", "16x24"],
      required: [true, 'Available sizes are required.'],
    }],
    border: [{
      type: String,
      enum: ["No border", "White border"],
      default: "user",
      required: [true],
    }],
    image: {
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

const User = model("Item", itemSchema);

module.exports = User;
