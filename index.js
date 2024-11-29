import {chromium} from "playwright";  //Package for web scraping
import sgMail from "@sendgrid/mail";  //Package for sending mail
import dotenv from "dotenv"; //Environment variable



async function getPrice(url, minimumPrice, email){

  dotenv.config();
  const sendgridApiKey = process.env.SEND_GRID_API_KEY;
  sgMail.setApiKey(sendgridApiKey); 

 try {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(url);
    const priceElement = await page.evaluate(()=>document.querySelector(".a-price-whole").textContent);
    await browser.close();

   const price =  parseInt(priceElement);
   if( price <= minimumPrice ){

      const info =  await sgMail.send({
         to: email,      
         from: 'ananthusijil@gmail.com',   
         subject: 'Amazon Price Checker',
         text: 'The product is cheap now.',
         html: '<strong>The product is cheap now.</strong>',
       }) 
   }
    
 } catch (error) {
    console.log(error?.response?.body?.errors);
 }
}
export default getPrice;
