var userFormEl = $(".user-form");
var locationInputEl = $("#location");
var customApiURL = "";

function formSubmitHandler(event) {
  event.preventDefault();
  console.log();
  var location = locationInputEl.val().trim();
  console.log(location);
  if (location) {
    getCoordinates(location);
    locationInputEl = " ";
  } else {
    alert("Please enter a location");
  }
}
