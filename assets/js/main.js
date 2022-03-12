var citySearchResultEl = document.querySelector("#city-info-container");
var citySearchTerm = document.querySelector("#city-search");
var previousButtonsEl = document.querySelector("#city-buttons");

var cityEl = document.querySelector("#city-name");

var submitEl = document.getElementById("submit-btn");
var citySubmitEl = document.querySelector("#city-form");
var citySaveText = document.querySelector("#city-previous");

//arrays for accessing openweather API data
var dateArray = [];
var descriptionArray = [];
var minTempArray = [];
var maxTempArray = [];
var humidArray = [];
var windArray = [];
var iconArray = [];

var citySearchHandler = function(event) {
    event.preventDefault();

    //get the value from the search box
    var city = cityEl.value.trim();

    if (city) {
        //run the function that has the fetch/response inside
        cityCoords(city);
        //clear out old content for better user experience
        citySearchResultEl.textContent = "";
        cityEl.value = "";
        return;
    } else {
        alert("please enter a valid city!");
    }
    //console.log(event);
};


//use geocoding api from openweathermap to find the latitude and longitude by city
//use those coordinates in findCity in order to use the opencall api

var cityCoords = function(city) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=cb4e52cc5777eb1ec0226a6d4ac1e0a8`)
    .then(function(response) {
        if(response.ok){
            response.json().then(function(location) {
                var lat = location[0].lat;
                var lon = location[0].lon;
                var city = location[0].name;
                findCity(lat, lon, city);
                saveCity(lat, lon, city);
            });
        } else {
            alert("error! couldn't find what you're looking for.");
        }
    })
    .catch(function(error) {
        alert("error! could not connect to the weather dashboard :(");
    });
};

var findCity = function(lat, lon, city) {

    //https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&&appid=cb4e52cc5777eb1ec0226a6d4ac1e0a8

    //fetch request
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&units=imperial&appid=cb4e52cc5777eb1ec0226a6d4ac1e0a8`)
    .then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                displayCity(city, data);
            });
        } else {
            alert("error! could not find the city you're looking for :(");
        }
    })
    .catch(function(error) {
        alert("error! could not connect to the weather dashboard :(");
    });
};

var displayCity = function(city, data) {
    if (city.length === 0) {
        citySearchResultEl.textContent = "no information found.";
        return;
    }
    citySearchTerm.textContent = city;
    
    //loop over the weather days
    for (var i = 0; i < city.length; i++) {

        var dayName = city;
    
        //create containers for each response
        //these will contain the corresponding weather data
        var dayEl = document.createElement("div");
        dayEl.classList = "card mt-2 list-item justify-space-between";

        //convert unix time to readable time
        var timeData = data.daily[i].dt * 1000;
        var dateData = new Date(timeData);
        var readDate = dateData.toLocaleString();

        var locationEl = document.createElement("h3");
        locationEl.classList = "ml-2 mt-1 text-center";
        locationEl.textContent = dayName;

        var dateData = readDate;
        var minTempData = data.daily[i].temp.min;
        var maxTempData = data.daily[i].temp.max;
        var humidData = data.daily[i].humidity;
        var windData = data.daily[i].wind_speed;
        var descriptionData = data.daily[i].weather[0].description;

        // console.log(dateData);
        // console.log(minTempData);
        // console.log(maxTempData)
        // console.log(humidData);
        // console.log(windData);
        // console.log(descriptionData);
        
        //to display icons
        var icon = data.daily[i].weather[0].icon;
        var iconImage = "http://openweathermap.org/img/wn/" + icon + ".png";
        // console.log(icon);

        var dateEl = document.createElement("h4");
        dateEl.textContent = readDate;
        dateEl.classList = "weather ml-2 text-center";
        var minTempEl = document.createElement("p");
        minTempEl.textContent = "low: " + minTempData;
        minTempEl.classList = "weather ml-2 text-center";
        var maxTempEl = document.createElement("p");
        maxTempEl.textContent = "high: " + maxTempData;
        maxTempEl.classList = "weather ml-2 text-center";
        var humidEl = document.createElement("p");
        humidEl.textContent = "humidity: " + humidData + "%";
        humidEl.classList = "weather ml-2 text-center";
        var windEl = document.createElement("p");
        windEl.textContent = "wind speed: " + windData;
        windEl.classList = "weather ml-2 text-center";
        var descriptionEl = document.createElement("p");
        descriptionEl.textContent = "conditions: " + descriptionData;
        descriptionEl.classList = "weather ml-2 text-center";
        var iconEl = document.createElement("div");
        iconEl.classList = "ml-2 mx-auto";
        iconEl.innerHTML = "<img src='" + iconImage + "'>";

        dateArray.push(dateData);
        descriptionArray.push(descriptionData);
        minTempArray.push(minTempData);
        maxTempArray.push(maxTempData);
        humidArray.push(humidData);
        windArray.push(windData);
        iconArray.push(icon);

        //append locationEl to its parent container, dayEl
        dayEl.appendChild(locationEl);

        //append weather data to the parent container, dayEl
        dayEl.appendChild(dateEl);
        dayEl.appendChild(descriptionEl);
        dayEl.appendChild(iconEl);
        dayEl.appendChild(maxTempEl);
        dayEl.appendChild(minTempEl);
        dayEl.appendChild(humidEl);
        dayEl.appendChild(windEl);

        //append weatherEl to its parent container, citySearchResultEl
        citySearchResultEl.appendChild(dayEl);
    }
};

//saved city string
var cityString = [];

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
var saveCity = function(lat, lon, city) {

    //inside of the function, i want to save the value of the text input
    localStorage.setItem("previousCity", city);

    //create button to hold savedCity data
    var savedCityEl = document.createElement("button");
    savedCityEl.classList = "prev-btn m-2";

    var savedCity = localStorage.getItem("previousCity");
    savedCityEl.textContent = savedCity;
    
    //append savedCityEl to the parent container, citySaveText
    citySaveText.appendChild(savedCityEl);

    //add city's value to the localstorage array in order to save to buttons
    savedCityEl.onclick = function() {
        citySearchTerm.textContent = savedCity;
        findCity(lat, lon, savedCity);

    };
};

citySubmitEl.addEventListener("submit", citySearchHandler);
//submitEl.addEventListener("click", saveCity);