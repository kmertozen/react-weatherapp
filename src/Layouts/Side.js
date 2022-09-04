import React,{useContext} from 'react'
import Forecast from '../Components/Forecast'
import WeatherContext from '../Store/WeatherContext'
import { pmtotf, findDay } from '../Utils';
function Side() {
    const data = useContext(WeatherContext);
    return (
        <div className='w-1/4 h-screen  flex justify-center flex-col items-center bg-[#171717]'>
        {(
          <div className="text-xl capitalize">
            {data.weatherInfo.city}
            <br />
            {Math.trunc(data.weatherInfo.today.temp_c)}°
          </div>
        )}
        <div className='w-full'>
          {data.weatherInfo.days.map((info, index) => (
            <Forecast key={index} code={info.day.condition.code} day={findDay(index)} text={info.day.condition.text} avgtemp={info.day.maxtemp_c} mintemp={info.day.mintemp_c} />
          ))
          }  
              <div className='bg-[#090909] m-4 rounded-lg p-4'>
                <div className='arc flex justify-between'>
                  <div>Gündoğumu  {pmtotf(data.weatherInfo.days[0].astro.sunrise)}</div><div>Günbatımı {pmtotf(data.weatherInfo.days[0].astro.sunset)}</div>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4 m-4 weather-specs'>
                <div>Hissedilen<span>{Math.trunc(data.weatherInfo.today.feelslike_c)}°</span></div>
                <div>Nem<span>{data.weatherInfo.today.humidity}%</span></div>
                <div>Yağış<span>{data.weatherInfo.days[0].hour[12].chance_of_rain}%</span></div>
                <div>Basınç<span>{data.weatherInfo.today.pressure_mb}mbar</span></div>
                <div>Rüzgar Hızı<span>{data.weatherInfo.today.wind_kph} km/s</span></div>
                <div>UV Endeksi<span>{data.weatherInfo.today.uv}</span></div>
              </div>
        </div>
      </div>
      )
}

export default Side