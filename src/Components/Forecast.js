import React from 'react'
import WeatherIcon from './WeatherIcon'

function Forecast(props) {
    return (
       
            <div className='bg-[#090909] rounded-lg m-4 p-4 flex justify-between'>
              <div><WeatherIcon id={props.code}/> {props.day} ∙ {props.text}</div> <div> {Math.trunc(props.avgtemp)}° / {Math.trunc(props.mintemp)}°</div>
            </div>
          )  
}

export default Forecast