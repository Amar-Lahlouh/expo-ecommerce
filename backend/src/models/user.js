import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
});
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    //this to create relation between clerk and mongodb
    clerkId: {
      type: String,
      unique: true,
      required: true,
    },
    addresses: [addressSchema],
    //array of id of products
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timpestamps: true,
  },
);

export const User = mongoose.model("User", UserSchema);
