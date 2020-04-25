import { useQuery } from 'react-query';
import axios from 'axios';

const APIkey = 'bcf8511bbcf28b6196659c38256e5593';

const getWeather = async (_, location) => {
  const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${APIkey}&units=imperial`);
  return data;
};

const getForecast = async (_, location) => {
  const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${location}&APPID=${APIkey}&units=imperial&cnt=7`);
  return data;
};

const queryOptions = {
  staleTime: 5000,
  refetchOnWindowFocus: false,
  retry: 0,
};

export default {
  useGetWeather: (location) => useQuery(['weather', location], getWeather, queryOptions),
  useGetForecast: (location) => useQuery(['forecast', location], getForecast, queryOptions),
};
