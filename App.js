const newsContainer = document.querySelector("#card-container");
//const saveButton = document.querySelector(".save-news");
const loadSavedButton = document.querySelector("#view-savednews");
const categorySelect = document.querySelector("#categoryselect");
const categories = ["technology", "business", "all", "sports", "world", "politics", "hatke", "science", "automobile"];
categories.forEach(category => {
const categoryButton = document.getElementById(category);
categoryButton.addEventListener("click", function(){
getNews(category);
});
});

function changeColorHeart(titleData){
  let abc = titleData.style.color;
  if(abc == "red"){
    titleData.style.color="white";
  }else{
  titleData.style.color="red";
  }
}

//showDiv function will work for the onload and new news button
function showDiv() {
  getNews(category ="all");
}
var getLatestNews = document.getElementById("get-latest-news");
  var stayUpdated = document.getElementById("stay-updated");
  getLatestNews.style.opacity = 1;
  stayUpdated.style.opacity = 0;

  setInterval(function() {
    if (getLatestNews.style.opacity == 1) {
      getLatestNews.style.opacity = 0;
      stayUpdated.style.opacity = 1;
    } else {
      getLatestNews.style.opacity = 1;
      stayUpdated.style.opacity = 0;
    }
  }, 2000);
  ///////
  const savedNews =[];
  const putSavedNews = (savedItem) => {
    savedNews.push(savedItem);
  alert("News saved")
}
const getNews = (category = "science") => {
  let loaderDiv = document.querySelector(".vigshetty");
        loaderDiv.style.display = "block";
  newsContainer.innerHTML = "";
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  fetch(`https://api.currentsapi.services/v1/latest-news?apiKey=PS3mlURfIZ2UA7d-Lqo7C4H45n4XYnYe_HHBEmy89zqwpW0a&category=${category}`)
    .then((response) => response.json())
    .then((data) => {
      const categoryHeading = document.createElement("h2");
      categoryHeading.textContent = categoryName;
      categoryHeading.style.textAlign ='center';
      newsContainer.appendChild(categoryHeading);
       //console.log("Data", data)
      data.news.forEach((newsItem) => {
        let loaderDiv = document.querySelector(".vigshetty");
        loaderDiv.style.display = "none";
        const cards = document.createElement("div");
        cards.classList.add("card");
        cards.innerHTML = `
        <div class="card-header">
          <div class="writer-name">Author:${newsItem.author}</div>
          <div class="category-name">Category:${categoryName}</div>
        </div>
        <div class="card-body">
          <p class="card-title">${newsItem.title} </p>
          <button id="read-more" onclick=" readmore(this, this.closest('.card'))" class="read-more">Read More</button>
          <div class="card-content-container">
          <div class="card-img-container">
              <img src="${newsItem.image}" class="img"></img>
              </div>
              <p class="content">${newsItem.description}</p>
            </div>
            
        </div>
        <div class="card-footer">
          <p class="date">Date:${newsItem.published.slice(0, 10)}, Time:${newsItem.published.slice(11, 16)}</p>
          <div class="card-footer-right">
     <a class="hrt-btn" onclick="changeColorHeart(this)"><i class="fa-solid fa-heart"></i></a>
          <button class="source-url"  data-url="${newsItem.readMoreUrl}">Source</button>
          </div>
        </div>
       
        `;
        const saved = document.createElement("button");

        saved.className += "save-news";
        saved.innerHTML = "Save"
        saved.onclick = function () {
        putSavedNews(newsItem)
        }
        const save1Btn = cards.querySelector('.source-url');
        const parentDiv = save1Btn.parentNode;
        parentDiv.appendChild(saved);

        newsContainer.appendChild(cards);
      });
      const sourceUrlBtns = document.querySelectorAll('.source-url');
      sourceUrlBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const url = btn.dataset.url;
          window.open(url, '_blank');
        });
      });
      
});
};

function readmore(button, card) {
    const cardBody = card.querySelector('.card-body');
    const cardImg = card.querySelector('.card-img-container img');
    const cardContent = card.querySelector('.card-content-container');
  const readMoreBtn = button;
  console.log(cardImg);

    if (readMoreBtn.innerHTML === "Read More") {

      cardBody.style.height = 'auto';
      cardContent.style.maxHeight = '1000px';
      cardImg.style.width = '100%';
      readMoreBtn.innerHTML = 'Read Less';
      readMoreBtn.style.backgroundColor = 'grey';
    } else {
      cardBody.style.height = '120px';
      cardContent.style.maxHeight = '';
      cardImg.style.width = 'auto';
      readMoreBtn.innerHTML = 'Read More';
      readMoreBtn.style.backgroundColor = '#0077ff';
    }
  };
  const saveNews = () => {
    const news = Array.from(document.querySelectorAll(".card")).map(
      (newsItem) => {
        return {
          title: newsItem.querySelector(".card-title").textContent,
          content: newsItem.querySelector(".content").textContent,
          author: newsItem.querySelector(".writer-name").textContent,
          categoryName:newsItem.querySelector(".category-name").textContent,
          imageUrl: newsItem.querySelector(".img").imageUrl,
          date: newsItem.querySelector(".date").textContent,
          time:newsItem.querySelector(".date")/textContent,
          readMoreUrl:newsItem.querySelector(".source-url").url
        };
      }
    );
    localStorage.setItem("savedNews", JSON.stringify(news));
  };
  const loadSavedNews = () => {
    newsContainer.innerHTML = "";
    category ="undefined"
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
    if (!savedNews) {
      return;
    }
    savedNews.forEach((newsItem) => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
      <div class="card-header">
      <div class="writer-name">Author:${newsItem.author}</div>
      <div class="category-name">Category:${categoryName}</div>
    </div>
    <div class="card-body">
      <p class="card-title">${newsItem.title} </p>
      <button id="read-more" onclick=" readmore(this, this.closest('.card'))" class="read-more">Read More</button>
      <div class="card-content-container">
      <div class="card-img-container">
          <img src="${newsItem.imageUrl}" class="img"></img>
          </div>
          <p class="content">${newsItem.content}
          </p>
        </div>
    </div>
    <div class="card-footer">
      <p class="date">Date:${newsItem.date}, Time:${newsItem.time}</p>
      <div class="card-footer-right">
      <button class="source-url"  data-url="${newsItem.readMoreUrl}">Source</button>
      <a class="hrt-btn" onclick="changeColorHeart(this)"><i class="fa-solid fa-heart"></i></a>
      </div>
    </div>
      `;
        newsContainer.appendChild(div);
    });
    const sourceUrlBtns = document.querySelectorAll('.source-url');
      sourceUrlBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const url = btn.dataset.url;
          window.open(url, '_blank');
        });
      });
  };
  loadSavedButton.addEventListener("click", loadSavedNews);
