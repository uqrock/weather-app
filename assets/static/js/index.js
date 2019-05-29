window.addEventListener(`load`, () => {
  let long = null;
  let lat = null;

  const tempDegree = document.querySelector(`.temp-degree`);
  const locationTimezone = document.querySelector(`.location-timezone`);
  const tempSection = document.querySelector(`.degree-section`);
  const tempSpan = document.querySelector(`.temp-value`);
  const tempDescription = document.querySelector(`.temp-description`);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = `https://cors-anywhere.herokuapp.com/`;
      const api = `${proxy}https://api.darksky.net/forecast/003a6e35904b594ba2dc27c4355d2b08/${lat},${long}`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const {temperature, summary, icon} = data.currently;
          // Set Dom Elements from API
          tempDegree.textContent = temperature;
          tempDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          tempSpan.textContent = `F`;

          toggleTempValue(temperature); // Change temp to Celseius/Farenheit
          setIcons(icon, document.querySelector(`.icon`)); // Set Icon
        });
    });
  }

  function toggleTempValue(temp) {
    let celsius = (temp - 32) * (5 / 9);

    tempSection.addEventListener(`click`, () => {
      if (tempSpan.textContent === `F`) {
        tempSpan.textContent = `C`;
        tempDegree.textContent = Math.floor(celsius);
      } else {
        tempSpan.textContent = `F`;
        tempDegree.textContent = temp;
      }
    });
  }

  function setIcons(icon, iconId) {
    const skycons = new Skycons({color: `white`});
    const currentIcon = icon.replace(/-/g, `_`).toUpperCase();
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
  }
});
