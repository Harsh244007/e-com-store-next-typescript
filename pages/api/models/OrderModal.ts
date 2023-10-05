import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
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
const OrdersModal = mongoose.models.Orders || mongoose.model("Orders", orderSchema);
export default OrdersModal;
