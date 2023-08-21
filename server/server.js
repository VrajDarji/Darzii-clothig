import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { data } from "./data.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const cartD = mongoose.model("cart", {
  id: Number,
  img: String,
  t: String,
  p: Number,
  tag: String,
  sale: Boolean,
  uid: String,
  size: String,
  qty: Number,
});
const user = mongoose.model("user", {
  uid: String,
  email: String,
  name: String,
});
const connect = async () => {
  try {
    await mongoose
      .connect("mongodb+srv://Vraj:Vraj12345@cluster0.hjixgm8.mongodb.net/")
      .then(() => {
        console.log("connected");
        app.listen(5500, () => {
          console.log("Live on 5500");
        });
      });
  } catch (err) {
    console.error(err);
  }
};
app.get("/api/tdata", (req, res) => {
  res.json(data);
});

app.post("/api/cart/data", async (req, res) => {
  try {
    const j = req.body;
    const t = new cartD({
      id: j?.id,
      img: j?.img,
      t: j?.t,
      p: j?.p,
      tag: j?.tag,
      sale: j?.sale,
      uid: j?.uid,
      size: j?.size,
      qty: j?.qty,
    });
    const save = await t.save();
    res.json(save);
  } catch (err) {
    console.error(err);
  }
});
app.get("/api/cart/data", async (req, res) => {
  try {
    const a = await cartD.find();
    res.json(a);
  } catch (err) {
    console.log(err);
  }
});
app.delete("/api/cart/data/:id", async (req, res) => {
  const id = req.params.id;
  const j = await cartD.findByIdAndDelete(id);
  try {
    if (j) {
      res.json({ m: "deleted" });
      res.status(200);
    } else {
      console.error("failed to delete");
    }
  } catch (err) {
    console.error(err);
  }
});
var b = "undefined";
app.post("/api/user/data", async (req, res) => {
  try {
    const a = req.body;
    b = a;
    const j = new user({
      uid: a?.user?.uid,
      email: a?.user?.email,
      name: a?.user?.displayName,
    });
    const s = await j.save();
    res.json(s);
  } catch (err) {
    console.error(err);
  }
});
app.get("/api/user/data", async (req, res) => {
  try {
    res.json(b);
  } catch (err) {
    console.error(err);
  }
});
connect();
