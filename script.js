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
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");

    let temperature = Math.round(response.data.temperature.current);
    let h2 = document.querySelector("h2");
    h2.innerHTML = `${temperature}°C`;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML= `${response.data.wind.speed}km/h`;
    timeElement.innerHTML = formatDate(date);
    iconElement.setAttribute("src", response.data.condition.icon_url);

    getForecast(response.data.city);
  }

  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    if(minutes < 10 ) {
      minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`;
  }
  
  function searchCity(city) {
    let apiKey = "4c0ff2fd9eo01d24aa2b0f71ef013t53";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemp);
  }

  function formatDay(timestamp) {
let date = new Date (timestamp * 1000);
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

return days[date.getDay()];
  }


function getForecast(city) {
  let apiKey = "4c0ff2fd9eo01d24aa2b0f71ef013t53";
  let apiUrl =`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

  function displayForecast(response) {
    console.log(response.data);

    let forecastHTML = "";

    response.data.daily.forEach(function (day, index) {
    if (index < 5) 
    forecastHTML = forecastHTML + 
    ` 
    <div class="weather-forecast-day">
    <div class="weather-forecast-date"> ${formatDay(day.time)} </div>
    <img src="${day.condition.icon_url}" class="weather-forecast-icon" /> 
    </div>
    <div class="weather-forecast-temps">
        <div class="weather-forecast-temp"> ${Math.round(day.temperature.minimum)}° <br /> <strong> ${Math.round(day.temperature.maximum)}° </strong> </div>
    </div>
</div>
`;
    });

    let forecastElement = document.querySelector ("#forecast");
    forecastElement.innerHTML = forecastHTML;
}


searchCity ("Paris");
getForecast("Paris");