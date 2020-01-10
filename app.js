
// creates a date object and extract current day and month
let date = new Date();
weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
let currentDate = weekday[date.getDay()] + ' ' + date.getDate() +', '+ months[date.getMonth()];
document.getElementById('currentTime').innerHTML = currentDate;

// weather api key
const apiKey = '38cb4a78b57b4832242b09fc0609a7ce';
// options setting that is passed as a paramenter to the 
// navigator.geolocation.getCurrentPosition function
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  // success function passed to navigator.geolocation.getCurrentPosition as a parameter
  function success(pos) {
    document.getElementById('warning').classList.add('hidden');
    var crd = pos.coords;
    let latitude  = crd.latitude;
    let longitude = crd.longitude;
    console.log('Your current position is:');
    console.log(`Latitude : ${latitude}`);
    console.log(`Longitude: ${longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    let apiUrl = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;

    fetch(apiUrl)
      .then(response => {
        return response.json()
      })
      .then(data => {
        // Work with JSON data here
        const iconImg = data.weather[0].icon;
        const tempeture = parseInt(data.main.temp) + '°C';
        const city = data.name + ', ' + data.sys.country;
        const description = data.weather[0].description;
        document.getElementById('magicBox').classList.remove("hidden");
        showData(city, tempeture, iconImg, description);
        

      })
      .catch(err => {

         if (err.message == "Failed to fetch") {
          document.getElementById('warning').classList.remove('hidden');
          document.getElementById('warning').innerHTML = " <p> Sorry we couldn't get the data, check your internet coenction and try again </p>";
         } else {
          document.getElementById('warning').classList.remove('hidden');
          document.getElementById('warning').innerHTML = " <p> Sorry we couldn't get your location, try searching for your city instead </p>";
         }     
      })
    
  }
  
  // error function passed to navigator.geolocation.getCurrentPosition as a parameter
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  // obtain the user's current location
  navigator.geolocation.getCurrentPosition(success, error, options);
  


function showData(city, temp, icon, description) {
 let errorIcon = "images/reload.png";  
 let iconElement = document.getElementById('icon_logo');
 let tempDisplay = document.getElementById('tempDisplay');
 let cityName = document.getElementById('cityName')
 let weatherDescription = document.getElementById('weatherDescription');
 weatherDescription.innerHTML = description;
 cityName.innerHTML = city;
 tempDisplay.innerHTML= temp;

 if (icon) {
 iconElement.setAttribute('src', icon);
} else {
  iconElement.setAttribute('src', errorIcon);
}
}


let unitsCelcius = true;

function unitConvertion(){
  
  let tempeture = Math.round(parseInt(tempDisplay.innerHTML));
  if (unitsCelcius) {
    // T(°F) = T(°C) × 1.8 + 32
    temp = tempeture * 1.8 + 32;
    console.log(tempeture);
    unitsCelcius = false;
    document.getElementById('tempDisplay').innerHTML = Math.round(temp) + '°F';
    temp = 0;
  } else {
    // T(°F) = T(°C) × 9/5 + 32
    temp = (tempeture - 32) * 5/9;
    console.log(tempeture);
    unitsCelcius = true;
    document.getElementById('tempDisplay').innerHTML = Math.round(temp) + '°C';
    temp = 0;
    
  }
  
}

function citySearch() {
  let city = document.getElementById('cityInput').value;

  console.log(city);
  
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + '&units=metric' + '&appid='+ apiKey;
  console.log(apiUrl);
  fetch(apiUrl)
      .then(response => {
        return response.json()
      })
      .then(data => {
        // Work with JSON data here
        console.log(data)
        const iconImg = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
        unitsCelcius = true;
        const tempeture = parseInt(data.main.temp) + '°C';
        const city = data.name + ',' + data.sys.country;
        const description = data.weather[0].description;
        document.getElementById('warning').classList.add('hidden');
        document.getElementById('magicBox').classList.remove("hidden");
        showData(city, tempeture, iconImg, description);
      })
      .catch(err => {
        // Do something for an error here
        if (err.message == "Failed to fetch") {
          document.getElementById('warning').classList.remove('hidden');
          document.getElementById('warning').innerHTML = " <p> Sorry we couldn't get the data, check your internet conection and try again </p>";
         } else {
          document.getElementById('warning').classList.remove('hidden');
          document.getElementById('warning').innerHTML = " <p> Sorry we couldn't get your location, check your spelling and try again </p>";
         }     
      })
    
  }




