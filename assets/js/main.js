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

var submitEl = document.getElementById("submit-btn");
var citySubmitEl = document.querySelector("#city-form");
var citySaveText = document.querySelector("#city-previous");

//arrays for accessing openweather API data
var dateArray = [];
var descriptionArray = [];
var minTempArray = [];
var maxTempArray = [];
var humidArray = [];

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
var citySearchHandler = function(event) {
    event.preventDefault();

    //get the value from the search box
    var city = cityEl.value.trim();

    if (city) {
        //run the function that has the fetch/response inside
        findCity(city);
        saveCity(city);

        //clear out old content for better user experience
        citySearchResultEl.textContent = "";
        cityEl.value = "";
        return;

    } else {
        alert("please enter a valid city!");
    }
    //console.log(event);
};

var findCity = function(city) {

    //fetch request
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&&appid=cb4e52cc5777eb1ec0226a6d4ac1e0a8`)
    .then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                displayCity(city, data);
            });
        } else {
            alert("error! we can't find the city you're looking for :(");
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
    console.log(city);
    citySearchTerm.textContent = city;
    
    //loop over the weather days
    for (var i = 0; i < city.length; i++) {

        var dayName = city;
    
        //create containers for each response
        //these will contain the corresponding weather data
        var dayEl = document.createElement("div");
        dayEl.classList = "card mt-2 list-item justify-space-between";

        //convert unix time to readable time
        var timeData = data.list[i].dt * 1000;
        var dateData = new Date(timeData);
        var readDate = dateData.toLocaleString();

        var locationEl = document.createElement("h3");
        locationEl.classList = "ml-2";
        locationEl.textContent = dayName;

        var dateData = readDate;
        var minTempData = data.list[i].main.temp_min;
        var maxTempData = data.list[i].main.temp_max;
        var humidData = data.list[i].main.humidity;
        var descriptionData = JSON.stringify(data.list[i].weather[0].description);

        var dateEl = document.createElement("h4");
        dateEl.textContent = readDate;
        dateEl.classList = "ml-2";
        var minTempEl = document.createElement("p");
        minTempEl.textContent = "low: " + minTempData;
        minTempEl.classList = "ml-2";
        var maxTempEl = document.createElement("p");
        maxTempEl.textContent = "high: " + maxTempData;
        maxTempEl.classList = "ml-2";
        var humidEl = document.createElement("p");
        humidEl.textContent = "humidity: " + humidData + "%";
        humidEl.classList = "ml-2";
        var descriptionEl = document.createElement("p");
        descriptionEl.textContent = "conditions: " + descriptionData;
        descriptionEl.classList = "ml-2";

        dateArray.push(dateData);
        descriptionArray.push(descriptionData);
        minTempArray.push(minTempData);
        maxTempArray.push(maxTempData);
        humidArray.push(humidData);

        //weather type--if it's favorable, make the container light blue
        //if it's moderate, make the container light gray
        //if it's storming, make the container darker gray

        //append locationEl to its parent container, dayEl
        dayEl.appendChild(locationEl);

        //append weather data to the parent container, dayEl
        dayEl.appendChild(dateEl);
        dayEl.appendChild(descriptionEl);
        dayEl.appendChild(maxTempEl);
        dayEl.appendChild(minTempEl);
        dayEl.appendChild(humidEl);

        //append weatherEl to its parent container, citySearchResultEl
        citySearchResultEl.appendChild(dayEl);
    }
    // console.log(dateArray);
    // console.log(minTempArray);
    // console.log(maxTempArray);
    // console.log(humidArray);
    // console.log(descriptionArray);

    //weatherColor(maxTempData, locationEl);
    // console.log(data.list[i].weather[0]);
};

//if the max temp is colder than 32, make the div gray
//if the max temp is greater than/equal to 32 AND less than/equal to 50, make the div light gray
var weatherColor = function(maxTempData, locationEl) {
    if (maxTempData < 33) {
        locationEl.classList = "text-muted";
    } else if (maxTempData >= 32 && maxTempData <= 50) {
        locationEl.classList = "text-secondary";
    } else if (maxTempData >= 50 && maxTempData <= 75) {
        locationEl.classList = "text-success";
    } else {
        location.classList = "text-warning";
    };
};

//save previously searched cities to local storage
//when i click the search button, i will automatically run this function
//in order to add my search to localStorage

var saveCity = function(city) {
    //inside of the function, i want to save the value of the text input
    localStorage.setItem("previousCity", city);

    //create button to hold savedCity data
    var savedCityEl = document.createElement("button");
    savedCityEl.classList = "prev-btn m-1";

    //append savedCityEl to the parent container, citySaveText
    var savedCity = localStorage.getItem("previousCity");
    console.log(savedCity);
    savedCityEl.textContent = savedCity;
    
    citySaveText.appendChild(savedCityEl);

    var prevButtonEl = document.querySelector("#prev-btn");

    //when i click the button, run the function to complete the api call (displayCity)
    prevButtonEl.click = function() {
        displayCity;
    };
    //create new function to use previous button to search?
};

citySubmitEl.addEventListener("submit", citySearchHandler);
//submitEl.addEventListener("click", saveCity);