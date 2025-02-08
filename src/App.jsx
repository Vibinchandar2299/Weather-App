import { useState, useEffect } from 'react'
import './App.css'

import clearIcon from './assets/Images/clear.png';
import cloudIcon from './assets/Images/Cloud.png';
import drizzleIcon from './assets/Images/Drizzle.png';
import humidityIcon from './assets/Images/Humidity.png';
import rainIcon from './assets/Images/Rain.png';
import searchIcon from './assets/Images/Search.png';
import snowIcon from './assets/Images/Snow.png';
import windIcon from './assets/Images/Wind.png';

const WeatherDeatails = ({icon, temp, city, country, lat, log, humidity, wind}) => {
  return (
  <>
  <div className="image">
  <img src={icon} alt="Image" />
  </div>
  <div className="temp">{temp}°C</div>
  <div className="location">{city}</div>
  <div className="country">{country}</div>
  <div className="cord">
    <div>
      <span className="lat">Latitude</span>
      <span>{lat}</span>
    </div>
    <div>
      <span className="log">Longitude</span>
      <span>{log}</span>
    </div>
  </div>
  <div className="data-container">
    <div className="element">
      <img src={humidityIcon} alt="Humidity" className="icon" />
      <div className="data">
        <div className="humidity-percent">{humidity} %</div>
        <div className="text">Humidity</div>
      </div>
      </div>
      <div className="element">
      <img src={windIcon} alt="Wind" className="icon" />
      <div className="data">
        <div className="wind-percent">{wind}Km/h</div>
        <div className="text">Wind Speed</div>
      </div>
    </div>
  </div>
  </>
  );
};

function App() {
  let Api_Key = "3eb56d2fc00aa3a58436ebd30aa72f41";
  const [text, setText] = useState("Chennai");
   const [icon, setIcon] = useState(snowIcon);
   const [temp, setTemp] = useState(0);
   const [city, setCity] = useState("Chennai");
   const [country, setCountry] = useState("IN");
   const [lat, setLat] = useState(0);
   const [log, setLog] = useState(0);
   const [humidity, setHumidity] = useState(0);
   const [wind, setWind] = useState(0);
   const [cityNotFound, setCityNotFound] = useState(false);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

const weatherIconMap = {
  "01d": clearIcon,
  "01n": clearIcon,
  "02d": cloudIcon,
  "02n": cloudIcon,
  "03d": drizzleIcon,
  "03n": drizzleIcon,
  "04d": drizzleIcon,
  "04n": drizzleIcon,
  "09d": rainIcon,
  "09n": rainIcon,
  "10d": rainIcon,
  "10n": rainIcon,
  "13d": snowIcon,
  "13n": snowIcon,
};
 
   const search = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${Api_Key}&units=Metric`;

    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data.cod === "404") {
        console.error("City Not Found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }

      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon);
      setCityNotFound(false);

    } catch (error) {
      console.log("An error occured:",error.message);
      setError("An error occured while fetching the data.");
    } finally {
     setLoading(false);
    }
  };

  const handleCity = (e) => {
    setText(e.target.value);
  };
  const handleKeyDown  = (e) => {
    if (e.key ==="Enter"){
      search();
    }
  };

  useEffect (function () {
    search();
  }, []);
  return (
    <>
      <div className="container">
        <div className="input-container">
          <input type="text" className="cityInput" placeholder="Search City" onChange={handleCity} value={text} onKeyDown={handleKeyDown}/>
          <div className="search-icon" onClick={() => search()}>
            <img src={searchIcon} alt="Search" />
          </div>
        </div>
        {!loading && !cityNotFound && <WeatherDeatails  icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind}/>}

        {loading && <div classNmae="loading-message">Loading...</div>}
       {error && <div classNmae="error-message">{error}</div>}
        {cityNotFound && <div classNmae="city-not-found">City Not Found</div>}
        <p className="copyright">
          Designed By <span>Vibin</span>
        </p>
      </div>
    </>
  );
}

export default App
