function initMap() {
    var input = document.querySelector('.select-location');
    var autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        if (!place) {
            console.log('Place not found');
            return;
        }

        const latitude = place.geometry.location.lat();
        const longitude = place.geometry.location.lng();

        // API call here
        fetch('/weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                latitude: latitude,
                longitude: longitude 
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setvalues(data.data)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
}

function setvalues(data){
    let currentWeather = document.querySelector(".currentWeather")
    let locationValue = document.querySelector(".locationValue")
    let windValue = document.querySelector(".windValue")
    let temperatureValue = document.querySelector(".temperatureValue")
    let percipValue = document.querySelector(".percipValue")

    locationValue.innerHTML = data.location.name + ' | ' + data.location.region 
    currentWeather.innerHTML = data.current.condition.text

    windValue.innerHTML = `${data.current.wind_mph} MPH`
    temperatureValue.innerHTML = `${data.current.temp_c} C`
    percipValue.innerHTML = `${data.current.precip_mm} mm`


}