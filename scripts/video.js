// Fetch Data and show video

const loadVideoCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayVideoCategories(data.categories))
    .catch((error) => console.error("Something Error", error));
};

// Display video Data
const displayVideoCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  for (const category of categories) {
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = category.category;
    categoryContainer.appendChild(button);
  }
};

loadVideoCategories();
