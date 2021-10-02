const apiKey = "724473c03ae546dd2cb1c166f124b69d";
var searchInputEl = document.querySelector("#search");
var searchButtonEl = document.querySelector("#searchBtn")
// var weatherContainerEl = document.querySelector("#weather-container");    
var weatherSearchCityEl = document.querySelector("#weather-search-city");
var weatherSearchTempEl = document.querySelector("#weather-search-temp");
var weatherSearchWind = document.querySelector("#weather-search-wind");
var weatherSearchHumid = document.querySelector("#weather-search-humid");
var weatherSearchUV = document.querySelector("#weather-search-uv");
let historyArr = [];

var submitHandler = function(event) {
    event.preventDefault();
    var city = searchInputEl.value.trim();
    if (city) {
        getSearchedInfo(city);
        saveSearch(city);
        searchInputEl.value = "";
    } else {
        alert("Please Enter a City");
    }
};

var saveSearch = function(city) {
    historyArr.push(city); 
    localStorage.setItem("history", JSON.stringify(historyArr));
}
var loadSearchHistory = function() {
    // if (localStorage.getItem("history") === null) {
    //     let history = ["chicago"];
    //     return history;
    // } else {
    JSON.parse(localStorage.getItem("history"))
    for (var i = 0; i < history.length; i++) {
        var name = history[i]
        historyArr.push(name);
    }
}

var getSearchedInfo = function(city) {
    var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    var fiveDayWeather = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;
    fetch(currentWeather).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                const {temp} = data.main
                const city = data.name
                const {speed} = data.wind
                const {humidity} = data.main

                displayWeather(temp, city, speed, humidity)
            });
        } else {
            alert("error");
        }
    }).catch(function(error) {
        alert("Unable to connect to weather service");
    });
    
    fetch(fiveDayWeather).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                //every 8th item is 24hrs, starting item 4
                const dayOne = data.list[4]
                const dayTwo = data.list[12]
                const dayThree = data.list[20]
                fiveDayFore(dayOne, dayTwo, dayThree)
            })
        } 
    });
}   

var displayWeather = function(temp, city, speed, humidity) {
    weatherSearchCityEl.textContent = "";
    weatherSearchTempEl.textContent = "";
    weatherSearchWind.textContent = "";
    weatherSearchHumid.textContent = "";
    weatherSearchUV.textContent = "";

    weatherSearchTempEl.textContent = temp + " Degrees, Farenheight";
    weatherSearchCityEl.textContent = city;
    weatherSearchWind.textContent = speed + " MPH";
    weatherSearchHumid.textContent = humidity + "%";
    weatherSearchUV.textContent = "";
}

var fiveDayFore = function(dayOne, dayTwo, dayThree) {
    console.log(dayOne, dayTwo, dayThree);
}

searchButtonEl.addEventListener("click", submitHandler);

loadSearchHistory();

// {
//     "coord": {
//         "lon": -97.7431,
//         "lat": 30.2672
//     },
//     "weather": [
//         {
//             "id": 804,
//             "main": "Clouds",
//             "description": "overcast clouds",
//             "icon": "04d"
//         }
//     ],
//     "base": "stations",
//     "main": {
//         "temp": 301.78,
//         "feels_like": 305.09,
//         "temp_min": 299.88,
//         "temp_max": 304.32,
//         "pressure": 1015,
//         "humidity": 70
//     },
//     "visibility": 10000,
//     "wind": {
//         "speed": 0.45,
//         "deg": 23,
//         "gust": 2.24
//     },
//     "clouds": {
//         "all": 90
//     },
//     "dt": 1633202125,
//     "sys": {
//         "type": 2,
//         "id": 2003218,
//         "country": "US",
//         "sunrise": 1633177502,
//         "sunset": 1633220111
//     },
//     "timezone": -18000,
//     "id": 4671654,
//     "name": "Austin",
//     "cod": 200
// }