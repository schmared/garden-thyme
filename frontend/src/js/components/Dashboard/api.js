import { useQuery } from 'react-query';
import axios from 'axios';
import config from 'config';


const getSuggestions = async (_, userId, typeName) => {
  const { data } = await axios.get(`${config.apiBaseRoute}suggestions?userId=${userId}&actionType=${typeName}`);
  return data;
};

const queryOptions = {
  staleTime: 5000,
  refetchOnWindowFocus: false,
  retry: 0,
};

export default {
  useGetSuggestions: (userId, typeName) => useQuery(['suggestions', userId, typeName], getSuggestions, queryOptions),
};
