var ClickMe = document.getElementById('fetch-button');
var UserInput = document.getElementById('cityname')
var WeatherData = document.getElementById('weather-container')
console.log(UserInput)
var ForecastWeatherData = document.getElementById('5dayweather-container')

var APIKey = "f7dedc0eea26524e68c239d8ed64d3d4"
// var city = "Atlanta"
// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
// console.log(queryURL)


// Takes whatever you return and wraps it around a promise
async function getweatherdata(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + APIKey;
    console.log(queryURL)
    // Stores data into a response object
    const response = await fetch(queryURL)
    console.log("hi " + response)
    // Extract json data from the response object
    const weatherData = await response.json();
    console.log("here's the weather day from getweatherdata")
    console.log(weatherData)
    var humidity = weatherData.main.humidity
    var temperature = weatherData.main.temp
    var wind = weatherData.wind.speed
    // var lat = weatherData.coord.lat
    // var lon = weatherData.coord.lon
    var coord = weatherData.coord
    renderCurrentWeather(weatherData)
    return { humidity, temperature, wind, coord}

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
    currentWeatherHeader.append(cityNameEl, dateEl, Icon)
    document.getElementById('weather-container').append(currentWeatherHeader, Temp, Humidity, windSpeed)
}


// create element, set innerText temp, humdiity, wind 

async function getmoreweatherdata(lat, lon) {
    // var anotherqueryURL = "api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
    var anotherqueryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
    console.log(anotherqueryURL)
    // Stores data into a response object
    const response = await fetch(anotherqueryURL)
    console.log("hi " + response)
    // Extract json data from the response object
    const moreweatherData = await response.json();
    console.log(moreweatherData)
    return moreweatherData;

}

function renderFiveDayForecast(forecastData) {
    console.log("am i in renderFiveDayForecast function")
    // Clear previous content
    ForecastWeatherData.innerHTML = '';

    // Loop through forecast data (every 8th item for daily forecast to get data for new day (3x8=24))
    console.log("list of forecastData " + JSON.stringify(forecastData.list))
    for (let i = 0; i < forecastData.list.length; i += 8) {
        
        const dailyData = forecastData.list[i];
        // Create and append HTML elements for each day
        // e.g., date, temperature, humidity, etc.
        var dateEl = document.createElement("h2")
        var Icon = document.createElement("img")
        var Temp = document.createElement("p")
        var Humidity = document.createElement("p")
        var windSpeed = document.createElement("p")
        console.log("what day is it " + dailyData.dt)
        dateEl.textContent = dayjs.unix(dailyData.dt).format('MM DD, YYYY')
        console.log("is the icon there " + dailyData.weather[0].icon)
        Icon.src = `http://openweathermap.org/img/w/${dailyData.weather[0].icon}.png`
        Temp.textContent = dailyData.main.temp
        Humidity.textContent = dailyData.main.humidity
        windSpeed.textContent = dailyData.wind.speed

        ForecastWeatherData.append(dateEl, Icon, Temp, Humidity, windSpeed)
    }
}

// ClickMe.addEventListener('click', async function () {
//     // console.log(UserInput.value)
//     // Grab city name from html and store into variable 
//     var CityName = UserInput.value;
//     // Call the getweatherdata function
//     var weather = await getweatherdata(CityName);
//     console.log("weather " + weather);
//     saveSearchHistory()
//     // Use weatherdata to populate the html 
// })

ClickMe.addEventListener('click', async function () {
    var CityName = UserInput.value;
    var currentWeather = await getweatherdata(CityName);
    console.log('currentWeather: ' +  JSON.stringify(currentWeather))
    console.log("currentWeather.coord " + currentWeather.coord)

    // If currentWeather data exists and the coordinates inside that object exist
    if (currentWeather && currentWeather.coord) {
        console.log("am i in this block")
        var forecastWeather = await getmoreweatherdata(currentWeather.coord.lat, currentWeather.coord.lon);
        renderFiveDayForecast(forecastWeather);
        console(forecastWeather)
    }
    saveSearchHistory();
});

function saveSearchHistory() {
    console.log("data " + localStorage.getItem('searchHistory'))
    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []
    var city = UserInput.value
    if (searchHistory.includes(city)) {
        return
    }
    searchHistory.push(city)
    localStorage.setItem('searchHistory', searchHistory)
}

// extract humidity, etc




// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key};