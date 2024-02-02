import mongoose from "mongoose";

const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    imageURL: {
      type: String,
      required: [true, "Image URL is required"],
    },
    color: {
      type: String,
      default: "#fff",
    },
    status: {
      type: String,
      enum: ["published", "draft"],
      required: [true, "category status is required"],
      default: "published",
    },
  },
  { timestamps: true }
);

export default mongoose.models["Category"] ||
  mongoose.model("Category", CategorySchema);
