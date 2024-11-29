import express from "express";
import getPrice from "./index.js";
import dotenv from "dotenv";
//import bodyParser from ""
dotenv.config();
const app = express();
const port = process.env.PORT_NUMBER;
app.use(express.urlencoded());
app.get("/",(req,res)=>{
  res.render("main.ejs")
})

app.post("/submit-form",(req,res)=>{
  const price = parseInt(req.body["min-price"])
  getPrice(req.body.url, price, req.body.email);
  res.send("<h1>A mail will be sent to your email address whenever the price drops to the mentioned price.</h1>")
})







app.listen(port,()=>{
    console.log(`Server listening on port: ${port}`)
 })