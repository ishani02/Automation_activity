const puppeteer = require("puppeteer");
let cred=require("./credentials");

let gTab;
(async function () {
  try {
    //build browser
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      // slowMo: 50,
      args: ["--start-maximized"],
    });

    //build tab/page
    const pages = await browser.pages();
    const page = pages[0];
    gTab = page;

    //go to page
    await page.goto("https://www.instagram.com/accounts/login/", { waitUntil: "networkidle2" });
    await page.waitForSelector('input[name="username"]' , {visible:true});
    await page.type("input[name='username']", cred.newid);
    await page.type("input[name='password']", cred.newpw);
    await page.waitForSelector('button[type="submit"]',{visible:true})
    await page.click('button[type="submit"]');
    console.log("Logged in!!");

    await clickAndWait(".sqdOP.L3NKy.y3zKF "); //to click on save info
    await page.waitForSelector(".aOOlW.HoLwm", {visible:true});
    await page.click(".aOOlW.HoLwm");
    await page.waitForSelector('input[placeholder="Search"]' , {visible:true});
    await page.type("input[placeholder='Search']", "mercedesbenz");
    await page.waitForSelector("a[href='/mercedesbenz/']",{visible:true});
    await clickAndWait("a[href='/mercedesbenz/']");
    await page.waitForSelector("._9AhH0", { visible: true });
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle0" }),
      page.click("._9AhH0"),
    ]);
    console.log("Post opened !!");
    await page.waitForSelector(".fr66n .wpO6b", { visible: true });
    await page.click(".fr66n .wpO6b");// 1 post liked

   for(let i=1 ; i<=32 ; i++){
     await page.click("._65Bje.coreSpriteRightPaginationArrow"); //"next" arrow clicked
     await page.waitForSelector(".fr66n .wpO6b", { visible: true }); // wait for like btn
     await page.click(".fr66n .wpO6b"); // click on like
   }
   console.log("32 posts liked !!")



  } catch (err) {
    console.log(err);
  }
})();

async function clickAndWait(selector) {//Do not use click and wait func when no navigation presesnt i.e. when link doesn't change
  try {
    await Promise.all([gTab.waitForNavigation({ waitUntil: "networkidle0" }), gTab.click(selector)]);
  } catch (err) {
    console.log(err);
  }
}