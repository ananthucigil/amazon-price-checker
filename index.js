import {chromium} from "playwright";

async function getPrice(){
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://www.amazon.in/Lifelong-Dumbbells-Equipment-Exercise-Warranty/dp/B09W5PSTBP");
  const priceElement = await page.evaluate(()=>document.querySelector(".a-price-whole"));
  const priceString = priceElement.textContent;
  console.log(priceString);
  await browser.close()
}
getPrice();