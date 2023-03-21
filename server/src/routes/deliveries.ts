import express from "express";
import {
  deleteDeliveries,
  getDeliveries,
  postDeliveries,
  updateDeliveries,
} from "../controller/deliveriesController";

const router = express.Router();

// GET
router.get("/", getDeliveries);

//POST
router.post("/", postDeliveries);

//UPDATE
router.patch("/:id", updateDeliveries);

//DELETE
router.delete("/:id", deleteDeliveries);

export default router;
