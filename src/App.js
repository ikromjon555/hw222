import { useState } from "react"; 
import axios from 'axios'; 
import './style.css' 
 
function App() { 
  const [city, setCity] = useState(''); 
  const [forecasts, setForecasts] = useState([]); 
  const [cityName, setCityName] = useState(''); 
  const API_KEY = '9a61f229741aa856d43699768e4fe3da'; 
 
  function getWeather() { 
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`) 
      .then((response) => { 
        const forecastList = response.data.list; 
        const dailyForecasts = forecastList.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 4); 
 
        setForecasts(dailyForecasts); 
        setCityName(response.data.city.name + ', ' + response.data.city.country); 
      }) 
      .catch(() => { 
        alert("Ошибка при получении данных о погоде."); 
      }); 
  } 
 
  return ( 
    <div id="cont"> 
      <div id="card"> 
        <div id="main"> 
          <input id="input" type="text" placeholder="Введите город" value={city} onChange={(e) => setCity(e.target.value)}  
             
          /> 
          <button onClick={getWeather} id="button">Поиск</button> 
          {cityName && <h1>{cityName}</h1>} 
          {forecasts.length > 0 && ( 
            <> 
              <h1 id="temp">{forecasts[0].main.temp}°</h1> 
              <h2 id="weather">{forecasts[0].weather[0].main}</h2> 
              <div id="hour"> 
                {forecasts.map((item, index) => ( 
                  <div key={index} id="item"> 
                    <p>{item.dt_txt.split('')[1].slice(0, 5)}</p> 
                    <p>{item.main.temp}°</p> 
                    <p>{item.weather[0].main}</p> 
                  </div> 
                ))} 
              </div> 
            </> 
          )} 
        </div> 
         
      </div> 
    </div> 
  ); 
} 
 
export default App;