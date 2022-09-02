import TurkeyMap from 'turkey-map-react';
import { useState } from 'react';
function App() {
  const axios = require("axios");
  const [weatherInfo, setWeatherInfo] = useState()
  const [city, setCity] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [tooltip, setTooltip] = useState()
  const [tooltipStyle, setTooltipStyle] = useState()
  const handleClick = (name) => {
    const city = name.name
    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
      params: { q: city, days: '5', lang: 'tr' },
      headers: {
        'X-RapidAPI-Key': '74d41d539fmsh1d803674dfa238cp1d18c8jsnbb262e61059b',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };

    axios.request(options)
      .then(response => {
        console.log(response.data.forecast.forecastday);
        setWeatherInfo({
          temp: Math.trunc(response.data.current.temp_c),
          days: response.data.forecast.forecastday,
          desc: response.data.current.condition.text
        })
        setCity(name.name)
        setIsLoading(true)
      })
      .catch(error => {
        console.error(error);
      });
  }

 
  const renderTooltip = (cityComponent, cityData) => (
    <g title={cityData.name} key={cityData.id} onMouseLeave={() => setTooltipStyle({ display: "none" })} onMouseMove={(e) => cityTooltip(e, cityData.name)}>
      {cityComponent}
    </g>
  );

  const cityTooltip = (e, city) => {
    setTooltip(city)
    setTooltipStyle({
      position: "absolute",
      background: "black",
      padding: "0 15px",
      borderRadius: "4px",
      color: "white",
      left: e.pageX + 16,
      top: e.pageY - 32
    })

  }
  const days = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"]
  const day = new Date().getDay();
  const fdays = days.slice(day, days.length).concat(days.slice(0, 1))
  return (
    <div className="flex">
      <div style={tooltipStyle}>{tooltip}</div>
      <div className='w-1/3 h-screen text-center flex justify-center items-center bg-[#171717]'>
        {isLoading && (
          <h1 className="text-xl capitalize">
            {city}
            <br />
            {weatherInfo.temp}°<sup className=" leading-tight font-extralight ml-2">C</sup>
            <br />
            {weatherInfo.desc}
          </h1>
        )}
      </div>
      <div className='w-3/4 m-auto flex flex-col'>
        <div>
          <TurkeyMap onClick={(name) => handleClick(name)} cityWrapper={renderTooltip} customStyle={{ idleColor: "rgb(145 145 145)", hoverColor: "#dc3522" }} />
        </div>
        <div className='grid grid-cols-3 text-center'>
          {weatherInfo && weatherInfo.days.map((info, index) => (
            <div className='bg-[#171717] m-4 p-4' key={index}>
              {fdays[index]}<br />{info.day.condition.text}<br />{Math.trunc(info.day.avgtemp_c)}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
