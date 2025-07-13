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
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
    <figure class="h-[200px]">
      <img class="h-full w-full object-cover"
        src=${video.thumbnail}
        alt="Videos" />
    </figure>
    <div class="px-0 py-2 flex gap-2">
      <div>
        <img class="w-10 h-10 rounded-full object-cover" src=${
          video.authors[0].profile_picture
        } />
      </div>
      <div>
        <h2 class="font-bold text-lg">${video.title}</h2>
        <div class="flex items-center">
          <p class="text-gray-400 text-sm">${video.authors[0].profile_name}</p>
            ${
              video.authors[0].verified == true
                ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt=""/>`
                : ``
            }

        </div>
      </div>
    </div>
   `;
    videoContainer.appendChild(card);
  }
};

loadVideoCategories();
loadVideos();
