import React from 'react'

function WeatherIcon({id}) {
    
    let weatherClass = "wi-day-sunny";
    if(id===1003||id===1006||id===1009) weatherClass="wi-cloud"; 
    if (id === 1030) weatherClass = "wi-fog"; 
    if (id === 1063) weatherClass = "wi-sprinkle";
    if (id >=1189 && id <= 1195) weatherClass = "wi-rain-wind";    
    if (id >=1210 && id <= 1225) weatherClass = "wi-snow";    


  return (
    <i className={"wi "+weatherClass}/>
    )
}

export default WeatherIcon