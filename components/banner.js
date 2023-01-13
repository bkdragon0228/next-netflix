import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "../pages/api/axios";
import requests from "../pages/api/requests";

const BannerContainer = styled.header`
  position: relative;
  width: 100%;
  height: 448px;
  padding: 0 32px;
  background-image: url(${(props) => props.background});
  background-position: top center;
  background-size: cover;
`;

const BannerSection = styled.section`
  position: absolute;
  width: 300px;
  overflow: hidden;
  top: 50%;
  transform: translateY(-50%);
  color: white;
`;

const MovieTitle = styled.div`
  font-size: 32px;
  font-weight: bold;
`;

const MovieDescription = styled.div`
  margin-top: 16px;
`;

const ButtonWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  column-gap: 16px;
`;

const PlayBtn = styled.div`
  width: 100px;
  border: none;
  border-radius: 10px;
  background-color: white;
  padding: 16px 20px;
  color: black;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoBtn = styled.div`
  width: 200px;
  border: none;
  border-radius: 10px;
  padding: 16px 20px;
  background-color: black;
  opacity: 0.6;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Banner() {
  const [movie, setMovie] = useState([]);
  const [background, setBackground] = useState("");

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    try {
      const res = await axios.get(requests.fetchNowPlaying);
      const movieId =
        res.data.results[Math.floor(Math.random() * res.data.results.length)]
          .id;
      const { data } = await axios.get(`movie/${movieId}`, {
        params: { append_to_responce: "videos" },
      });

      setMovie(data);
      setBackground(
        "https://image.tmdb.org/t/p/original/" + data.backdrop_path
      );
    } catch (err) {
      console.log(err);
    }
  };

  const strFilter = (str, n) => {
    let filterdStr = str?.length > n ? str.substr(0, n - 1) + "..." : str;
    return filterdStr;
  };

  return (
    <BannerContainer background={background}>
      <BannerSection>
        <MovieTitle>{movie.title || movie.original_title}</MovieTitle>
        <ButtonWrapper>
          <PlayBtn>Play</PlayBtn>
          <InfoBtn>More Information</InfoBtn>
        </ButtonWrapper>
        <MovieDescription>{strFilter(movie.overview, 100)}</MovieDescription>
      </BannerSection>
    </BannerContainer>
  );
}

// export async function getStaticProps() {
//   try {
//     const res = await axios.get(requests.fetchNowPlaying);

//     console.log(res);
//     return {
//       props: { res },
//     };
//   } catch (err) {
//     console.log(err);
//   }
// }
