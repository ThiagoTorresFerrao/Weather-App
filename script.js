const apiKey = "2d92f55cef03f638ba0d0cd8358c58b1";     /*   TESTE DEPOIS APAGAR OU PODE ALTERAR A KEY   */

document.addEventListener("DOMContentLoaded", () => {
  getLocationWeather(); // chama ao abrir o app
});

function getWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br&units=metric`;

  fetchWeather(url);
}

function getWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=pt_br&units=metric`;

  fetchWeather(url);
}

function fetchWeather(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Cidade não encontrada.");
      }
      return response.json();
    })
    .then(data => showWeather(data))
    .catch(error => {
      document.getElementById("weatherResult").innerHTML = `<p>${error.message}</p>`;
    });
}

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Digite o nome de uma cidade.");
    return;
  }
  getWeatherByCity(city);
}

function showWeather(data) {
  const result = document.getElementById("weatherResult");

  const content = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p><strong>Temperatura:</strong> ${data.main.temp}°C</p>
    <p><strong>Clima:</strong> ${data.weather[0].description}</p>
    <p><strong>Umidade:</strong> ${data.main.humidity}%</p>
    <p><strong>Vento:</strong> ${data.wind.speed} km/h</p>
  `;

  result.innerHTML = content;
}

function getLocationWeather() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        getWeatherByCoords(latitude, longitude);
      },
      error => {
        document.getElementById("weatherResult").innerHTML =
          "<p>Não foi possível obter sua localização. Pesquise uma cidade.</p>";
      }
    );
  } else {
    document.getElementById("weatherResult").innerHTML =
      "<p>Geolocalização não suportada no seu navegador.</p>";
  }
}
