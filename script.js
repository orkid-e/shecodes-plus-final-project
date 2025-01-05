function newCity(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let h1 = document.querySelector("h1");
    h1.innerHTML = `${searchInput.value}`;
}
    let searchFormElement = document.querySelector("#search-form");
    searchFormElement.addEventListener ("submit", newCity)

function displayTemp(response) {
    let temperature = Math.round(response.data.temperature.current);
    console.log(response.data.temperature.current)
}

function updateWeather(response) {
console.log(response.data);

}
function searchCity(city) {
    let apiKey = "4c0ff2fd9eo01d24aa2b0f71ef013t53"
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=london&key=${apiKey}`;
    axios.get(apiUrl).then(updateWeather);
    console.log(apiKey);
}