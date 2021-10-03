const apiKey = "724473c03ae546dd2cb1c166f124b69d";
var currentDate = moment().format('MM/DD/YYYY');
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
// var loadSearchHistory = function() {
    // if (localStorage.getItem("history") === null) {
    //     let history = ["chicago"];
    //     return history;
    // } else {
//     JSON.parse(localStorage.getItem("history"))
//     for (var i = 0; i < history.length; i++) {
//         var name = history[i]
//         historyArr.push(name);
//     }
// }

var getSearchedInfo = function(city) {
    var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    var fiveDayWeather = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;
    fetch(currentWeather).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
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
                //every 8th item is 24hrs, starting item 4
                const dayOne = data.list[4]
                const dayTwo = data.list[12]
                const dayThree = data.list[20]
                const dayFour = data.list[28]
                const dayFive = data.list[36]
                fiveDayFore(dayOne, dayTwo, dayThree, dayFour, dayFive);
            })
        } 
    });
}   

var displayWeather = function(temp, city, speed, humidity) {

    console.log(currentDate)
    weatherSearchCityEl.textContent = "";
    weatherSearchTempEl.textContent = "";
    weatherSearchWindEl.textContent = "";
    weatherSearchHumidEl.textContent = "";
    // weatherSearchUVEl.textContent = "";

    weatherSearchTempEl.textContent = temp + " Degrees, Farenheight";
    weatherSearchCityEl.textContent = city + " " + currentDate;
    weatherSearchWindEl.textContent = speed + " MPH";
    weatherSearchHumidEl.textContent = humidity + "%";
    // weatherSearchUVEl.textContent = "";
}

var fiveDayFore = function(dayOne, dayTwo, dayThree, dayFour, dayFive) {
    console.log(dayOne, dayTwo, dayThree);
    var dayCardsEl = document.querySelector("#dayCards")
    dayCardsEl.classList.remove("visually-hidden")
    //trigger five day forecast renders
    dayOneCard(dayOne);
    dayTwoCard(dayTwo);
    dayThreeCard(dayThree);
    dayFourCard(dayFour);
    dayFiveCard(dayFive);
}
var dayOneCard = function(dayOne) {
    var dateOne = moment(currentDate, 'MM/DD/YYYY').add(1, "d").format('MM/DD/YYYY');
    var dayOneTitleEl = document.querySelector("#dayOneTitle");    
    var dayOneTempEl = document.querySelector("#dayOneTemp");
    var dayOneSpeedEl = document.querySelector("#dayOneSpeed");
    var dayOneHumidEl = document.querySelector("#dayOneHumid");
    const {temp} = dayOne.main;
    const {speed} = dayOne.wind;
    const {humidity} = dayOne.main;

    dayOneTitleEl.textContent = dateOne;
    dayOneTempEl.textContent = "Temp: " + temp + " Degrees F";
    dayOneSpeedEl.textContent = "Wind Speed: " + speed + " MPH";
    dayOneHumidEl.textContent = "Humidity: " + humidity + "%";
}
var dayTwoCard = function(dayTwo) {
    var dateTwo = moment(currentDate, 'MM/DD/YYYY').add(2, "d").format('MM/DD/YYYY');
    var dayTwoTitleEl = document.querySelector("#dayTwoTitle");
    var dayTwoTempEl = document.querySelector("#dayTwoTemp");
    var dayTwoSpeedEl = document.querySelector("#dayTwoSpeed");
    var dayTwoHumidEl = document.querySelector("#dayTwoHumid");
    const {temp} = dayTwo.main;
    const {speed} = dayTwo.wind;
    const {humidity} = dayTwo.main;

    dayTwoTitleEl.textContent = dateTwo;
    dayTwoTempEl.textContent = "Temp: " + temp + " Degrees F";
    dayTwoSpeedEl.textContent = "Wind Speed: " + speed + " MPH";
    dayTwoHumidEl.textContent = "Humidity: " + humidity + "%"
}
var dayThreeCard = function(dayThree) {
    var dateThree = moment(currentDate, 'MM/DD/YYYY').add(3, "d").format('MM/DD/YYYY');
    var dayThreeTitleEl = document.querySelector("#dayThreeTitle");
    var dayThreeTempEl = document.querySelector("#dayThreeTemp");
    var dayThreeSpeedEl = document.querySelector("#dayThreeSpeed");
    var dayThreeHumidEl = document.querySelector("#dayThreeHumid");
    const {temp} = dayThree.main;
    const {speed} = dayThree.wind;
    const {humidity} = dayThree.main;

    dayThreeTitleEl.textContent = dateThree;
    dayThreeTempEl.textContent = "Temp: " + temp + " Degrees F";
    dayThreeSpeedEl.textContent = "Wind Speed: " + speed + " MPH";
    dayThreeHumidEl.textContent = "Humidity: " + humidity + "%"
}
var dayFourCard = function(dayFour) {
    var dateFour = moment(currentDate, 'MM/DD/YYYY').add(4, "d").format('MM/DD/YYYY');
    var dayFourTitleEl = document.querySelector("#dayFourTitle");
    var dayFourTempEl = document.querySelector("#dayFourTemp");
    var dayFourSpeedEl = document.querySelector("#dayFourSpeed");
    var dayFourHumidEl = document.querySelector("#dayFourHumid");
    const {temp} = dayFour.main;
    const {speed} = dayFour.wind;
    const {humidity} = dayFour.main;

        dayFourTitleEl.textContent = dateFour;
    dayFourTempEl.textContent = "Temp: " + temp + " Degrees F";
    dayFourSpeedEl.textContent = "Wind Speed: " + speed + " MPH";
    dayFourHumidEl.textContent = "Humidity: " + humidity + "%"
}
var dayFiveCard = function(dayFive) {
    var dateFive = moment(currentDate, 'MM/DD/YYYY').add(5, "d").format('MM/DD/YYYY');
    var dayFiveTitleEl = document.querySelector("#dayFiveTitle");
    var dayFiveTempEl = document.querySelector("#dayFiveTemp");
    var dayFiveSpeedEl = document.querySelector("#dayFiveSpeed");
    var dayFiveHumidEl = document.querySelector("#dayFiveHumid");
    const {temp} = dayFive.main;
    const {speed} = dayFive.wind;
    const {humidity} = dayFive.main;

    dayFiveTitleEl.textContent = dateFive;
    dayFiveTempEl.textContent = "Temp: " + temp + " Degrees F";
    dayFiveSpeedEl.textContent = "Wind Speed: " + speed + " MPH";
    dayFiveHumidEl.textContent = "Humidity: " + humidity + "%"
}

searchButtonEl.addEventListener("click", submitHandler);