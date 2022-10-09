var userFormEl = $(".user-form");
var locationInputEl = $("#location");
var cityName = "";
function formSubmitHandler(event) {
  event.preventDefault();
  console.log();
  cityName = locationInputEl.val().trim();
  console.log(cityName);
  if (cityName) {
    getApiData(cityName);
    locationInputEl = " ";
  } else {
    alert("Please enter a location");
  }
}

async function getApiData(cityName) {
  var weatherApiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&appid=baa49ab2f93c267a38ffa79b5f8e1d8d&units=imperial";

  console.log(weatherApiUrl);

  var res = await fetch(weatherApiUrl);
  var data = await res.json();
  console.log(data);
  todaysForecast(data);
  fiveDayForecast(data);
}

function todaysForecast(data) {
  var date = new Date(data.list[0].dt * 1000);
  console.log(date);
  var iconUrl =
    "http://openweathermap.org/img/wn/" +
    data.list[0].weather[0].icon +
    "@2x.png";
  var todayContainerEl = $("#container-today");
  var todayIconEl = $("<img>");
  var listContainerEl = $("<ul>");
  listContainerEl.addClass("list-unstyled");
  $("#jumbo-title").text(
    data.city.name + " (" + date.toLocaleDateString("default") + ") "
  );
  todayIconEl.attr({ src: iconUrl, alt: "weather condition icon" });
  $("#jumbo-title").append(todayIconEl);

  var todayTempEl = $("<li>");
  var todayWindEl = $("<li>");
  var todayHumidityEl = $("<li>");
  todayTempEl.text("Temperature: " + data.list[0].main.temp + "\u00B0F");
  todayWindEl.text("Wind: " + data.list[0].wind.speed + "MPH");
  todayHumidityEl.text("Humidity: " + data.list[0].main.humidity + "%");
  listContainerEl.append(todayTempEl, todayWindEl, todayHumidityEl);
  todayContainerEl.append(listContainerEl);
}

function fiveDayForecast(data) {
  var date;
  var iconUrl;
  var cardContainerEl = $("#card-container");

  for (var i = 7; i <= 40; i += 8) {
    date = new Date(data.list[i].dt * 1000);
    console.log(date);
    iconUrl =
      "http://openweathermap.org/img/wn/" +
      data.list[i].weather[0].icon +
      "@2x.png";
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

    cardTitleEl.text(date.toLocaleDateString("default"));

    fiveDayIconEl.attr({ src: iconUrl, alt: "weather condition icon" });
    cardTitleEl.append(fiveDayIconEl);
    fiveDayTempEl.text("Temperature: " + data.list[i].main.temp + "\u00B0F");
    fiveDayWindEl.text("Wind: " + data.list[i].wind.speed + "MPH");
    fiveDayHumidityEl.text("Humidity: " + data.list[i].main.humidity + "%");

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
userFormEl.on("submit", formSubmitHandler);
