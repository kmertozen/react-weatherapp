import TurkeyMap from 'turkey-map-react';
import { useState } from 'react';
function App() {
  const axios = require("axios");
  const [temp, setTemp] = useState()
  const [city, setCity] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const handleClick = (name) => {
    const city = name.name
    const options = {
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c26f26cf3b8cddeacb893c7e07d1b7ba`,
    };

    axios.request(options)
    .then(response => {
      console.log(response.data);
      setTemp(Math.trunc(response.data.main.temp))
      setCity(name.name)
      setIsLoading(true)
    })
    .catch(error => {
      console.error(error);
    });
  }
  return (
    <div className="">
      <TurkeyMap onClick={(name) => handleClick(name)} />
      {isLoading && 
      (<h1 className="text-3xl font-bold"> sehir={city}
        <br />
        sicaklik={temp}
      </h1>)}
    </div>
  );
}

export default App;
