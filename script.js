let baseURL = 'http://api.weatherapi.com/v1';
let forecast = '/forecast.json';
let APIkey = '05c250ceb9ab4a58be4145459242602';
let locationQuery = '&q=';
let airQual = '&aqi=no';
let days = '&days=3';
let alerts = '&alerts=no';

// get 3 day forecast
async function getForecast(location) {
    const response = await fetch(`${baseURL}${forecast}?key=${APIkey}${locationQuery}${location}${days}${airQual}${alerts}`, { mode: "cors" });

    return await response.json();
}

const searchInput = document.querySelector('.search-bar');
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async () => {
    if (searchInput.value !== '') {
        const weatherData = await getForecast(searchInput.value);
        populateWeather(weatherData);
    }
});

// populate html with weather info
async function populateWeather(weather) {
    console.log(weather);
    document.querySelector('.town').textContent = weather.location.name;
    document.querySelector('.region').textContent = weather.location.region;
    document.querySelector('.country').textContent = weather.location.country;
    const condition = weather.current.condition.text;
    const temperature = weather.current.temp_f;

    // console.log(document.getElementsByClassName('day-card'));
    let divs = document.getElementsByClassName('day-card');
    console.log(divs);
    for (let i = 0; i < divs.length; i++) {
        console.log(divs[i]);
        divs[i].querySelector('.date').textContent = weather.forecast.forecastday[i].date;
        // document.querySelector('.day-forecast').textContent = weather.forecast.forecastday[i];
        // document.querySelector('.icon-forecast').textContent;
        divs[i].querySelector('.avg-humidity').textContent = `Humidity: ${weather.forecast.forecastday[i].day.avghumidity}%`;
        divs[i].querySelector('.avgtemp_f').textContent = `Temperature: ${weather.forecast.forecastday[i].day.avgtemp_f}°F`;
        divs[i].querySelector('.mintemp_f').textContent = `Min Temp: ${weather.forecast.forecastday[i].day.mintemp_f}°F`;
        divs[i].querySelector('.maxtemp_f').textContent = `Max Temp: ${weather.forecast.forecastday[i].day.maxtemp_f}°F`;
    }
}

// test
(async () => {
    // populateWeather(location);
})();