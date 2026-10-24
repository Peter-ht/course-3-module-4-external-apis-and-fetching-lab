// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

function fetchWeatherAlerts(state) {
  const stateAbbreviation = state.trim().toUpperCase();

if (!stateAbbreviation) {
    return Promise.reject(new Error("Please enter a state abbreviation."));
  }

if (!/^[A-Z]{2}$/.test(stateAbbreviation)) {
    return Promise.reject(
      new Error("Please enter a valid two-letter state abbreviation.")
    );
  }

return fetch(
    `https://api.weather.gov/alerts/active?area=${stateAbbreviation}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error.message);
      throw error;
    });
}

function displayAlerts(data) {
  alertsDisplay.innerHTML = "";
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");

const alerts = data.features || [];
  const summary = document.createElement("p");
  

summary.textContent = `${data.title}: ${alerts.length}`;
  alertsDisplay.appendChild(summary);

const alertList = document.createElement("ul");

alerts.forEach((alert) => {
    const listItem = document.createElement("li");

listItem.textContent =
      alert.properties?.headline || "No headline available";

alertList.appendChild(listItem);
  });

alertsDisplay.appendChild(alertList);
}

function displayError(message) {
  alertsDisplay.innerHTML = "";
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

function handleFetchAlerts() {
  const state = stateInput.value;

alertsDisplay.innerHTML = "";
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");
  stateInput.value = "";

fetchWeatherAlerts(state)
    .then((data) => {
      displayAlerts(data);
    })
    .catch((error) => {
      displayError(error.message);
    });
}

fetchButton.addEventListener("click", handleFetchAlerts);
