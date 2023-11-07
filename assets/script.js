var APIKey = "9babcee9adb606a32ee486326d4cc19a"

var city;

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(queryURL)

// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key};