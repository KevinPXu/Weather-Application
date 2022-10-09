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

function fiveDayForecast(data) {
  var date = "";
  for (var i = 8; i <= 40; i + 8) {
    date = new Date(data.list[i].dt * 1000);
  }
}
userFormEl.on("submit", formSubmitHandler);
