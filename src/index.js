function displayTemperature (response) {
    console.log (response.data);

    let descriptionElement = document.querySelector ("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;
   
    let cityElement = document.querySelector ("#city");
    cityElement.innerHTML = response.data.name;


    let temperatureElement = document.querySelector ("#temperature");
    temperatureElement.innerHTML = Math.round (response.data.main.temp);

    let humidityElement = document.querySelector ("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;

    let windElement = document.querySelector ("#wind");
    windElement.innerHTML = Math.round (response.data.wind.speed);
}

let apiKey = "2385e38ab7a755a47b225394ab5f5fc0";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);