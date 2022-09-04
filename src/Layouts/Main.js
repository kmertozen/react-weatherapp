import React, { useState, useEffect } from 'react';
import { convertCityName } from '../Utils'
import Side from './Side'
import Body from './Body'
import WeatherContext from '../Contexts/WeatherContext'
function Main() {
  const axios = require("axios");
  const [city, setCity] = useState("istanbul")
  const [weatherInfo, setWeatherInfo] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    console.log(city)
    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
      params: { q: convertCityName(city), days: '3', lang: 'tr' },
      headers: {
        'X-RapidAPI-Key': '74d41d539fmsh1d803674dfa238cp1d18c8jsnbb262e61059b',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };
    axios.request(options)
      .then(response => {
        console.log(response.data);
        setWeatherInfo({
          city: city,
          today: response.data.current,
          days: response.data.forecast.forecastday,
          desc: response.data.current.condition.text,
        })
        setIsLoading(true)
      })
      .catch(error => {
        console.error(error);
      });
  }, [axios, city])

  const renderCity = (cityComponent, cityData) => {
    cityComponent.props.key = cityData.id;
    if (city === cityData.name) {
      cityComponent.props["data-selected"] = true
    }
    return (cityComponent)
  };

  const handleClick = (cityData) => {
    setCity(cityData.name)
  }

  const data = {
    city,
    weatherInfo,
    setWeatherInfo,
    renderCity,
    handleClick
  }
  return (
    <WeatherContext.Provider value={data}>
      {isLoading &&
        <div className="flex lg:flex-row sm:flex-col ">
          <Side />
          <Body />
        </div>
      }
    </WeatherContext.Provider>

  )
}

export default Main