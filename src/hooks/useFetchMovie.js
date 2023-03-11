import { useQuery } from "react-query";
import axios from "../../pages/api/axios";

export const fetchMovies = async (fetchUrl) => {
  const res = await axios.get(fetchUrl);
  return res.data.results;
};

export const useFetchMovies = (fetchUrl, movieId) => {
  return useQuery({
    queryKey: ["getMovie", movieId],
    queryFn: () => fetchMovies(fetchUrl),
  });
};
