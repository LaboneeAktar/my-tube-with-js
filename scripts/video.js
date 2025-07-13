// Fetch Data and show categories

const loadVideoCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayVideoCategories(data.categories))
    .catch((error) => console.error("Something Error", error));
};
// Fetch Data and show videos

const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.error("Something Error", error));
};

// Display Categories
const displayVideoCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  for (const category of categories) {
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = category.category;
    categoryContainer.appendChild(button);
  }
};

// Display Videos
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  for (const video of videos) {
    console.log(video);
  }
};

loadVideoCategories();
loadVideos();
