// Get time - hour, minute, second
const getTimeString = (time) => {
  const day = parseInt(time / 86400);
  let remainingMinute = time % 86400;
  const hour = parseInt(remainingMinute / 3600);
  let remainingSecond = remainingMinute % 3600;
  const minute = parseInt(remainingSecond / 60);
  remainingSecond = minute % 60;

  if (day != 0 && hour != 0 && minute != 0 && remainingSecond != 0) {
    return `${day} days ${hour} hrs ${minute} mins ${remainingSecond} s ago`;
  } else if (day == 0 && hour != 0 && minute != 0 && remainingSecond != 0) {
    return `${hour} hrs ${minute} mins ${remainingSecond} s ago`;
  } else if (day == 0 && hour == 0 && minute != 0 && remainingSecond != 0) {
    return `${minute} mins ${remainingSecond} s ago`;
  } else if (day == 0 && hour == 0 && minute == 0 && remainingSecond != 0) {
    return `${remainingSecond} s ago`;
  } else {
    return `${remainingMinute}`;
  }
};

// Remove Active Class
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (btn of buttons) {
    btn.classList.remove("active");
  }
};

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

// Load Category videos
const loadCategoryVideos = (id) => {
  fetch(` https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      displayVideos(data.category);
    })
    .catch((error) => console.error("Something Error", error));
};

// Display Categories
const displayVideoCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  for (const category of categories) {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
     <button id="btn-${category.category_id}" class="btn category-btn" onclick= "loadCategoryVideos(${category.category_id})">
      ${category.category}
     </button>
    `;
    categoryContainer.appendChild(buttonContainer);
  }
};

// Display Videos
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";

  if (videos.length == 0) {
    videoContainer.innerHTML = `
     <div
        class="py-20 col-span-full flex flex-col justify-center items-center text-center"
      >
        <img class="w-[120px]" src="./images/Icon.png" alt="" />
        <h2 class="text-2xl font-bold">
          Oops!! Sorry, There is no content here
        </h2>
      </div>
    `;
    return;
  }

  for (const video of videos) {
    // console.log(video);
    const card = document.createElement("div");
    card.classList =
      "card card-compact transition duration-300 ease-in-out transform hover:scale-90 hover:opacity-75";

    card.innerHTML = `
    <figure class="h-[200px] relative">
      <img class="h-full w-full object-cover cursor-pointer"
        src=${video.thumbnail}
        alt="video_thumbnail" />
        ${
          video.others.posted_date?.length == 0
            ? ""
            : `<span
            class="absolute bottom-2 right-2 text-sm rounded text-white bg-black px-2"
            >${getTimeString(video.others.posted_date)}</span>`
        }
        
    </figure>
    <div class="px-0 py-2 flex gap-2">
      <div>
        <img class="w-10 h-10 rounded-full object-cover" src=${
          video.authors[0].profile_picture
        } />
      </div>
      <div>
        <h2 class="font-bold text-lg">${video.title}</h2>
        <div class="flex items-center justify-between">
          <p class="text-gray-400 text-sm flex gap-1">${
            video.authors[0].profile_name
          } ${
      video.authors[0].verified == true
        ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt=""/>`
        : ``
    }</p>
    </div>
    <p class="text-sm text-gray-400">${video.others.views} views</p>
      </div>
    </div>
   `;

    videoContainer.appendChild(card);
  }
};

loadVideoCategories();
loadVideos();
