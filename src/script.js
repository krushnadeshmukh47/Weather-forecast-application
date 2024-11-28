let cityInput = document.getElementById('city_input'),
    searchBtn = document.getElementById('searchBtn'),
    locationBtn = document.getElementById('locationBtn'),
    api_key = '804aafeb94ce4493aa5e6b898fae0017',
    currentWeatherCard = document.querySelectorAll('.weather-left .card')[0],
    fiveDaysForecastCard = document.querySelector('.day-forecast'),
    aqiCard = document.querySelectorAll('.highlights .card')[0],
    sunriseCard = document.querySelectorAll('.highlights .card')[1],
    humidityVal = document.getElementById('humidityVal'),
    pressureVal = document.getElementById('pressureVal'),
    visibilityVal = document.getElementById('visibilityVal'),
    windSpeedVal = document.getElementById('windSpeedVal'),
    feelsVal = document.getElementById('feelsVal'),
    hourlyForecastCard = document.querySelector('.hourly-forecast'),
    aqiList = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];

function getWeatherDetails(name, lat, lon, country, state) {
    let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`,
        WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`,
        AIR_POLLUTION_API_URL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`,
        days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ],
        months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];

    fetch(AIR_POLLUTION_API_URL).then(res => res.json()).then(data=>{
        let {co, no, no2, o3, so2, pm2_5, pm10, nh3} = data.list[0].components;
        aqiCard.innerHTML =`
        <div class="card-head flex justify-between mb-10">
                            <p class="text-sm text-gray-400">Air Quality Index</p>
                            <div class="air-index aqi-${data.list[0].main.aqi}">${aqiList[data.list[0].main.aqi - 1]}</div>
        </div>
        <div class="air-indices grid grid-cols-4 place-items-center">
            <i class="fa-regular fa-wind fa-3x"></i>
            <div class="item ">
                <p class="text-sm text-gray-400">PM2.5</p>
                <h2 class="text-2xl font-medium">${pm2_5}</h2>
            </div>
            <div class="item">
                <p class="text-sm text-gray-400">PM10</p>
                <h2 class="text-2xl font-medium">${pm10}</h2>
            </div>
            <div class="item">
                <p class="text-sm text-gray-400">SO2</p>
                <h2 class="text-2xl font-medium">${so2}</h2>
            </div>
            <div class="item">
                <p class="text-sm text-gray-400">CO</p>
                <h2 class="text-2xl font-medium">${co}</h2>
            </div>
            <div class="item">
                <p class="text-sm text-gray-400">NO</p>
                <h2 class="text-2xl font-medium">${no}</h2>
            </div>
            <div class="item">
                <p class="text-sm text-gray-400">NO2</p>
                <h2 class="text-2xl font-medium">${no2}</h2>
            </div>
            <div class="item">
                <p class="text-sm text-gray-400">NH3</p>
                <h2 class="text-2xl font-medium">${nh3}</h2>
            </div>
            <div class="item">
                <p class="text-sm text-gray-400">O3</p>
                <h2 class="text-2xl font-medium">${o3}</h2>
            </div>
        </div>`;
    }).catch(()=>{
        alert('Failed to fetch Air Quality Index.')
    });

    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
        let date = new Date();
        currentWeatherCard.innerHTML = `
            <div class="current-weather flex justify-between items-center">
                        <div class="details">
                            <p class="text-white">Now</p>
                            <h2 class="text-3xl font-medium">${(data.main.temp - 273.15).toFixed(2)}&deg;C</h2>
                            <p class="text-white">${data.weather[0].description}</p>
                        </div>
                        <div class="weather-icon">
                            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
                        </div>
                    </div>
                    <hr class="mb-2.5">
                    <div class="card-footer">
                    <p class="text-sm mb-3"><i class="fa-light fa-calender"></i> ${days[date.getDay()]}, ${date.getDate()},
                    ${months[date.getMonth()]} ${date.getFullYear()} </p>
                        <p class="text-sm mb-3"><i class="fa-light fa-location-dot"></i> ${name}, ${country}</p>
            </div>
        `;
        let {sunrise, sunset} = data.sys,
        {timezone, visibility} = data,
        {humidity, pressure, feels_like} = data.main,
        {speed} = data.wind,
        sRiseTime = moment.utc(sunrise, 'X').add(timezone, 'seconds').format('hh:mm A'),
        sSetTime = moment.utc(sunset, 'X').add(timezone, 'seconds').format('hh:mm A');
        sunriseCard.innerHTML = `
            <div class="card-head flex justify-between mb-2.5">
                            <p class="text-sm text-gray-400">Sunrise & Sunset</p>
                        </div>
                        <div class="sunrise-sunset grid grid-cols-2">
                            <div class="item flex items-center gap-2.5">
                                <div class="icon">
                                    <i class="fa-light fa-sunrise fa-4x"></i>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-400">Sunrise</p>
                                    <h2 class="text-2xl font-medium">${sRiseTime}</h2>
                                </div>
                            </div>
                            <div class="item flex items-center gap-2.5">
                                <div class="icon">
                                    <i class="fa-light fa-sunset fa-4x"></i>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-400">Sunset</p>
                                    <h2 class="text-2xl font-medium">${sSetTime}</h2>
                                </div>
                            </div>
                        </div>
                        `;
                        humidityVal.innerHTML = `${humidity}%`;
                        pressureVal.innerHTML = `${pressure}hPa`;
                        visibilityVal.innerHTML = `${visibility/ 1000}km`;
                        windSpeedVal.innerHTML = `${speed}m/s`;
                        feelsVal.innerHTML = `${(feels_like - 273.15).toFixed(2)}&deg;C`;
    }).catch(() => {
        alert('Failed to fetch current weather');
    });


    fetch(FORECAST_API_URL).then(res => res.json()).then(data => {
        let hourlyForecast = data.list;
        hourlyForecastCard.innerHTML = '';
        for(i = 0; i<=7; i++){
            let hrForecastDate = new Date(hourlyForecast[i].dt_txt);
            let hr = hrForecastDate.getHours();
            let a = 'PM';
            if(hr < 12) a = 'AM';
            if(hr == 0) hr = 12;
            if(hr > 12) hr = hr - 12;
            hourlyForecastCard.innerHTML += `
                <div class="card bg-[#2a2b2d] p-4 rounded-lg mb-4 text-center flex flex-col items-center">
                        <p class="text-sm text-gray-400">${hr} ${a}</p>
                        <img src="https://openweathermap.org/img/wn/${hourlyForecast[i].weather[0].icon}.png" alt="">
                        <p class="text-sm text-gray-400">${(hourlyForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</p>
                    </div>
            `;
        }
        let uniqueForecastDays = [];
        let fiveDaysForecast = data.list.filter(forecast => {
            let forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });
        fiveDaysForecastCard.innerHTML = '';
        for (i = 1; i < fiveDaysForecast.length; i++) {
            let date = new Date(fiveDaysForecast[i].dt_txt);
            fiveDaysForecastCard.innerHTML += `
            <div class="forecast-item grid grid-cols-3 place-items-center mb-4">
                            <div class="icon-wrapper flex items-center">
                                <img src="https://openweathermap.org/img/wn/${fiveDaysForecast[i].weather[0].icon}.png" alt="" srcset="">
                                <span>${(fiveDaysForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</span>
                            </div>
                            <p class="text-sm text-gray-400">${date.getDate()} ${months[date.getMonth()]}</p>
                            <p class="text-sm text-gray-400">${days[date.getDay()]}</p>
                        </div>
                        `;
        }
    }).catch(() => {
        alert('Failed to fetch weather forecast');
    });
}

function saveCityToLocalStorage(cityName) {
    let cities = JSON.parse(localStorage.getItem('recentCities')) || [];
    if (!cities.includes(cityName)) {
        cities.push(cityName);
        if (cities.length > 5) cities.shift();
        localStorage.setItem('recentCities', JSON.stringify(cities));
    }
}

function getCityCoordinates() {
    let cityName = cityInput.value.trim();
    cityInput.value = '';
    if (!cityName){
        alert("Please enter a city name before searching.");
    };
    let GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        if (data.length === 0) {
            alert('City not found. Please check the spelling and try again.');
            return;
        }
        let { name, lat, lon, country, state } = data[0];
        saveCityToLocalStorage(name); // Save city to local storage
        updateRecentCitiesDropdown(); // Refresh dropdown
        getWeatherDetails(name, lat, lon, country, state);
    }).catch(() => {
        alert(`Failed to fetch coordinates of ${cityName}`);
    });
}

function updateRecentCitiesDropdown() {
    let cities = JSON.parse(localStorage.getItem('recentCities')) || [];
    let recentCitiesDropdown = document.getElementById('recentCities');
    recentCitiesDropdown.innerHTML = `<option value="" disabled selected>Recent searches:</option>`;
    cities.forEach(city => {
        let option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        recentCitiesDropdown.appendChild(option);
    });
}

document.getElementById('recentCities').addEventListener('change', function () {
    let cityName = this.value;
    let GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
    fetch(GEOCODING_API_URL)
        .then(res => res.json())
        .then(data => {
            let { name, lat, lon, country, state } = data[0];
            getWeatherDetails(name, lat, lon, country, state);
        })
        .catch(() => {
            alert(`Failed to fetch coordinates of ${cityName}`);
        });
});

document.getElementById('recentCities').addEventListener('change', function () {
    let cityName = this.value;
    let GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
    fetch(GEOCODING_API_URL)
        .then(res => res.json())
        .then(data => {
            let { name, lat, lon, country, state } = data[0];
            getWeatherDetails(name, lat, lon, country, state);
        })
        .catch(() => {
            alert(`Failed to fetch coordinates of ${cityName}`);
        });
});

function getUserCoordinates(){
    navigator.geolocation.getCurrentPosition(position=> {
        let {latitude, longitude} = position.coords;
        let REVERSE_GEOCODING_URL =`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`;

        fetch(REVERSE_GEOCODING_URL).then(res => res.json()).then(data => {
            let {name,country,state} = data[0];
            getWeatherDetails(name,latitude,longitude,country,state);
        }).catch(() =>{
            alert('Failed to fetch user coordinates.');
        });
    }, error =>{
        if(error.code === error.PERMISSION_DENIED){
            alert('Geolocation permission denied. Please reset location permission to grant access again.');
        }
    }
);
}
window.addEventListener('load', () => {
    getUserCoordinates();
    updateRecentCitiesDropdown();
});

searchBtn.addEventListener('click', getCityCoordinates);
locationBtn.addEventListener('click', getUserCoordinates);
cityInput.addEventListener('keyup', e => e.key === 'Enter' && getCityCoordinates());
window.addEventListener('load', getUserCoordinates);