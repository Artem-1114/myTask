const form = document.querySelector('#form');
const input = document.querySelector('.form__input');
const API_key = '96805c4fbfc0fb7e79b20e5c6a7044fc';

form.onsubmit = submitHandler;

async function submitHandler(event) { 
    event.preventDefault();
    if (!input.value.trim()) {
        alert('Enter city name');
        return
    }
    
    
    const citeInfo = await getGeo(input.value.trim());
    
    const weatherInfo = await getWeather(citeInfo[0]['lat'], citeInfo[0] ['lon']);

    console.log(weatherInfo);
    
    console.log(weatherInfo.name);
    console.log(weatherInfo.main.temp);
    console.log(weatherInfo.main.humidity);
    console.log(weatherInfo.wind.speed);
    console.log(weatherInfo.weather[0].main);

    const weatherData = {
        name: weatherInfo.name,
        temp: weatherInfo.main.temp,
        humidity: weatherInfo.main.humidity,
        wind: weatherInfo.wind.speed,
        main: weatherInfo.weather[0].main,
    }
    renderWeatherData(weatherData);

}

async function getGeo(name) { 
    const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_key}`;
    const response = await fetch(geoURL);
    const data = await response.json();
    console.log(data);
    return data
}

async function getWeather(lat, lon) {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_key}`;
    const response = await fetch(weatherURL);
    const data = await response.json();
    console.log(data);
    return data
}


function renderWeatherData(data) { 
    const temp = document.querySelector('.weather__temp');
    const name = document.querySelector('.weather__city');
    const humidity = document.querySelector('#humidity');
    const wind = document.querySelector('#wind');

    temp.innerText = Math.round(data.temp) + '°с';
    name.innerText = data.name;
    humidity.innerText = data.humidity + '%';
    wind.innerText = data.wind + ' km/h';

    

}


