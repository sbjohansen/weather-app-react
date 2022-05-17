import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';

const WeatherBox = () => {
  const [cityWeatherData, setCityWeatherData] = useState('');

  const handleCityChange = useCallback((city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4e7a7169ccca411da2db9f35a8da82db&units=metric`)
      .then((res) => res.json())
      .then((data) => {
        const weatherData = {
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main,
        };

        setCityWeatherData(weatherData);
      });
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      <WeatherSummary {...cityWeatherData } />
      <Loader />
    </section>
  );
};

export default WeatherBox;
