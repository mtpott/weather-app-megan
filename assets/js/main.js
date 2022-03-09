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
// var stateEl = document.querySelector("#state-name")

var submitEl = document.getElementById("submit-btn");
var citySubmitEl = document.querySelector("#city-form");

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
var citySearchHandler = function(event) {
    event.preventDefault();

    //get the value from the search box
    var city = cityEl.value.trim();


    // var state = stateEl.value.trim();

    if (city) {
        //run the function that has the fetch/response inside
        findCity(city);
        //clear out old content for better user experience
        citySearchResultEl.textContent = "";
        cityEl.value = "";
        // stateEl.value = "";
        return;

    } else {
        alert("please enter a valid city!");
    }
    //console.log(event);
};

var findCity = function(city) {

    //fetch request
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=cb4e52cc5777eb1ec0226a6d4ac1e0a8`)
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
    //console.log(data.list[0]);
    
    //loop over the weather days
    for (var i = 0; i < city.length; i++) {

        var dayName = city;
    
        //create containers for each day
        //these will contain the corresponding weather data
        var dayEl = document.createElement("div");
        dayEl.classList = "card mt-2 list-item justify-space-between";

        //convert unix time to readable time
        var timeData = data.list[i].dt * 1000;
        var dateData = new Date(timeData);
        var readDate = dateData.toLocaleString();

        var locationEl = document.createElement("h3");
        locationEl.textContent = dayName;

        var dateEl = document.createElement("h4");
        dateEl.textContent = readDate;
        var descriptionEl = document.createElement("h4");
        descriptionEl.textContent = data.list[i].weather.description;
        var minTempEl = document.createElement("p");
        minTempEl.textContent = "min. temperature: " + data.list[i].main.temp_min;
        var maxTempEl = document.createElement("p");
        maxTempEl.textContent = "max. temperature: " + data.list[i].main.temp_max;
        var humidEl = document.createElement("p");
        humidEl.textContent = "humidity: " + data.list[i].main.humidity + "%";


        //append locationEl to its parent container, dayEl
        dayEl.appendChild(locationEl);

        //append weather data to the parent container, dayEl
        dayEl.appendChild(dateEl);
        dayEl.appendChild(descriptionEl);
        dayEl.appendChild(minTempEl);
        dayEl.appendChild(maxTempEl);
        dayEl.appendChild(humidEl);

        //append weatherEl to its parent container, citySearchResultEl
        citySearchResultEl.appendChild(dayEl);
    }
    // console.log(data.list[i]);
    // console.log(data.list[i].dt);
    console.log(data.list[0].weather.description);
};

citySubmitEl.addEventListener("submit", citySearchHandler);