// Get weather using latitude & longitude
function getWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weather = data.current_weather;

            document.getElementById("weatherResult").innerHTML = `
                <h3>🌡️ Temperature: ${weather.temperature}°C</h3>
                <p>💨 Wind Speed: ${weather.windspeed} km/h</p>
                <p>🧭 Wind Direction: ${weather.winddirection}°</p>
            `;
        })
        .catch(error => {
            alert("Error fetching weather data");
        });
}

// Get weather by user's current location
function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeather(lat, lon);
        });
    } else {
        alert("Geolocation not supported");
    }
}

// Get weather by city name
function getWeatherByCity() {
    const city = document.getElementById("cityInput").value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

    fetch(geoUrl)
        .then(response => response.json())
        .then(data => {
            if (!data.results) {
                alert("City not found");
                return;
            }
            const lat = data.results[0].latitude;
            const lon = data.results[0].longitude;
            getWeather(lat, lon);
        });
}
