const feed = document.querySelector("#feed");

fetch("http://localhost:8000/results")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((article) => {
      const item = `<div><h3>${article.title}</h3><a href='${article.url}'>${article.url}</a></div>`;
      feed.insertAdjacentHTML("beforeend", item);
    });
  })
  .catch((e) => console.log(e));
