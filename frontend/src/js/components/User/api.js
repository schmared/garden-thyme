import { useQuery, useMutation, queryCache } from 'react-query';
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
  usePostSettings: () => useMutation(postSettings, {
    onMutate: (user) => {
      const previousValue = queryCache.getQueryData('settings');

      queryCache.setQueryData('settings', (old) => ({
        ...user, ...old,
      }));

      return previousValue;
    },
    onError: (error, _, previousValue) => {
      console.warn(error); // eslint-disable-line no-console
      // TODO this isn't showing the old location on the map?
      queryCache.setQueryData('settings', previousValue);
    },
    onSettled: () => {
      queryCache.refetchQueries('settings');
    },
  }),
};
