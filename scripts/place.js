// Footer: current year and last-modified date
document.getElementById("current-year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;

// Static weather inputs for this assignment (metric units).
// A future version will replace these with live values from a weather API.
const currentTempC = 9;
const windSpeedKph = 14;

// Returns the wind chill for the given temperature (°C) and wind speed (km/h)
// using the Environment Canada metric wind chill formula.
function calculateWindChill(tempC, windKph) {
  return 13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKph, 0.16) + 0.3965 * tempC * Math.pow(windKph, 0.16);
}

const chillEl = document.getElementById("wind-chill");
if (currentTempC <= 10 && windSpeedKph > 4.8) {
  chillEl.textContent = `${calculateWindChill(currentTempC, windSpeedKph).toFixed(1)}°C`;
} else {
  chillEl.textContent = "N/A";
}