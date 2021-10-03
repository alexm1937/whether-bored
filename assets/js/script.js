const apiKey = "724473c03ae546dd2cb1c166f124b69d";
var searchInputEl = document.querySelector("#search");
var searchButtonEl = document.querySelector("#searchBtn")
// var weatherContainerEl = document.querySelector("#weather-container");    
var weatherSearchCityEl = document.querySelector("#weather-search-city");
var weatherSearchTempEl = document.querySelector("#weather-search-temp");
var weatherSearchWindEl = document.querySelector("#weather-search-wind");
var weatherSearchHumidEl = document.querySelector("#weather-search-humid");
var weatherSearchUVEl = document.querySelector("#weather-search-uv");
var dayOneCardEl = document.querySelector("#dayOneCard");

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
    //FIVE DAY FORECAST API FETCH
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
    weatherSearchWindEl.textContent = "";
    weatherSearchHumidEl.textContent = "";
    // weatherSearchUVEl.textContent = "";

    weatherSearchTempEl.textContent = temp + " Degrees, Farenheight";
    weatherSearchCityEl.textContent = city;
    weatherSearchWindEl.textContent = speed + " MPH";
    weatherSearchHumidEl.textContent = humidity + "%";
    // weatherSearchUVEl.textContent = "";
}

var fiveDayFore = function(dayOne, dayTwo, dayThree) {
    console.log(dayOne, dayTwo, dayThree);
    var dayOneCardEl = document.querySelector("#dayOneCard");
    dayOneCardEl.classList.remove("visually-hidden")
    
    //DayOneForecast
    dayOneCard(dayOne);
    dayTwoCard(dayTwo);
    
    
    //append f
}
var dayOneCard = function(dayOne) {
    var dayOneCardEl = document.querySelector("#dayOneCard");
    var dayOneTempEl = document.querySelector("#dayOneTemp");
    var dayOneSpeedEl = document.querySelector("#dayOneSpeed");
    var dayOneHumidEl = document.querySelector("#dayOneHumid");
    const {temp} = dayOne.main;
    const {speed} = dayOne.wind;
    const {humidity} = dayOne.main;

    dayOneTempEl.textContent = "Temp: " + temp + " Degrees F";
    dayOneSpeedEl.textContent = "Wind Speed: " + speed + " MPH";
    dayOneHumidEl.textContent = "Humidity: " + humidity + "%";
}
var dayTwoCard = function(dayTwo) {
    var dayTwoCardEl = document.querySelector("#dayTwoCard");
    var dayTwoTempEl = document.querySelector("#dayTwoTemp");
    var dayTwoSpeedEl = document.querySelector("#dayTwoSpeed");
    var dayTwoHumidEl = document.querySelector("#dayTwoHumid");
    const {temp} = dayTwo.main;
    const {speed} = dayTwo.wind;
    const {humidity} = dayTwo.main;

    dayTwoTempEl.textContent = "Temp: " + temp + " Degrees F";
    dayTwoSpeedEl.textContent = "Wind Speed: " + speed + " MPH";
    dayTwoHumidEl.textContent = "Humidity: " + humidity + "%"
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