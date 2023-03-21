import { Request, Response } from "express";
import { DeliveryModel } from "../models/Delivery";

// GET
export const getDeliveries = async (req: any, res: Response) => {
  try {
    const deliveries = await DeliveryModel.find();
    res.status(200).json(deliveries);
  } catch (error) {
    console.log(error);
  }
};

//POST
export const postDeliveries = async (req: Request, res: Response) => {
  const { orderNumber, status } = req.body;

  try {
    let delivery = {
      orderNumber,
      status,
    };

    const newDelivery = new DeliveryModel(delivery);
    const createdDelivery = await newDelivery.save();
    res.json(createdDelivery);
  } catch (error) {
    console.log(error, "e r r r r or ");
  }
};

//UPDATE
export const updateDeliveries = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { orderNumber, status } = req.body;

  try {
    let updatedDelivery = {
      orderNumber,
      status,
    };

    await DeliveryModel.findOneAndUpdate({ _id: id }, updatedDelivery);
    res.json(updatedDelivery);
  } catch (error) {
    console.log(error);
  }
};

//DELETE
export const deleteDeliveries = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await DeliveryModel.findByIdAndRemove(id);
  } catch (error) {
    console.log(error);
  }
  res.json({ message: "delivery deleted successfully." });
};
