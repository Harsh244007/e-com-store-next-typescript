import mongoose from "mongoose";

const discountSchema = new mongoose.Schema({
  price: { type: Number },
  discountCode: { type: String },
  isValid: { type: Boolean }
});
const DiscountsModal = mongoose.models.Discounts || mongoose.model("Discounts", discountSchema);
export default DiscountsModal;
