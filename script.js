const apiKey = "3372ab3a6c04115fc68812789163e1a6";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
const weatherIcon = document.querySelector(".weather-icon");
const background = document.querySelector(".background");
const typeSound = new Audio("sound fx/type.m4a");
const clickSound = new Audio("sound fx/click.m4a");
const deleteSound = new Audio("sound fx/delete.m4a");
typeSound.volume = 0.3;
deleteSound.volume = 0.3;

background.style.backgroundImage = "url('images/backgrounds/day.webp')";

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error-message").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error-message p").innerHTML =
      "city doesn't exist...?";
  } else if (response.status == 400) {
    document.querySelector(".error-message").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error-message p").innerHTML = "uh...?";
  } else {
    document.querySelector(".error-message").style.display = "none";
    document.querySelector(".weather").style.display = "flex";

    const data = await response.json();

    if ((document.querySelector(".city").innerHTML = "undefined")) {
      document.querySelector(".temp").innerHTML = "? °C";
      document.querySelector(".humidity").innerHTML = "? %";
      document.querySelector(".wind").innerHTML = "? km/h";
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML =
      Math.round(data.wind.speed * 10) / 10 + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "../images/weather icons/clouds.gif";
      background.style.backgroundImage =
        "url('../images/backgrounds/cloudy.gif')";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "../images/weather icons/clear.gif";
      background.style.backgroundImage =
        "url('../images/backgrounds/day.webp')";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "../images/weather icons/rain.gif";
      background.style.backgroundImage =
        "url('../images/backgrounds/rainy.gif')";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "../images/weather icons/drizzle.gif";
      background.style.backgroundImage =
        "url('../images/backgrounds/rainy.gif')";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "../images/weather icons/mist.gif";
      background.style.backgroundImage =
        "url('../images/backgrounds/cloudy.gif')";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "../images/weather icons/snow.gif";
      background.style.backgroundImage =
        "url('../images/backgrounds/snow.gif')";
    }
  }
}

searchButton.addEventListener("click", () => {
  checkWeather(searchInput.value);
  clickSound.currentTime = 0;
  clickSound.play();
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key !== "Backspace" && e.key !== "Enter") {
    typeSound.currentTime = 0;
    typeSound.play();
  } else if (e.key === "Backspace") {
    deleteSound.currentTime = 0;
    deleteSound.play();
  } else if (e.key === "Enter") {
    clickSound.play();
  }

  if (e.key === "Enter") {
    searchButton.click();
  }
});
