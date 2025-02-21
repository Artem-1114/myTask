const form = document.querySelector('#form');
const input = document.querySelector('.form__input');
const API_key = '96805c4fbfc0fb7e79b20e5c6a7044fc';

form.onsubmit = submitHandler;

async function submitHandler(event) {
    event.preventDefault();
    if (!input.value.trim()) {
        alert('Enter city name');
        return;// перевірка на веденя даних
    }

    const cityInfo = await getGeo(input.value.trim());
    if (!cityInfo || cityInfo.length === 0) {
        alert('City not found');
        return;
    }

    const weatherInfo = await getWeather(cityInfo[0].lat, cityInfo[0].lon);
    const weatherData = {
        name: weatherInfo.name,
        temp: weatherInfo.main.temp,
        humidity: weatherInfo.main.humidity,
        wind: weatherInfo.wind.speed,
        main: weatherInfo.weather[0].main,// викликаємл елементи основної інформації
    };
    renderWeatherData(weatherData);
}

async function getGeo(name) {
    const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_key}`;
    const response = await fetch(geoURL);
    return await response.json();// назва міста
}

async function getWeather(lat, lon) {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_key}`;
    const response = await fetch(weatherURL);
    return await response.json();// визначаємо довготу і широту міста
}

function renderWeatherData(data) {// функія яка замінює вміст елементів
    const temp = document.querySelector('.weather__temp');
    const name = document.querySelector('.weather__city');
    const humidity = document.querySelector('#humidity');
    const wind = document.querySelector('#wind');

    temp.innerText = Math.round(data.temp) + '°с';
    name.innerText = data.name;
    humidity.innerText = data.humidity + '%';
    wind.innerText = data.wind + ' km/h';

    const icons = document.querySelectorAll('.form__icon');
    icons.forEach(icon => icon.classList.add('hidden'));

    switch (data.main) {
        case 'Clear':
            document.querySelector('.clear').classList.remove('hidden');
            break;
        case 'Clouds':
            document.querySelector('.clouds').classList.remove('hidden');
            break;
        case 'Rain':
            document.querySelector('.rain').classList.remove('hidden');
            break;
        case 'Snow':
            document.querySelector('.snow').classList.remove('hidden');
            break;
        default:
            document.querySelector('.drizzle').classList.remove('hidden');
            break;
    }
}// зміню картиночку .... Можна було і більше картинок накидати в принцепі під день ніч і тд...










