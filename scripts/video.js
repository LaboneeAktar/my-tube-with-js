// Fetch Data and show video

const loadVideoCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayVideoCategories(data.categories))
    .catch((error) => console.error("Something Error", error));
};

// Display video Data
const displayVideoCategories = (data) => {
  console.log(data);
};

loadVideoCategories();
