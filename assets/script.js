var ClickMe = document.getElementById('fetch-button');
var UserInput = document.getElementById('cityname')
var WeatherData = document.getElementById('weather-container')
console.log(UserInput)

var APIKey = "f7dedc0eea26524e68c239d8ed64d3d4"
// var city = "Atlanta"
// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
// console.log(queryURL)

async function getweatherdata(city) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
console.log(queryURL)
     // Stores data into a response object
    const response = await fetch(queryURL)
    console.log("hi " + response)
    // Extract json data from the response object
    const weatherData = await response.json();
    console.log(weatherData)
}

getweatherdata(city)

// fetch.Button.addEventListener('click', await fetch)

// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key};