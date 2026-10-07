/* ==========================================================
   Street Sweep — main.js
   Shared across all pages. Each function checks that its
   target element exists before running, so this one file is
   safe to include on every page.
   ========================================================== */

const STORAGE_KEY = "streetSweepVolunteers";
let volunteers = [];

/* ---------- Mobile nav toggle ---------- */
function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggle.textContent = isOpen ? "Close Menu ✕" : "Menu ☰";
  });
}

/* ---------- Cleanup events (object + array) ---------- */
const cleanupEvents = [
  {
    name: "Riverside Park Sweep",
    location: "Riverside Park, north trailhead",
    date: "2026-10-18",
    spots: 14,
    capacity: 20
  },
  {
    name: "Downtown Block Cleanup",
    location: "Main Street, 2nd to 8th Ave",
    date: "2026-10-25",
    spots: 3,
    capacity: 15
  },
  {
    name: "Harborline Litter Patrol",
    location: "Harborline Walkway",
    date: "2026-11-08",
    spots: 9,
    capacity: 12
  }
];

function formatEventDate(isoDate) {
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric"
  });
}

function renderEvents() {
  const list = document.getElementById("event-list");
  if (!list) return;

  const cardsHtml = cleanupEvents
    .map((event) => {
      const isFull = event.spots <= 0;
      const spotsLabel = isFull
        ? "Full — join the waitlist"
        : `${event.spots} of ${event.capacity} spots open`;
      const lowClass = !isFull && event.spots <= 5 ? "low" : "";

      return `
        <article class="event-card ${isFull ? "full" : ""}">
          <h3>${event.name}</h3>
          <p class="event-meta">${formatEventDate(event.date)} · ${event.location}</p>
          <p class="event-spots ${lowClass}">${spotsLabel}</p>
        </article>
      `;
    })
    .join("");

  list.innerHTML = cardsHtml;

  populateEventSelect();
}

function populateEventSelect() {
  const select = document.getElementById("event-choice");
  if (!select) return;

  const optionsHtml = cleanupEvents
    .filter((event) => event.spots > 0)
    .map((event) => `<option value="${event.name}">${event.name} — ${formatEventDate(event.date)}</option>`)
    .join("");

  select.innerHTML = `<option value="">Select a cleanup</option>${optionsHtml}`;
}

/* ---------- Volunteer sign-up form + localStorage ---------- */
function loadVolunteers() {
  const stored = localStorage.getItem(STORAGE_KEY);
  volunteers = stored ? JSON.parse(stored) : [];
  renderVolunteers();
}

function saveVolunteers() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(volunteers));
}

function renderVolunteers() {
  const list = document.getElementById("volunteer-list");
  if (!list) return;

  if (volunteers.length === 0) {
    list.innerHTML = `<li class="empty-state">No one has signed up yet — be the first.</li>`;
    return;
  }

  list.innerHTML = volunteers
    .map((v) => `<li><strong>${v.name}</strong> — ${v.eventChoice} (signed up ${v.signedUpOn})</li>`)
    .join("");
}

function handleVolunteerSubmit(event) {
  event.preventDefault();

  const nameInput = document.getElementById("volunteer-name");
  const emailInput = document.getElementById("volunteer-email");
  const eventSelect = document.getElementById("event-choice");
  const msg = document.getElementById("form-msg");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const eventChoice = eventSelect.value;

  if (name === "" || email === "" || eventChoice === "") {
    msg.textContent = "Please fill in your name, email, and choose a cleanup.";
    msg.className = "form-msg error";
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    msg.textContent = "Please enter a valid email address.";
    msg.className = "form-msg error";
    return;
  }

  const newVolunteer = {
    name: name,
    email: email,
    eventChoice: eventChoice,
    signedUpOn: new Date().toLocaleDateString()
  };

  volunteers.push(newVolunteer);
  saveVolunteers();
  renderVolunteers();

  msg.textContent = `Thanks, ${name} — you're signed up for ${eventChoice}.`;
  msg.className = "form-msg success";
  event.target.reset();
}

function clearVolunteers() {
  volunteers = [];
  saveVolunteers();
  renderVolunteers();
  const msg = document.getElementById("form-msg");
  if (msg) {
    msg.textContent = "Volunteer list cleared.";
    msg.className = "form-msg";
  }
}

/* ---------- Litter impact calculator (Impact page) ---------- */
function calculateImpact(event) {
  event.preventDefault();

  const peopleInput = document.getElementById("calc-people");
  const result = document.getElementById("calc-result");
  const people = Number(peopleInput.value);

  if (!people || people <= 0) {
    result.textContent = "Enter a group size greater than zero.";
    return;
  }

  const bagsPerPerson = 2.5;
  const poundsPerBag = 8;
  const estimatedBags = Math.round(people * bagsPerPerson);
  const estimatedPounds = estimatedBags * poundsPerBag;

  result.textContent = `A group of ${people} could collect roughly ${estimatedBags} bags of litter — about ${estimatedPounds} pounds — in a single two-hour cleanup.`;
}

/* ---------- Wire everything up once the DOM is ready ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  renderEvents();
  loadVolunteers();

  const volunteerForm = document.getElementById("volunteer-form");
  if (volunteerForm) {
    volunteerForm.addEventListener("submit", handleVolunteerSubmit);
  }

  const clearBtn = document.getElementById("clear-volunteers");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearVolunteers);
  }

  const calcForm = document.getElementById("calc-form");
  if (calcForm) {
    calcForm.addEventListener("submit", calculateImpact);
  }
});