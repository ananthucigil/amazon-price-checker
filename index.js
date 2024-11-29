import {chromium} from "playwright";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import express from "express";
const app = express();
const port = process.env.PORT_NUMBER;
dotenv.config();
const sendgridApiKey = process.env.SEND_GRID_API_KEY;
sgMail.setApiKey(sendgridApiKey); 
async function getPrice(){
 try {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.amazon.in/Lifelong-Dumbbells-Equipment-Exercise-Warranty/dp/B09W5PSTBP");
    const priceElement = await page.evaluate(()=>document.querySelector(".a-price-whole").textContent);
    const priceString = priceElement;
    console.log(priceString);
    await browser.close();
    const info =  await sgMail.send({
        to: 'hehoc67407@nausard.com',      
        from: 'ananthusijil@gmail.com',   
        subject: 'Test Email via SendGrid',
        text: 'This is a test email sent using SendGrid.',
        html: '<strong>This is a test email sent using SendGrid.</strong>',
      })
 } catch (error) {
    console.log(error.response.body.errors);
 }
}
getPrice();
app.listen(port,()=>{
   console.log(`Server listening on port: ${port}`)
})