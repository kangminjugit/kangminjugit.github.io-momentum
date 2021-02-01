const API_KEY='dc3764259662ff90817dc39767709997';
const COORDS = 'coords';

const weatherGeoForm = document.querySelector('.js-weatherGeo');
const weatherForm = weatherGeoForm.querySelector('.js-weather');
const geoForm = weatherGeoForm.querySelector('.js-geo');

function showWeatherGeo(lat, lon){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        weatherForm.innerText = '{ '+ json.weather[0].main+ " / "+ json.main.temp+"℃";
        geoForm.innerText = 'at '+json.name +' }';
    });
}
function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    }
    saveCoords(coordsObj);
    showWeatherGeo(latitude, longitude);
}
function handleGeoError(){
    console.log("can't get geo information");
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}
function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords===null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoords);
        showWeatherGeo(parseCoords.latitude,parseCoords.longitude);
    }
}
function init(){
    loadCoords();
}
init();