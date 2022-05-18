import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = () => {
  const [cityWeatherData, setCityWeatherData] = useState('');
  const [pendingRequest, setPendingRequest] = useState(false);
  const [requestError, setRequestError] = useState(false);

  const handleCityChange = useCallback((city) => {
    setRequestError(false);
    setPendingRequest(true);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4e7a7169ccca411da2db9f35a8da82db&units=metric`).then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          const weatherData = {
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].main,
          };
          setPendingRequest(false);

          setCityWeatherData(weatherData);
        });
      } else {
        setRequestError(true);
        setPendingRequest(false);
        setCityWeatherData('');
      }
    });
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      {cityWeatherData && <WeatherSummary {...cityWeatherData} />}
      {pendingRequest && <Loader />}
      {requestError && <ErrorBox />}
    </section>
  );
};

export default WeatherBox;
