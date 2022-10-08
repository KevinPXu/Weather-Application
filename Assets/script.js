var userFormEl = $(".user-form");
var locationInputEl = $("#location");
var customApiURL = "";
var location = "";
var coordinates = [];

function formSubmitHandler(event) {
  event.preventDefault();
  console.log();
  location = locationInputEl.val().trim();
  console.log(location);
  if (location) {
    getApiKey(location);
    locationInputEl = " ";
  } else {
    alert("Please enter a location");
  }
}

function getCoordinates(location) {
  var apiUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    location +
    "&limit=1&appid=baa49ab2f93c267a38ffa79b5f8e1d8d";
  fetch(apiUrl).then(function (response) {
    return response.json();
  });
}

function getApiKey(location) {
  var coords = getCoordinates(location);
  console.log(coords);
}

userFormEl.on("submit", formSubmitHandler);
