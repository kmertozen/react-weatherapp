import React, { useContext } from 'react'
import TurkeyMap from 'turkey-map-react'
import WeatherContext from '../Contexts/WeatherContext'
import WeatherIcon from '../Components/WeatherIcon';
function Body() {
    const data = useContext(WeatherContext);
    return (
        <div className='w-3/4 m-auto flex flex-col'>
            <div>
                <TurkeyMap showTooltip onClick={(cityData) => data.handleClick(cityData)} cityWrapper={data.renderCity} customStyle={{ idleColor: "rgb(145 145 145)", hoverColor: "#569434" }} />
            </div>
            <div className='grid grid-cols-8 gap-4 text-center bg-[#090909] p-4'>
                {data.weatherInfo && data.weatherInfo.days[0].hour.filter(info => info.time.substr(11, 2) % 3 === 2).map((info, index) => {
                    return (
                        <div className='flex flex-col' key={index}>
                            <span className='text-lg border-b'>{info.time.substr(11, 5)}</span>
                            <span>{Math.trunc(info.temp_c)}°</span>
                            <WeatherIcon id={info.condition.code} />
                            <span><i className='wi wi-wind-direction' /> {info.wind_kph} km/s</span>
                        </div>)
                })}
            </div>
        </div>
    )
}

export default Body