let container = document.querySelector('#wrapp');


defaultPage();

//permission page should show up only once
function defaultPage() {
  if (localStorage.geolocationPermission) {
    startApp();
  } else {
    localStorage.setItem("geolocationPermission", true);
    permissionPage();
  }
}

function permissionPage() {
  //resetting the url
  location.hash = "";

  let geolocTemp = document.querySelector('#geolocation').innerHTML;
  //starting with the geolocation permission panel from the template
  container.innerHTML = geolocTemp;

  let allowBtn = document.querySelector('#allow');
  let denyBtn = document.querySelector('#deny');

  allowBtn.addEventListener("click", startApp);
  denyBtn.addEventListener("click", cantStart);
}


//display warning if the user doesn't grant the permission for geolocation
function cantStart() {
  let panelBody = document.querySelector('.panel-body');
  let defPanelBody = document.querySelector('.panel-body').innerHTML;

  panelBody.innerHTML = "<p style='color:red;'>Your permission is necessary in order to use the app</p>";
  setTimeout(function () {
    panelBody.innerHTML = defPanelBody;
  },2000);
}


function startApp() {
  //resetting the url
  location.hash = "#/list";

  getLocation();
}

//taking the location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(applyPosition);
  } else {
    container.innerHTML = '<h1>Geolocation is not supported by this browser</h1>';
  }
}


function applyPosition(position) {
  let lat = position.coords.latitude;
  let lng = position.coords.longitude;
  // ????
  //adjust when you resolve CORS problems

  dataInit();
  setInterval(dataInit, 60000)
}

function dataInit() {
  data.getData("AircraftList.json").then(function (res) {
      createList(res);
  })
}


function createList(res) {
  let listTemp = document.querySelector("#list").innerHTML;
  //loading the list page - taking it from the list template
  container.innerHTML = listTemp;

  let ul = document.querySelector("#ul");
  let flightTemp = document.querySelector("#flight").innerHTML;

  // generating the list
  data.getData("AircraftList.json").then(function (res) {
    let flights = [];
    let text = "";
    let flightsList = "";
    //adding flights info to the flights array
    for (var i = 0; i < res.acList.length; i++) {
      flights.push({
        direction : res.acList[i].Brng < 180 ? "right" : "left",
        Altitude : res.acList[i].Alt,
        Id : res.acList[i].Id,
        airline : res.acList[i].Op.replace(/ /g, ""),
        ManuAndModel : res.acList[i].Mdl,
        Destination : res.acList[i].To || "N/A",
        Origin : res.acList[i].From || "N/A"

      })
    }
    //sorting the array by Altitude from highest to lowest
    flights.sort(function (a,b) {
      return b.Altitude - a.Altitude;
    })
    //taking the flight template and applying data to it
    for (var i = 0; i < flights.length; i++) {
      text = flightTemp.replace("{{direction}}", flights[i].direction)
          .replace("{{Altitude}}", flights[i].Altitude)
          .replace(/{{Flight code number}}/g, flights[i].Id);

        flightsList += text;
    }
  ul.innerHTML = flightsList;
  //adding click event for each flight
  listItemEvents(flights)
  });
}

function listItemEvents(flights) {
  //adding events
  let flightLi = document.querySelectorAll(".flights");
  for (var i = 0; i < flightLi.length; i++) {
    flightLi[i].addEventListener("click", flightDetailPage)
  }
  function flightDetailPage() {
    //searching for the choosen flight
    let id = this.getAttribute("data-id");
    let flightDetail = flights.filter(function (e) {
      return e.Id == id;
    })
   let flight = flightDetail[0];

   //generating the detailed flight page
   let flightPage = document.querySelector("#flightPage").innerHTML;
   let text = flightPage.replace(/{{airline}}/g, flight.airline)
                    .replace("{{ManuAndModel}}", flight.ManuAndModel)
                    .replace("{{Destination}}", flight.Destination)
                    .replace("{{Origin}}", flight.Origin);
  container.innerHTML = text;
  }
}