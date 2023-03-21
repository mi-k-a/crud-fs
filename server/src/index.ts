import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";
import deliveriesRoutes from "../src/routes/deliveries";

const app = express();
const port = 3004;

config();

// middleware
app.use(express.json({ limit: "50mb" }));
app.use(cors());

// ROUTES
app.use("/deliveries", deliveriesRoutes);

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  })
  .catch((err) => console.log(err.message));
