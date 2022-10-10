var userFormEl = $(".user-form");
var submitButtonEl = $("#submitButton");
var locationInputEl = $("#location");
var cityName = "";
var pastCityNames = [];

//function that will prevent the default action of the form to take place and to store the input of the user in a variable. If the user inputs an invalid city, it will catch the 404 error and console log the error message.
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

//once the input is stored, this function is called to obtain the API url using the city name the user inputted. Then it will fetch the data from the URL. If the status is 404 we created an error for the above function to catch. Otherwise it will return the data from that API call.
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

//function that dynamically displays the Data for todays forecast in the jumbotron of the page. It will display the name of the city, the current date, the temperature, wind speed, and humidity and includes an icon that allows us to easily tell what the weather conditions will look like.
function todaysForecast(data) {
  //retrieves the date data from the UNIX code the data gave us.
  var date = new Date(data.list[0].dt * 1000);
  //creates an icon Url we can use to display the icon given to us by the data called from the API.
  var iconUrl =
    "http://openweathermap.org/img/wn/" +
    data.list[0].weather[0].icon +
    "@2x.png";
  //variables to create all the new elements needed to append to the screen including all of the bootstrap classes needed to style it.
  var todayContainerEl = $("#container-today");
  var jumboTitleEl = $("<h1>");
  jumboTitleEl.addClass("display-5 mx-3");
  var todayIconEl = $("<img>");
  var listContainerEl = $("<ul>");
  todayContainerEl.html("");
  listContainerEl.addClass("list-unstyled");
  //statement that changes the Unix date given to us to just display the date we need as well as appends the city name to the jumbotron.
  jumboTitleEl.text(
    data.city.name + " (" + date.toLocaleDateString("default") + ") "
  );
  //adds attributes to the image tag created above to append the icon image
  todayIconEl.attr({ src: iconUrl, alt: "weather condition icon" });
  jumboTitleEl.append(todayIconEl);

  //dynamically adds the temperature, wind, and humidity to the cards.
  var todayTempEl = $("<li>");
  var todayWindEl = $("<li>");
  var todayHumidityEl = $("<li>");
  todayTempEl.text("Temperature: " + data.list[0].main.temp + "\u00B0F");
  todayWindEl.text("Wind: " + data.list[0].wind.speed + " MPH");
  todayHumidityEl.text("Humidity: " + data.list[0].main.humidity + "%");
  //appends all relevant tags to its parent tags.
  listContainerEl.append(todayTempEl, todayWindEl, todayHumidityEl);
  todayContainerEl.append(jumboTitleEl, listContainerEl);
}

//similar to the above function, this will dynamically create the cards the 5 day forecast will be displayed in. Again each card will have the date of the forecast, the temperature, wind speed, humidity and an icon showing the weather condition.
function fiveDayForecast(data) {
  var date;
  var iconUrl;
  var cardContainerEl = $("#card-container");
  cardContainerEl.html("");
  // because the API give data in 3 hour increments, we needed to increment the array given by 8 to retrieve the next days forecast.
  for (var i = 7; i <= 40; i += 8) {
    date = new Date(data.list[i].dt * 1000);
    //creates an icon Url we can use to display the icon given to us by the data called from the API.
    iconUrl =
      "http://openweathermap.org/img/wn/" +
      data.list[i].weather[0].icon +
      "@2x.png";
    //variables to create all the new elements needed to append to the screen including all of the bootstrap classes needed to style it.
    var cardEl = $("<div>");
    cardEl.addClass("card col-xl-2 mx-4");
    var cardBodyEl = $("<div>");
    cardBodyEl.addClass("card-body");
    cardTitleEl = $("<h5>");
    cardTitleEl.addClass("card-title");
    var fiveDayListContainerEl = $("<ul>");
    fiveDayListContainerEl.addClass("card-text list-unstyled");
    var fiveDayIconEl = $("<img>");
    var fiveDayTempEl = $("<li>");
    var fiveDayWindEl = $("<li>");
    var fiveDayHumidityEl = $("<li>");
    //statement that changes the Unix date given to us to just display the date we need.
    cardTitleEl.text(date.toLocaleDateString("default"));
    //adds attributes to the image tag created above to append the icon image
    fiveDayIconEl.attr({ src: iconUrl, alt: "weather condition icon" });
    cardTitleEl.append(fiveDayIconEl);
    //dynamically adds the temperature, wind, and humidity to the cards.
    fiveDayTempEl.text("Temperature: " + data.list[i].main.temp + "\u00B0F");
    fiveDayWindEl.text("Wind: " + data.list[i].wind.speed + " MPH");
    fiveDayHumidityEl.text("Humidity: " + data.list[i].main.humidity + "%");

    //appends all relevant tags to its parent tags.
    fiveDayListContainerEl.append(
      fiveDayTempEl,
      fiveDayWindEl,
      fiveDayHumidityEl
    );
    cardBodyEl.append(cardTitleEl, fiveDayListContainerEl);
    cardEl.append(cardBodyEl);
    cardContainerEl.append(cardEl);
  }
}

//function that stores the location to array to be stored to local storage. If the same city is called, it will check to see if that city is already in the array and will pull it out and re-append it to the array so it is sorted from most recent called.
function storeLocationHistory(cityName) {
  if (pastCityNames.includes(cityName)) {
    let found = pastCityNames.findIndex(
      (pastCityName) => pastCityName === cityName
    );
    pastCityNames.splice(found, 1);
  }
  pastCityNames.unshift(cityName);
  localStorage.setItem("pastLocations", JSON.stringify(pastCityNames));
  renderLocationHistory();
}

//renders the buttons for the search history under the search bar with its corresponding city name
function renderLocationHistory() {
  var searchHistoryEl = $("#search-history");
  searchHistoryEl.html("");
  var cityHistory = JSON.parse(localStorage.getItem("pastLocations"));
  for (let city of cityHistory) {
    let cityButtonEl = $("<button>");
    cityButtonEl.addClass("btn btn-secondary w-75 my-2");
    cityButtonEl.attr("id", city);
    cityButtonEl.text(city);
    cityButtonEl.on("click", (e) => {
      getApiData(e.target.textContent);
      storeLocationHistory(city);
    });
    searchHistoryEl.append(cityButtonEl);
  }
}
//event listeners for both submit and the click on the search button to call formSubmitHandler function
userFormEl.on("submit", formSubmitHandler);
submitButtonEl.on("click", formSubmitHandler);
