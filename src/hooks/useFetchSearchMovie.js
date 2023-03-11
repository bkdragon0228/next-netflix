import { useQuery } from "react-query";
import axios from "../../pages/api/axios";

const fetchSearchMovie = async (title) => {
  try {
    const responce = await axios.get(
      `/search/multi?include_adult-false&query=${title}`
    );

    const results = await responce.data.results;
    return results;
  } catch (err) {
    throw err;
  }
};

export const useFetchSearchMovie = (title) => {
  return useQuery({
    queryKey: ["getSearchedMovie"],
    queryFn: () => fetchSearchMovie(title),
  });
};
