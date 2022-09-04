import React, { useContext } from 'react'
import Forecast from '../Components/Forecast'
import WeatherContext from '../Contexts/WeatherContext'
import { pmtotf, findDay, today } from '../Utils';
function Side() {
    const data = useContext(WeatherContext);
    
    return (
        <div className='lg:w-1/4 sm:w-full h-[100vh] flex justify-center flex-col items-center bg-[#171717]'>

            <div className='w-full'>
                <div className="bg-[#090909] rounded-lg m-4 p-4 text-xl capitalize">
                    <div className='flex justify-between border-b'>
                        <span>{data.weatherInfo.city}</span>
                        <span>{today()}</span>
                    </div>
                    <div className='text-[60px] leading-[60px]'>{Math.trunc(data.weatherInfo.today.temp_c)}°</div>
                </div>
                {data.weatherInfo.days.map((info, index) => (
                    <Forecast key={index} code={info.day.condition.code} day={findDay(index)} text={info.day.condition.text} avgtemp={info.day.maxtemp_c} mintemp={info.day.mintemp_c} />
                ))}
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