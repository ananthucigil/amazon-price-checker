import {chromium} from "playwright";  //Package for web scraping
import sgMail from "@sendgrid/mail";  //Package for sending mail
import dotenv from "dotenv"; //Environment variable



async function getPrice(url, minimumPrice, email){

  dotenv.config();
  const sendgridApiKey = process.env.SEND_GRID_API_KEY;
  sgMail.setApiKey(sendgridApiKey); 

 try {
    const browser = await chromium.launch({
  headless: true,
  logger: {
    isEnabled: (name, severity) => true,
    log: (name, severity, message, args) => {
      console.log(`${name} ${severity} ${message}`, args);
    },
  },
});

    console.log("browser launched");
    const context = await browser.newContext();
    const page = await context.newPage();
    console.log("Navigating to URL...");
    await page.goto(url);
    console.log("Extracting price...");
    const priceElement = await page.evaluate(()=>document.querySelector(".a-price-whole").textContent);
    await browser.close();

   const price =  parseInt(priceElement);
   if( price <= minimumPrice ){
      try{
        const info =  await sgMail.send({
         to: email,      
         from: 'ananthusijil@gmail.com',   
         subject: 'Amazon Price Checker',
         text: 'The product is cheap now.',
         html: '<strong>The product is cheap now.</strong>',
       })
      }catch(error){
        console.log("Error in sending mail:",error);
      }
       
   }
    
 } catch (error) {
    console.log("error in playwright");
    console.log(error?.response?.body?.errors);
 }
}
export default getPrice;
