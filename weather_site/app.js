window.addEventListener("load", () =>  {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimeZone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;

        const proxy =  "https://cors-anywhere.herokuapp.com/";
        const api = `${proxy}https://api.darksky.net/forecast/84ca0557cdc15fc181d8a9e38195cd8b/${lat},${long}`;
       
        fetch (api)
        .then(response => {
          return response.json();
      
      })
        .then(data => {
          const {temperature, summary, icon} = data.currently;
          //Set DOM Elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimeZone.textContent = data.timezone;
          //FORMULA FOR CELSIUS
          let celsuis = (temperature - 32) * (5 / 9);

          //Set Icon
          setIcons(icon, document.querySelector(".icon"));

          //Change temperature to Celsius/farenheit
          temperatureSection.addEventListener('click', () => {
               if(temperatureSpan.textContent === "F") {
                 temperatureSpan.textContent = "C";
                 temperatureDegree.textContent = Math.floor(celsuis);
               }else {
                temperatureSpan.textContent = "F";
                temperatureDegree.textContent = temperature;
               }
          
        });
      });   
    
    });

    }
    function setIcons(icon, iconID){
      const skycons = new Skycons({color: "white"});
      const currentIcon = icon.replace(/-/g, "_").toUpperCase();
      skycons.play();
      return skycons.set(iconID, Skycons[currentIcon]);
    }
});