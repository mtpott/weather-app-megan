// GIVEN a weather dashboard with form inputs
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var citySearchResultEl = document.querySelector("#city-info-container");
var citySearchTerm = document.querySelector("#city-search");
var previousButtonsEl = document.querySelector("#city-buttons");

var cityEl = document.querySelector("#city-name");

submitEl = document.getElementById("submit-btn");


function callFunction() {
    console.log("at least i did something right");
}

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
var citySearchHandler = function(event) {
    event.preventDefault();

    //get the value from the search box
    var city = cityEl.value.trim();

    if (city) {
        //run the function that has the fetch/response inside
        findCity();
        //clear out old content for better user experience
        citySearchResultEl.textContent = "";
        cityEl.value = "";
    } else {
        alert("Please enter a valid city.");
    }
    console.log(event);
};

var findCity = function(city) {
    //weather dashboard api url
    //var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=cb4e52cc5777eb1ec0226a6d4ac1e0a8&lang=en&units=imperial"; 

    //fetch request
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=` + city + `&appid=cb4e52cc5777eb1ec0226a6d4ac1e0a8&lang=en&units=imperial`)
    .then(function(response) {
        if(response.ok) {
            console.log("found city");
            response.json().then(function(data) {
                displayCity(data, city);
            });
        } else {
            alert("Error: Could not find City")
        }
    })
    .catch(function(error) {
        alert("error!");
    });
};

var displayCity = function() {
    console.log(data);
}

submitEl.addEventListener("submit", citySearchHandler);

callFunction();