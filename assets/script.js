var ClickMe = document.getElementById('fetch-button');
var UserInput = document.getElementById('cityname')
var WeatherData = document.getElementById('weather-container')
// console.log(UserInput)
var ForecastWeatherData = document.getElementById('5dayweather-container')
var searchHistory = document.getElementById('search-history')

var APIKey = "f7dedc0eea26524e68c239d8ed64d3d4"

// Takes whatever you return and wraps it around a promise
async function getweatherdata(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + APIKey;
    // console.log(queryURL)
    // Stores data into a response object
    const response = await fetch(queryURL)
    // console.log("hi " + response)
    // Extract json data from the response object
    const weatherData = await response.json();
    // console.log("here's the weather day from getweatherdata")
    // console.log(weatherData)
    var humidity = weatherData.main.humidity
    var temperature = weatherData.main.temp
    var wind = weatherData.wind.speed
    // Set variable for coordinates-lat, lon
    var coord = weatherData.coord
    renderCurrentWeather(weatherData)
    return { humidity, temperature, wind, coord }

}

function renderCurrentWeather(data) {
    // Clears previous content in weather container when you input new city
    WeatherData.innerHTML = '';

    // Created elements so you can put it/append it somewhere into weather-container ID
    var currentWeatherHeader = document.createElement("div")
    var cityNameEl = document.createElement("h2")
    var dateEl = document.createElement("h2")
    var Icon = document.createElement("img")
    var Temp = document.createElement("p")
    var Humidity = document.createElement("p")
    var windSpeed = document.createElement("p")

    cityNameEl.textContent = data.name
    dateEl.textContent = dayjs.unix(data.dt).format(('MM. DD. YYYY'))
    // Extract icon, humidity, temp and windSpeed data from the API
    Icon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
    Temp.textContent = 'Temperature:' + data.main.temp + '°F'
    Humidity.textContent = 'Humidity' + data.main.humidity
    windSpeed.textContent = 'Wind:' + data.wind.speed

    currentWeatherHeader.style.display = 'flex'
    currentWeatherHeader.style.alignItems = 'center'
    // Append the desired weather data to the page
    currentWeatherHeader.append(cityNameEl, dateEl, Icon)
    document.getElementById('weather-container').append(currentWeatherHeader, Temp, Humidity, windSpeed)
}

// Fetched the data for the five day forecast 
async function getmoreweatherdata(lat, lon) {
    var anotherqueryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=" + APIKey;
    // console.log(anotherqueryURL)
    // Stores data into a response object
    const response = await fetch(anotherqueryURL)
    // console.log("hi " + response)
    // Extract json data from the response object
    const moreweatherData = await response.json();
    // console.log(moreweatherData)
    return moreweatherData;

}

function renderFiveDayForecast(forecastData) {
    // console.log("am i in renderFiveDayForecast function")
    // Clears previous content
    ForecastWeatherData.innerHTML = '';

    // Loop through forecast data (every 8th item for daily forecast to get data for new day (3x8=24))
    // console.log("list of forecastData " + JSON.stringify(forecastData.list))
    for (let i = 0; i < forecastData.list.length; i += 8) {

        const dailyData = forecastData.list[i];
        // Created and append HTML elements for each day
        // e.g., date, temperature, humidity, etc.
        var weatherContainer = document.createElement("div")
        var dateEl = document.createElement("h2")
        var Icon = document.createElement("img")
        var Temp = document.createElement("p")
        var Humidity = document.createElement("p")
        var windSpeed = document.createElement("p")
        // console.log("what day is it " + dailyData.dt)
        dateEl.textContent = dayjs.unix(dailyData.dt).format('MM. DD. YYYY')
        // console.log("is the icon there " + dailyData.weather[0].icon)
        Icon.src = `http://openweathermap.org/img/w/${dailyData.weather[0].icon}.png`
        Temp.textContent = 'Temperature:' + dailyData.main.temp + '°F'
        Humidity.textContent = 'Humidity' + dailyData.main.humidity
        windSpeed.textContent = 'Wind:' + dailyData.wind.speed

        // Created a div and appended the elements to that div 
        weatherContainer.append(dateEl, Icon, Temp, Humidity, windSpeed)
        dateEl.style.display = 'flex'
        document.getElementById('5dayweather-container').append(weatherContainer)
    }
}

// Added event listener for button to retrieve weather data
ClickMe.addEventListener('click', async function () {
    var cityName = UserInput.value;
    // Normalizes to upper case when inputing city name 
    cityName = cityName.toUpperCase();
    var currentWeather = await getweatherdata(cityName);
    // console.log('currentWeather: ' + JSON.stringify(currentWeather))
    // console.log("currentWeather.coord " + currentWeather.coord)

    // If currentWeather data exists and the coordinates inside that object exist
    if (currentWeather && currentWeather.coord) {
        // console.log("am i in this block")
        var forecastWeather = await getmoreweatherdata(currentWeather.coord.lat, currentWeather.coord.lon);
        renderFiveDayForecast(forecastWeather);
        // console.log(forecastWeather)
    }
    saveSearchHistory(cityName);
});

// 
function saveSearchHistory(cityName) {
    var key = 'cities'
    var cities = localStorage.getItem(key)
    if (cities == null) {
        var newArray = [cityName]
        var newValue = JSON.stringify(newArray)
        localStorage.setItem(key, newValue)
    } else {
        // add city to an existing array of cities you have already visited
        // console.log("cities: " + cities)
        var newArray = JSON.parse(cities)
        if (!newArray.includes(cityName)) {
            // Pushes current city input into your new array 
            newArray.push(cityName)
            var newArrayString = JSON.stringify(newArray)
            localStorage.setItem(key, newArrayString)
        }
    }
    renderSearchHistory(newArray)

}

/**
 * 
 * @param {*} citySearchHistory - array of previous cities input
 */
function renderSearchHistory(citySearchHistory) {
    // console.log("is searchHistory there " + citySearchHistory)
    searchHistory.innerHTML = ""

    // Created for loop for the searchHistory buttons
    for (let i = 0; i < citySearchHistory.length; i++) {
        var currentCity = citySearchHistory[i];
        const button = document.createElement("button")
        button.textContent = currentCity;
        button.addEventListener("click", async function () {
            var cityName = citySearchHistory[i]

            var currentWeather = await getweatherdata(cityName);
            console.log('currentWeather: ' + JSON.stringify(currentWeather))
            console.log("currentWeather.coord " + currentWeather.coord)

            // If currentWeather data exists and the coordinates inside that object exist
            if (currentWeather && currentWeather.coord) {
                console.log("am i in this block")
                var forecastWeather = await getmoreweatherdata(currentWeather.coord.lat, currentWeather.coord.lon);
                renderFiveDayForecast(forecastWeather);
                console.log(forecastWeather)
            }
            saveSearchHistory(cityName);
        })


        searchHistory.append(button)

    }


}