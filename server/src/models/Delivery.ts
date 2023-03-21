import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DeliverySchema = new Schema({
  orderNumber: String,
  status: String,
});

export const DeliveryModel = mongoose.model("Delivery", DeliverySchema);
