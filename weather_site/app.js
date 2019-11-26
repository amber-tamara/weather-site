window.addEventListener("load", () =>  {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimeZone = document.querySelector('.location-timezone');
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
          console.log(data);
          const {temperature, summary} = data.currently;
          //Set DOM Elements from the API
          temperatureDegree.textContent = temperature;
      });   
    
    });

    }
});