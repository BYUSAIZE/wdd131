// ---------- Temple Data ----------
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "images/temple1.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "images/Manti-Utah.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "images/payson-utah.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "images/temple2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "images/temple3.jpg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "images/Lima-peru.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "images/mexico-city.jpg"
  },
  {
    templeName: "Cardston Alberta",
    location: "Cardston, Alberta, Canada",
    dedicated: "1923, August, 26",
    area: 88562,
    imageUrl: "images/cardston.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl: "images/Rome-italy.jpg"
  },
  {
    templeName: "St. George Utah",
    location: "St. George, Utah, United States",
    dedicated: "1877, April, 6",
    area: 110000,
    imageUrl: "images/St-george.jpg"
  }
];

// ---------- DOM Elements ----------
const gallery = document.querySelector("#temple-gallery");
const filterHeading = document.querySelector("#filter-heading");
const navLinks = document.querySelectorAll("#main-nav a");
const menuToggle = document.querySelector("#menu-toggle");
const mainNav = document.querySelector("#main-nav");

// ---------- Render Function ----------
function displayTemples(templeList) {
  gallery.innerHTML = "";

  templeList.forEach((temple) => {
    const card = document.createElement("figure");
    card.classList.add("temple-card");

    card.innerHTML = `
      <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy" />
      <figcaption>
        <h3>${temple.templeName}</h3>
        <p><strong>Location:</strong> ${temple.location}</p>
        <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
        <p><strong>Size:</strong> ${temple.area.toLocaleString()} sq ft</p>
      </figcaption>
    `;

    gallery.appendChild(card);
  });
}

// ---------- Filter Logic ----------
function applyFilter(filter, label) {
  let filtered = [];

  switch (filter) {
    case "old":
      filtered = temples.filter((t) => {
        const year = parseInt(t.dedicated.split(",")[0], 10);
        return year < 1900;
      });
      break;

    case "new":
      filtered = temples.filter((t) => {
        const year = parseInt(t.dedicated.split(",")[0], 10);
        return year > 2000;
      });
      break;

    case "large":
      filtered = temples.filter((t) => t.area > 90000);
      break;

    case "small":
      filtered = temples.filter((t) => t.area < 10000);
      break;

    case "home":
    default:
      filtered = temples;
      break;
  }

  filterHeading.textContent = label;
  displayTemples(filtered);
}

// ---------- Event Listeners ----------
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    applyFilter(link.dataset.filter, link.textContent);

    if (mainNav.classList.contains("open")) {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

// ---------- Initial Render ----------
applyFilter("home", "Home");