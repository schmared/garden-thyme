import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import config from 'config';

const getSettings = async (_, googleId) => {
  const { data } = await axios.get(
    `${config.apiBaseRoute}settings?userId=${googleId}`,
    // { headers: { "Authorization": userAuth }} // Not working in the api yet
  );
  return data;
};

const postSettings = (settings) => axios.post(`${config.apiBaseRoute}settings`, settings);

const getKeys = async () => {
  const { data } = await axios.get(`${config.apiBaseRoute}keys`);
  return data;
};

export default {
  useGetKeys: () => useQuery('keys', getKeys),
  useGetSettings: (userGoogleId) => useQuery(['settings', userGoogleId], getSettings),
  usePostSettings: () => useMutation(postSettings),
};
