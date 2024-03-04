let baseURL = 'https://api.weatherapi.com/v1';
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

function getWeatherIcon(code) {
    const sunny = [1000];
    const rainy = [1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246];
    const cloudy = [1003, 1006, 1009, 1030, 1135];
    const snowy = [1066, 1069, 1072, 1114, 1117, 1147, 1168, 1171, 1198, 1201, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264, 1279, 1282];
    const stormy = [1087, 1273, 1276];
    // console.log(`forecast: ${code}`)

    return sunny.includes(code) ? './weather-sunny.svg'
        : rainy.includes(code) ? './weather-pouring.svg'
        : cloudy.includes(code) ? './weather-cloudy.svg'
        : snowy.includes(code) ? './weather-snowy.svg'
        : stormy.includes(code) ? './weather-lightning-rainy.svg'
        : null;
}

// populate html with weather info
async function populateWeather(weather) {
    // console.log(weather);
    document.querySelector('.town').textContent = weather.location.name;
    document.querySelector('.region').textContent = weather.location.region;
    document.querySelector('.country').textContent = weather.location.country;

    let divs = document.getElementsByClassName('day-card');
    // console.log(divs);
    for (let i = 0; i < divs.length; i++) {
        // console.log(divs[i]);
        divs[i].querySelector('.date').textContent = weather.forecast.forecastday[i].date;
        divs[i].querySelector('.day-forecast').textContent = weather.forecast.forecastday[i].day.condition.text;
        // console.log(getWeatherIcon(weather.forecast.forecastday[i].day.condition.code))
        divs[i].querySelector('.icon-forecast').src = getWeatherIcon(weather.forecast.forecastday[i].day.condition.code);
        divs[i].querySelector('.icon-forecast').style.height = '150px';
        divs[i].querySelector('.icon-forecast').style.width = '150px';
        divs[i].querySelector('.avg-humidity').textContent = `Humidity: ${weather.forecast.forecastday[i].day.avghumidity}%`;
        divs[i].querySelector('.avgtemp_f').textContent = `Average Temperature: ${weather.forecast.forecastday[i].day.avgtemp_f}°F`;
        divs[i].querySelector('.temp-range').textContent = `Temp range: ${weather.forecast.forecastday[i].day.mintemp_f}°F to ${weather.forecast.forecastday[i].day.maxtemp_f}°F`;
        // divs[i].querySelector('.mintemp_f').textContent = `Min Temp: ${weather.forecast.forecastday[i].day.mintemp_f}°F`;
        // divs[i].querySelector('.maxtemp_f').textContent = `Max Temp: ${weather.forecast.forecastday[i].day.maxtemp_f}°F`;
    }
}

(async () => {
    const defaultData = await getForecast('Montreal');
    populateWeather(defaultData);
})();