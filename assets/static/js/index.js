window.addEventListener(`load`, () => {
  let long = null;
  let lat = null;
  const temperatureDescription = document.querySelector(
      `.temperature-description`
  );
  const temperatureDegree = document.querySelector(`.temperature-degree`);
  const locationTimezone = document.querySelector(`.location-timezone`);

  // console.log(window.navigator);

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
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          // Set Icon
          setIcons(icon, document.querySelector(`.icon`));
        });
    });
  }

  function setIcons(icon, iconId) {
    const skycons = new Skycons({color: `white`});
    const currentIcon = icon.replace(/-/g, `_`).toUpperCase();
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
  }
});
