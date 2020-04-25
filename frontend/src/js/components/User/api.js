import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import config from 'config';

const getSettings = async (_, googleId) => {
  if (!googleId) {
    return {};
  }
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

const queryOptions = {
  staleTime: 5000,
  refetchOnWindowFocus: false,
  retry: 0,
};

export default {
  useGetKeys: () => useQuery('keys', getKeys, queryOptions),
  useGetSettings: (userGoogleId) => useQuery(['settings', userGoogleId], getSettings, queryOptions),
  usePostSettings: () => useMutation(postSettings, queryOptions),
};
