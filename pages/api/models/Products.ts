import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String },
  price: { type: Number },
  description: { type: String },
  category: { type: String },
  image: { type: String },
  rating: {
    rate: { type: Number },
    count: { type: Number },
  },
});
const ProductsModal = mongoose.models.Products || mongoose.model("Products", productSchema);
export default ProductsModal;
