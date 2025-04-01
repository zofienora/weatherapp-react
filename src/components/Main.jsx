import searchImage from '../assets/icons8-suche-50.png';
import cloudImage from '../assets/cloud.png';
import sunImage from '../assets/sun.png';
import rainImage from '../assets/rain.png';
import snowImage from '../assets/snow.png';
import windyImage from '../assets/windy.png';
import cloudyImage from '../assets/cloudy.png';
import humidityImage from '../assets/humidity.png';
import { useState, useEffect } from "react";


function Main() {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState("Erlangen"); // Default city
    const [inputValue, setInputValue] = useState(""); // To store input field value
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            .then((response) => response.json())
            .then((data) => setWeather(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, [city]); // Runs when 'city' changes

    const handleSearch = () => {
        if (inputValue) {
            setCity(inputValue);
            setInputValue(""); // Clear input after search
        }
    };

    // Handle Enter key press in input field
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    const getWeatherImage = () => {
        if (!weather || !weather.weather || weather.weather.length === 0) {
            return cloudyImage; // Default image if no data
        }
    
        const condition = weather.weather[0].main;
        console.log("Weather condition:", condition); // Debugging log
    
        switch (condition) {
            case "Clear":
                return sunImage;
            case "Clouds":
                return cloudImage;
            case "Rain":
                return rainImage;
            case "Snow":
                return snowImage;
            case "Wind":
                return windyImage;
            default:
                return cloudyImage;
        }
    };
    
    return (
      <main className="main-container container">
        <div className="card">
            <div className="search">
                <input 
                    type="text" 
                    placeholder="Enter city name..." 
                    spellCheck="false"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} // Updates state
                    onKeyDown={handleKeyDown} // Listens for Enter key
                />
                <button onClick={handleSearch}><img src={searchImage} alt="search icon" /></button>
            </div>
        

            {weather && weather.main && (
                <div className="weather">
                    <img src={getWeatherImage()} className="weather-icon" alt="weather icon" />
                    <h1 className='temp'>{Math.round(weather.main.temp)}°C</h1>
                    <h2 className="city">{weather.name}</h2>
                    <div className='details'>
                        <div className="col">
                            <img src={humidityImage} alt="humidity" />
                            <div>
                                <p className='humidity'>{weather.main.humidity}%</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                        <div className="col">
                            <img src={windyImage} alt="wind" />
                            <div>
                                <p className='wind'>{Math.round(weather.wind.speed)} km/h</p>
                                <p>Wind Speed</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        <p className="icons">Icons von <a target="_blank" href="https://icons8.com">Icons8</a></p> 
        </div>
        
      </main>
);
}
  

export default Main;