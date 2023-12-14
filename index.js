let currentImg = 0;

async function getImages(query) {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=zuQjvZ-fC99IvthQ267L9WSdsRBKPDBrRzoVsT1sDqU&per_page=20`
  );

  const json = await response.json();
  displayImages(json.results);
}

// create image
const displayImages = (data) => {
  const thumbnail = document.getElementById("thumbnail");
  //   const displayEach = document.getElementById("display");
  //   const carousel = document.querySelector(".carousel");

  thumbnail.innerHTML = "";

  data.map((imgItem) => {
    const image = document.createElement("img");
    image.src = imgItem.urls.full;
    image.alt = imgItem.alt_description;
    image.classList.add(".thumbnail");

    thumbnail.appendChild(image);

    console.log(imgItem);
  });

  slider(currentImg);
};

const slider = (index) => {
  //   const carousel = document.querySelector(".carousel");
  const slides = document.querySelectorAll(".thumbnail");
  const totalSildes = slides.length;

  if (index < 0) {
    currentImg = totalSildes - 1;
  } else if (index >= totalSildes) {
    currentImg = 0;
  } else {
    currentImg = index;
  }
};

document.getElementById("prevBtn").addEventListener("click", function () {
  slider(currentImg - 1);
});

document.getElementById("nextBtn").addEventListener("click", function () {
  slider(currentImg + 1);
});

const form = document.getElementById("searchImg");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const queryImg = e.target.query.value;
  getImages(queryImg);
});

getImages("london");
