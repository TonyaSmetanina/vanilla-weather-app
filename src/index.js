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

function displayForecast (response) {
    console.log (response.data.daily);
    let forecastElement = document.querySelector ("#forecast");

    let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];

    let forecastHTML = `<div class = "row">`;
    days.forEach(function(day) {
        forecastHTML = forecastHTML + `
        <div class="col-2">
            <div class="weather-forecast-date">
                ${day}
            </div>
            
            <img src="https://openweathermap.org/img/wn/04n@2x.png" 
            alt=""
            width="36"
            /> 
            <div class="weather-forecast-temperature">
               <span class="weather-forecast-temperature-max">
                28 </span> 
                <span class="weather-forecast-temperature-min">
                    19 </span>
            </div>
        </div>`;
    
    })
    
    forecastHTML = forecastHTML + `</div>`

    forecastElement.innerHTML = forecastHTML; 

}

function getForecast (coordinates) {
    console.log (coordinates);
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

let farenhLink = document.querySelector ("#farenh-link");
farenhLink.addEventListener ("click", displayFarenhTemp);

let celciumLink = document.querySelector ("#celcium-link");
celciumLink.addEventListener ("click", displayCelciumTemp);

search ("Kyiv");
