const loader = document.getElementById("loader");
const heading = document.getElementById("heading");

// Translate page using Google translator
function translatePage(lang) {
  window.location =
    "https://translate.google.com/translate?sl=en&tl=" +
    lang +
    "&u=" +
    encodeURIComponent(location.href);
}

// Fetch news when category clicked

document.querySelectorAll(".category").forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;
    const categoryName = btn.innerText;
    document.getElementById("heading").innerText = categoryName;
    fetchNewsByCategory(category);
  });
});

// Build API URL dynamically

const fetchNewsByCategory = async (category) => {
  try {
    loader.classList.remove("d-none");

    const url = `https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=126a3d38a0ac4efaae38cfc99af0e7be`;

    const response = await fetch(url);
    const data = await response.json();
    displayNews(data.articles);
    loader.classList.add("d-none");
  } catch (error) {
    console.error(error);
  }
};

const loadDefaultNews = async () => {
  try {
    loader.classList.remove("d-none");

    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=126a3d38a0ac4efaae38cfc99af0e7be`;

    const response = await fetch(url);
    const data = await response.json();

    heading.innerText = "Today’s Top Stories";
    displayNews(data.articles);

    loader.classList.add("d-none");
  } catch (error) {
    console.error(error);
  }
};

const displayNews = (news) => {
  const displayCards = document.getElementById("displayCards");

  displayCards.innerHTML = "";
  news.forEach((newsdata) => {
    const div = document.createElement("div");
    div.classList.add("col-lg-4", "col-md-6", "col-sm-12", "mt-5", "d-flex");

    div.innerHTML = `<div class="card p-3 shadow-sm">
                            <div class="card-title fs-5 fw-semibold">${
                              newsdata.title
                            }</div>

                            <div class="d-flex justify-content-between px-2">
                                <div id="author" class="fs-6 mb-2">Author: ${
                                  newsdata.author || "Unknown"
                                }</div>
                                <div id="source" class="fs-6 mb-2">Source: ${
                                  newsdata.source.name
                                }</div>
                            </div>

                            <img
                                src="${newsdata.urlToImage}"
                                alt="" class="card-img-top">

                            <div class="card-body p-0 py-3">
                                <div class="card-text">${
                                  newsdata.description || ""
                                }</div>
                                <a
                                    href="${newsdata.url}"
                                    class="btn mt-3 btn-outline-dark"
                                    target="_blank">Read Article</a>
                            </div>
                        </div>`;

    displayCards.appendChild(div);
  });
};

const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  searchNews(query);
});

const searchNews = async (search) => {
  if (!search) return;
  loader.classList.remove("d-none");
  const url = `https://newsapi.org/v2/everything?q=${search}&apiKey=126a3d38a0ac4efaae38cfc99af0e7be`;

  const response = await fetch(url);
  const data = await response.json();

  displayNews(data.articles);
  heading.innerText = `Search results for "${search}"`;

  loader.classList.add("d-none");
};

window.addEventListener("DOMContentLoaded", loadDefaultNews);
