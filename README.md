## Weather Dashboard

For our weather dashboard project, we were tasked with using an API from OpenWeather to retrieve data from various cities. When the user clicks the search bar, they are able to see the weather information for the city that the searched--this includes the name of the city, the date and time, temperature (min and max), humidity, weather conditions, wind speed, UV index, and a weather icon displaying the conditions for the day. 

I personally don't know the latitude and longitude of various cities, and I assume the average user doesn't either. I wanted to make it possible to search by city, so I actually used a different API from OpenWeatherMap first, but realized that wouldn't give me the information I needed. I decided to include a geolocation API (also through OpenWeatherMap), in order to make the user experience a little easier. The geolocation API takes the name of the city entered into the text box, and finds the latitude and longitude from that city. That function then passes that data into the main Open Call API which requires lat and lon values anyways. This functionality was a little difficult to grasp at first, but once I was able to actually console.log the lat and lon values, I figured it out pretty quickly. 

For whatever reason, the div that contains the fetch request results lines up with the bottom card before the search results are loaded, but lines up with the top card when they're there. Since it looks okay after the results are added, I'll leave it as it is, but I'm not quite sure why that's happening. Additionally, I tried to get the UV index text to change color depending on the weather conditions, but it would not work properly. I've left that function in to show the logic, but the text should change color depending on the number in the UV index!

### Technologies

In this project, I used HTML, CSS, and JavaScript. I also used Bootstrap and two OpenWeatherMap APIs: One Call, and GeoLocation.

### Links 

Link to my GitHub repository: https://github.com/mtpott/weather-app-megan

Link to my deployed project website: https://mtpott.github.io/weather-app-megan/

### Screenshot

A screenshot of the final project: ![project-final-image](./assets/images/weather-challenge-screenshot.png)

