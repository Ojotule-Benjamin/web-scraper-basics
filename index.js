const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();

const url = "https://www.theguardian.com/uk";
const link = url.split("/").slice(0, -1).join("/");

axios(url)
  .then((response) => {
    const html = response.data;

    //using cheerio
    const $ = cheerio.load(html);
    const articles = [];

    $(".dcr-omk9hw", html).each(function () {
      const url = $(this).find("a").attr("href");
      const subject = $(this).find(".dcr-v1s16m").text().trim();
      const title = $(this).find("h3 .show-underline").text().trim();
      const articleUrl = link.concat(url);
      articles.push({
        articleUrl,
        subject,
        title,
      });
    });
    //console.log(articles);
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
