# Weather-Application

## Technologies Used

- HTML
- CSS
- JavaScript
- Jquery
- Web APIs
- Serverside API's (openweathermap)
- VS Code
- Git
- GitHub

## Link to Application

https://kevinpxu.github.io/Weather-Application/

## Summary

This project was created to teach myself how to properly fetch server-side API's from the web. I learned how to create custom API links to retrieve custom data from an API. I also learned how to use different asynchronous function calls to retrieve the information first then display that information on to the screen. I also learned to use try catch to receive error messages for certain user inputs that are invalid for the API link.

## Demonstration

![A user inputs a city name, then the city's forecast for today and the next five days are displayed on the screen, under the search bar, a history of all recent cities is displayed and each can be pressed to search that city again.](./Assets/demo.gif)

## Description

A simple weather application that displays todays weather forecast as well as the next five days forecast in the webpage. It will also store and sort the entries by most recent entry under the search bar.

## Code Snippet

### Functions that asynchronously waits for the data of the API, but will catch the error if the location is not valid.

```JavaScript
async function formSubmitHandler(event) {
  event.preventDefault();
  cityName = locationInputEl.val().trim();
  if (cityName) {
    try {
      await getApiData(cityName);
      storeLocationHistory(cityName);
    } catch (err) {
      console.log("still not a valid city");
    }
    locationInputEl.val("");
  } else {
    alert("Please enter a location");
  }
}
async function getApiData(cityName) {
  var weatherApiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&appid=baa49ab2f93c267a38ffa79b5f8e1d8d&units=imperial";
  var res = await fetch(weatherApiUrl);
  if (res.status === 404) {
    throw new Error("Not a valid city");
  }
  var data = await res.json();
  todaysForecast(data);
  fiveDayForecast(data);
}
```

## Author Links

[LinkedIn](https://www.linkedin.com/in/kevin-xu-4672a7215/)
[GitHub](https://github.com/KevinPXu)
