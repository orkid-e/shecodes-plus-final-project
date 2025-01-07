function newCity(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
  }

  let searchFormElement = document.querySelector("#search-form");
  searchFormElement.addEventListener("submit", newCity);
 
  function displayTemp(response) {
    let h1 = document.querySelector("h1");
    h1.innerHTML = response.data.city;
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");

    let temperature = Math.round(response.data.temperature.current);
    let h2 = document.querySelector("h2");
    h2.innerHTML = `${temperature}°C`;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  }
  
  function searchCity(city) {
    let apiKey = "4c0ff2fd9eo01d24aa2b0f71ef013t53";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(displayTemp);
  }
