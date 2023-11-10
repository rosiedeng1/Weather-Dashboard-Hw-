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
    var humidity = weatherData.main.humidity
var temperature = weatherData.main.temperature
console.log(humidity, temperature)
// var wind =
    return {humidity, temperature, wind}

}
// extract humidity, etc

ClickMe.addEventListener('click', async function(){
// console.log(UserInput.value)
// Grab city name from html and store into variable 
var CityName = UserInput.value;
// Call the getweatherdata function
var weather = await getweatherdata(CityName);
console.log("weather " + weather);
// Use weatherdata to populate the html 
})
// create element, set innerText temp, humdiity, wind 

// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key};