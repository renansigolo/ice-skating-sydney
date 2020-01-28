const functions = require("firebase-functions");
const cheerio = require("cheerio");
// const getUrls = require('get-urls');
// const fetch = require('node-fetch');

const cors = require("cors")({ origin: true });
const puppeteer = require("puppeteer");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.scrapeIce = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    // const body = JSON.parse(request.body);
    const data = await scrappingIceZoo();

    response.send(data);
  });
});

// const scrappingJaquie = async text => {
//   const urls = Array.from(getUrls(text));

//   const requests = urls.map(async url => {
//     const res = await fetch(url);

//     const html = await res.text();
//     const $ = cheerio.load(html);

//     const getMetatag = name =>
//       $(`meta[name=${name}]`).attr("content") ||
//       $(`meta[name="og:${name}"]`).attr("content") ||
//       $(`meta[name="twitter:${name}"]`).attr("content");

//     return {
//       url,
//       title: $("title")
//         .first()
//         .text(),
//       favicon: $('link[rel="shortcut icon"]').attr("href"),
//       // description: $('meta[name=description]').attr('content'),
//       description: getMetatag("description"),
//       image: getMetatag("image"),
//       author: getMetatag("author")
//     };
//   });

//   return Promise.all(requests);
// };

const scrappingIceZoo = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(
    "https://icezoo.com/timetable/#not-set:general-public-skating"
  );

  await page.waitFor(2000);

  // Login form
  //   await page.waitForSelector("table", {
  //     visible: true
  //   });

  const screenshot = await page.screenshot({
    path: "1.png",
    fullPage: true
    // clip: { x: 30, y: 500, width: 800, height: 853 }
  });

  // Execute code in the DOM
  //   const allTable = await page.evaluate(() => {
  //       return document.querySelector(".mptt-table-responsive");
  //       //   let eventSubtitles = document.querySelector("#all");
  //       return allTable;
  //       // let subtitle = Array.from(eventSubtitles).map(v => v.innerHTML);

  //       return subtitle;
  //     });

  await browser.close();

  return screenshot.toJSON();
  return allTable;
  // return allTable.toJSON();
  // return table;
  //   return screenshot.toJSON();

  //   console.log(data);

  //   return data;
};
