let baseURL = 'http://api.weatherapi.com/v1';
let current = '/current.json';
let forecast = '/forecast.json';
let APIkey = '05c250ceb9ab4a58be4145459242602';
let locationQuery = '&q=';
let airQual = '&aqi=no';
let days = '&days=3';
let alerts = '&alerts=no';

// get right now data
async function getCurrentWeather(location) {
    const response = await fetch(`${baseURL}${current}?key=${APIkey}${locationQuery}${location}${airQual}`, { mode: "cors" });

    return await response.json();
}

// get 3 day ahead
async function getForecast(location) {
    const response = await fetch(`${baseURL}${forecast}?key=${APIkey}${locationQuery}${location}${days}${airQual}${alerts}`, { mode: "cors" });

    return await response.json();
}

// populate html with weather info
// function populateWeather(weatherData) {

// }

// test
(async () => {
    let location = 'Montreal';
    let data = await getCurrentWeather(location);
    console.log(data.current);
    console.log(data.location);

    const town = data.location.name;
    const region = data.location.region;
    console.log(`${town}, ${region}`);

    const condition = data.current.condition.text;
    const temperature = data.current.temp_f;
    console.log(`${condition}. Temp: ${temperature}F`);

    let weather = await getForecast('03865');
    console.log(weather);
    let today = weather.forecast.forecastday[0];
    let tomorrow = weather.forecast.forecastday[1];
    let nextDay = weather.forecast.forecastday[2];

    console.log(today);
    console.log(tomorrow);
    console.log(nextDay);
})();