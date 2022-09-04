import { useState, useEffect } from 'react';
import WeatherContext from './Store/WeatherContext'
import Main from './Layouts/Main'
import { convertCityName } from './Utils'

function App() {
  const axios = require("axios");
  const [weatherInfo, setWeatherInfo] = useState()
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
      params: { q: "istanbul", days: '3', lang: 'tr' },
      headers: {
        'X-RapidAPI-Key': '74d41d539fmsh1d803674dfa238cp1d18c8jsnbb262e61059b',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };
    axios.request(options)
      .then(response => {
        console.log(response.data);
        setWeatherInfo({
          city: 'istanbul',
          today: response.data.current,
          days: response.data.forecast.forecastday,
          desc: response.data.current.condition.text,
        })
        setIsLoading(true)
      })
      .catch(error => {
        console.error(error);
      });
  }, [axios])

  const renderCity = (cityComponent, cityData) => {
    cityComponent.props.key = cityData.id;
    if (data.weatherInfo.city === cityData.name) {
      cityComponent.props["data-selected"] = true
    }
    return (cityComponent)
  };
  const handleClick = (cityData) => {
    const city = convertCityName(cityData.name)
    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
      params: { q: city, days: '3', lang: 'tr' },
      headers: {
        'X-RapidAPI-Key': '74d41d539fmsh1d803674dfa238cp1d18c8jsnbb262e61059b',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };

    axios.request(options)
      .then(response => {
        data.setWeatherInfo({
          city: cityData.name,
          today: response.data.current,
          days: response.data.forecast.forecastday,
          desc: response.data.current.condition.text,
        })

      })
      .catch(error => {
        console.error(error);
      });
  }
  const data = {
    weatherInfo,
    setWeatherInfo,
    renderCity,
    handleClick
  }

  return (
    <WeatherContext.Provider value={data}>
      {isLoading && <Main />}
    </WeatherContext.Provider>


  );
}

export default App;
