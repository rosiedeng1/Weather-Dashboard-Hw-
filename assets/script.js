var ClickMe = document.getElementById('fetch-button');
var UserInput = document.getElementById('cityname')
var WeatherData = document.getElementById('weather-container')
console.log(UserInput)

var APIKey = "f7dedc0eea26524e68c239d8ed64d3d4"
// var city = "Atlanta"
// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
// console.log(queryURL)

// Takes whatever you return and wraps it around a promise
async function getweatherdata(city) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
console.log(queryURL)
     // Stores data into a response object
    const response = await fetch(queryURL)
    console.log("hi " + response)
    // Extract json data from the response object
    const weatherData = await response.json();
    console.log(weatherData)
    return weatherData;
}

// var weather = getweatherdata('New York')
// console.log("weather " + weather)

ClickMe.addEventListener('click', function(){
// Grab city name from html and store into variable 
// Call the getweatherdata function
// Use weatherdata to populate the html 
})

// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key};