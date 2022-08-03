
function formatDate (timestamp) {
    //calculate the date

    let date = new Date (timestamp);
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minutes = date.getMinutes ();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = [
    "Sunday",
    "Monday", 
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday" ];
    let day = days [date.getDay ()];
    return `${day} ${hour}:${minutes}`;
}

function formatDay (timestamp) {
    let date = new Date (timestamp * 1000);
    let day = date.getDay ();
    let days = [
    "Sunday",
    "Monday", 
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"]; 

    return days[day];

}

function displayForecast (response) {
    let forecast = response.data.daily;

    let forecastElement = document.querySelector ("#forecast");

    let forecastHTML = `<div class = "row">`;
    forecast.forEach(function(forecastDay, index) {
        if (index < 6){


        forecastHTML = forecastHTML + `
        <div class="col card weather-forecast-cards">
            <div class="weather-forecast-date">
                ${formatDay(forecastDay.dt)}
            </div>

            <img src="https://openweathermap.org/img/wn/${forecast[0].weather[0].icon}@2x.png" 
            alt=""
            /> 
            <div class = "weather-forecast-temperature-text">
            min<span>  max</span></div>
            <div class="weather-forecast-temperature">
               
                <span class="weather-forecast-temperature-min">
                ${Math.round (
                    forecastDay.temp.min
                    )}° </span>

                    <span class="weather-forecast-temperature-max"> 
                    ${Math.round (
                        forecastDay.temp.max
                        )}° </span> 
            </div>
        </div>`
        ;}
    
    })
    
    forecastHTML = forecastHTML + `</div>`

    forecastElement.innerHTML = forecastHTML; 

}

function getForecast (coordinates) {
    let apiKey = "2385e38ab7a755a47b225394ab5f5fc0";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature (response) {

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
    
    let dateElement = document.querySelector ("#date");
    dateElement.innerHTML = formatDate (response.data.dt * 1000);

    let iconElemet = document.querySelector ("#icon");
    iconElemet.setAttribute ("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
   
    iconElemet.setAttribute ("alt", response.data.weather[0].description);

    celciumTemp = response.data.main.temp; 

    getForecast (response.data.coord); 
}

function search (city) {
let apiKey = "2385e38ab7a755a47b225394ab5f5fc0";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);

}


function searchLocation (position) {
    let apiKey = "2385e38ab7a755a47b225394ab5f5fc0";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(displayTemperature);
  
  }
  
  function getCurrentLocation (event) {
    event.preventDefault ();
    navigator.geolocation.getCurrentPosition (searchLocation);
  
  }

let currentLocation = document.querySelector (".location");
currentLocation.addEventListener ("click", getCurrentLocation);


function handleSubmit (event) {
    event.preventDefault();
    let cityInputElement = document.querySelector ("#city-input");
    search (cityInputElement.value);
}

function displayFarenhTemp (event) {
    event.preventDefault ();
    let temperatureElement = document.querySelector ("#temperature");

    celciumLink.classList.remove("active");
    farenhLink.classList.add ("active");

    let farenhTemp = (celciumTemp * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round (farenhTemp);
}

function displayCelciumTemp (event) {
    event.preventDefault ();

    celciumLink.classList.add ("active");
    farenhLink.classList.remove ("active");

    let temperatureElement = document.querySelector ("#temperature");
    temperatureElement.innerHTML = Math.round (celciumTemp);
}

let celciumTemp = null;


let form = document.querySelector ("#search-form");
form.addEventListener("submit", handleSubmit);

// let farenhLink = document.querySelector ("#farenh-link");
// farenhLink.addEventListener ("click", displayFarenhTemp);

// let celciumLink = document.querySelector ("#celcium-link");
// celciumLink.addEventListener ("click", displayCelciumTemp);

search ("Kyiv");
