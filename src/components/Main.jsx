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
    const API_KEY = "c16060cd6497938e0dc8543523ab8635";

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            .then((response) => response.json())
            .then((data) => setWeather(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, [city]); // Runs when 'city' changes

    const handleSearch = () => {
        const input = document.querySelector("input").value;
        if (input) {
            setCity(input);
        }
    };
    
    return (
      <main className="main-container container">
        <div className="card">
            <div className="search">
                <input type="text" placeholder="Enter city name..." spellCheck="false"/>
                <button><img src={searchImage} alt="search icon" /></button>
            </div>
            <div className="weather">
                <img src={sunImage} className="weather-icon" alt="sun" />
                <h1 className='temp' >14 °C</h1>
                <h2 className="city">Erlangen</h2>
                <div className='details' >
                    <div className="col">
                        <img src={humidityImage} alt="humidity" />
                        <div>
                            <p className='humidity' >50%</p>
                            <p>Humidity</p>
                        </div>
                    </div>

                    <div className="col">
                        <img src={windyImage} alt="wind" />
                        <div>
                            <p className='wind' >15 km/h</p>
                            <p>Wind Speed</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>


      </main>
    );
  }
  
  export default Main;