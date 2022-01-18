import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const AccountSchema = new Schema(
  {
    username: String,
    password: String,
    role: String,
    createAt: Date,
  },
  {
    collection: "Account",
  }
);

mongoose.connect("mongodb://localhost:27017/LeeTestDatabase");

export const AccountModal = mongoose.model("Account", AccountSchema);
