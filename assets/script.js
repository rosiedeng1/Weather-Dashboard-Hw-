var ClickMe = document.getElementById('fetch-button');
var UserInput = document.getElementById('cityname')
var WeatherData = document.getElementById('weather-container')
console.log(UserInput)
var ForecastyWeatherData = document.getElementById('5dayweather-container')

var APIKey = "f7dedc0eea26524e68c239d8ed64d3d4"
// var city = "Atlanta"
// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
// console.log(queryURL)


// Takes whatever you return and wraps it around a promise
async function getweatherdata(city) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + APIKey;
console.log(queryURL)
     // Stores data into a response object
    const response = await fetch(queryURL)
    console.log("hi " + response)
    // Extract json data from the response object
    const weatherData = await response.json();
    console.log(weatherData)
    var humidity = weatherData.main.humidity
var temperature = weatherData.main.temp
console.log(humidity, temperature)
var wind = weatherData.wind.speed
renderCurrentWeather(weatherData)
    return {humidity, temperature, wind}

}

function renderCurrentWeather(data) {
var currentWeatherHeader = document.createElement("div")
var cityNameEl = document.createElement("h2")
var dateEl = document.createElement("h2")
var Icon = document.createElement("img")
var Temp = document.createElement("p")
var Humidity = document.createElement("p")
var windSpeed = document.createElement("p")

cityNameEl.textContent = data.name 
dateEl.textContent = dayjs.unix(data.dt).format('MM DD, YYYY')
Icon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
Temp.textContent = data.main.temp
Humidity.textContent = data.main.humidity 
windSpeed.textContent = data.wind.speed

currentWeatherHeader.style.display = 'flex'
currentWeatherHeader.style.alignItems = 'center'
currentWeatherHeader.append(cityNameEl,dateEl,Icon)
document.getElementById('weather-container').append(currentWeatherHeader, Temp, Humidity, windSpeed)
}

async function getmoreweatherdata(city) {
    // var anotherqueryURL = "api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
    var anotherqueryURL = "api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + city + "&appid=" + APIKey;
console.log(anotherqueryURL)
     // Stores data into a response object
    const response = await fetch(anotherqueryURL)
    console.log("hi " + response)
    // Extract json data from the response object
    const moreweatherData = await response.json();
    console.log(moreweatherData)
    var lat = moreweatherData.coord.lat
    var humidity = moreweatherData.list.main.humidity
var temperature = moreweatherData.list.main.temp
console.log(humidity, temperature)
var wind = moreweatherData.list.wind.speed
renderCurrentWeather(moreweatherData)
    return {humidity, temperature, wind}

}

function saveSearchHistory() {

var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []
var city = UserInput.value
if (searchHistory.includes(city)) {
    return 
}
searchHistory.push(city)
localStorage.setItem('searchHistory', searchHistory)
} 

// extract humidity, etc

ClickMe.addEventListener('click', async function(){
// console.log(UserInput.value)
// Grab city name from html and store into variable 
var CityName = UserInput.value;
// Call the getweatherdata function
var weather = await getweatherdata(CityName);
console.log("weather " + weather);
saveSearchHistory()
// Use weatherdata to populate the html 
})
// create element, set innerText temp, humdiity, wind 



// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key};