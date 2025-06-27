const apiKey = "ecf65be985adab954658473f461921b0";

function getWeather() {
  const city = document.getElementById("cityInput").value;

  if (!city) {
    alert("Digite o nome de uma cidade.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Cidade não encontrada.");
      }
      return response.json();
    })
    .then(data => {
      showWeather(data);
    })
    .catch(error => {
      document.getElementById("weatherResult").innerHTML = `<p>${error.message}</p>`;
    });
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
