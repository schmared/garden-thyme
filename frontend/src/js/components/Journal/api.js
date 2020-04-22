import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import config from 'config';

const getActionTypes = async () => {
  const { data } = await axios.get(
    `${config.apiBaseRoute}actionType`,
    // { headers: { "Authorization": userAuth }} // Not working in the api yet
  );
  return Object.keys(data).map((k) => ({ id: data[k], value: k })).filter((t) => t.value !== 'None');
};

const postEntry = (entry) => axios.post(`${config.apiBaseRoute}journal`, entry);

const getEntries = async (_, userId, date) => {
  const { data } = await axios.get(`${config.apiBaseRoute}journal?userId=${userId}&date=${date}`);
  return data;
};

export default {
  useGetActionTypes: () => useQuery('actionTypes', getActionTypes),
  useGetEntries: (userId, date) => useQuery(['journal-entry', userId, date], getEntries),
  usePostEntry: () => useMutation(postEntry),
};
