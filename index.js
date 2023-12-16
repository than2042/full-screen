let currentImg = 0;
let data = [];

async function getImages(query) {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=zuQjvZ-fC99IvthQ267L9WSdsRBKPDBrRzoVsT1sDqU&per_page=20`
  );

  const json = await response.json();
  data = json.results;
  displayImages();
}

const displayImages = () => {
  const thumbnail = document.getElementById("thumbnail");
  thumbnail.innerHTML = "";

  data.forEach((imgItem, index) => {
    const image = document.createElement("img");
    image.src = imgItem.urls.small;
    image.alt = imgItem.alt_description;
    image.classList.add("thumbnail");
    image.tabIndex = 0;

    thumbnail.setAttribute("role", "status");
    thumbnail.setAttribute("aria-live", "assertive");
    thumbnail.setAttribute("aria-atomic", "true");

    // Add a click event listener to each thumbnail
    image.addEventListener("click", function () {
      showImage(index);
    });

    thumbnail.appendChild(image);
  });

  // Initial display of the first image
  showImage(currentImg);
};

const showImage = (index) => {
  const displayImage = document.getElementById("display");

  const newIndex = index <= 0 ? 0 : index;

  currentImg = newIndex;

  // Clear the display container
  displayImage.innerHTML = "";

  const image = document.createElement("img");
  const p = document.createElement("p");
  image.src = data[index].urls.full;
  image.alt = data[index].alt_description;
  p.textContent = data[index].alt_description;
  image.classList.add("display");
  p.classList.add("description");

  // voice over attribute
  displayImage.setAttribute("role", "status");
  displayImage.setAttribute("aria-live", "assertive");
  displayImage.setAttribute("aria-atomic", "true");

  displayImage.appendChild(image);
  displayImage.appendChild(p);
};

const prevButton = document.getElementById("prevBtn");
const nextButton = document.getElementById("nextBtn");
prevButton.addEventListener("click", function () {
  if (currentImg > 0) {
    showImage(currentImg - 1);
  }
});

nextButton.addEventListener("click", function () {
  if (currentImg < data.length - 1) {
    showImage(currentImg + 1);
  } else {
    showImage(0);
  }
});

const searchImage = document.getElementById("searchImg");
searchImage.addEventListener("submit", function (e) {
  e.preventDefault();
  const queryImg = e.target.query.value;
  getImages(queryImg);
});

// keyboard events

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft" && currentImg > 0) {
    showImage(currentImg - 1);
  } else if (e.key === "ArrowRight" && currentImg < data.length - 1) {
    showImage(currentImg + 1);
  }
});

const skipContent = () => {
  const mainContent = document.getElementById("galleryContainter");
  mainContent.focus();
};

document.addEventListener("keydown", function (e) {
  if (e.key === "Tab") {
    const skipBtn = document.getElementById("skipContent");
    skipBtn.style.display = "flex";
    skipBtn.style.left = "auto";
    skipBtn.focus();
  }
});

document.getElementById("thumbnail").addEventListener("keydown", function (e) {
  const thumbnails = document.querySelectorAll(".thumbnail");

  if (e.key === "ArrowLeft") {
    const newIndex = currentImg > 0 ? currentImg - 1 : 0;
    thumbnails[newIndex].focus();
  } else if (e.key === "ArrowRight") {
    const newIndex =
      currentImg < thumbnails.length - 1
        ? currentImg + 1
        : thumbnails.length - 1;
    thumbnails[newIndex].focus();
  }
});

// Initial fetch
getImages("modern-art");
