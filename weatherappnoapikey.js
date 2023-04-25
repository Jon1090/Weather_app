
let zip = document.getElementById("zip");

/* zip.addEventListener("input", (event) => {
    zip.setCustomValidity("")
    if (zip.validity.patternMismatch) {
        zip.setCustomValidity("Enter a 5 digit zip code");
        zip.reportValidity();
    } else {
        zip.reportValidity();
    }
}) */


function getWeather() {
    if (document.getElementById("zip").value.length != 5) {
        alert('Please enter a 5 digit zip code');
        return;
    } 
    if (isNaN(document.getElementById("zip").value)) {
        alert('Zip code must not contain lettes');
        return;
    }
        else {
    try {
        let zip = document.getElementById('zip').value;
        //insert your api key on the next line in place of "YOURAPIKEYHERE"
        fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=YOURAPIKEYHERE, {mode: 'cors'})
            .then(function(response) {
                return response.json();
        })
            .then(function(response) {
                console.log(response);

                let city = response.name;
                let weatherDescription = response.weather[0].description;
                let curTemp = parseInt(response.main.temp);
                curTemp = Math.round(1.8*(curTemp-273) + 32); //convert kelvin to f
                let feelsLike = parseInt(response.main.feels_like);
                feelsLike = Math.round(1.8*(feelsLike-273) + 32); // convert kelvin to f
                let humidity = response.main.humidity;
                let wind = Math.round(parseInt(response.wind.speed)*(2.24)); //convert m/s to mph

                document.getElementById("city").innerText = `Weather for ${city}: ${weatherDescription}.`;
                document.getElementById("curTemp").innerText = `Current temperature: ${curTemp}°f. `;
                document.getElementById("feelsLike").innerText = `Feels like: ${feelsLike}°f.`;
                document.getElementById("humidity").innerText = `Humidity: ${humidity}%`;
                document.getElementById("wind").innerText = `Wind: ${wind} MPH`;
                document.getElementById("weatherWrapper").classList.remove("hiddenUntilZipInput");
                
        }); 
    } catch (error) {
            console.log(error);
        }
    }
}


