const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const cors = require("cors");
const app = express();
const url = `https://www.theguardian.com/uk`;

app.use(cors());

app.get("/", (req, resp) => {
  resp.json("This is my webscraper");
});

app.get("/results", (req, resp) => {
  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const articles = [];
      $(".fc-item__title", html).each(function () {
        const title = $(this).text();
        const url = $(this).find("a").attr("href");
        articles.push({
          title,
          url,
        });
      });
      resp.json(articles);
    })
    .catch((e) => console.log(e));
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
