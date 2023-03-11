import { useQuery } from "react-query";
import axios from "../../pages/api/axios";

export const useFerchMovieDetail = (movieId) => {
  return useQuery({
    queryKey: ["getMovieDetail", movieId],
    queryFn: async () => {
      try {
        const responce = await axios.get(`/movie/${movieId}`);

        return responce.data;
      } catch (err) {
        throw err;
      }
    },
  });
};
