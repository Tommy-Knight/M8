import ProductsSchema from "./schema.js";
import mongoose from "mongoose";

export default mongoose.model("products", ProductsSchema);