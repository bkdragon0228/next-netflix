import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "../../../pages/api/axios";
import requests from "../../../pages/api/requests";

const breakpoints = [576, 768, 992, 1200];
const mq = breakpoints.map((bp) => `@media screen and (min-width : ${bp}px)`);

const BannerContainer = styled.header`
  position: relative;
  width: 100%;
  height: 448px;
  padding: 0 32px;
  background-image: url(${(props) => props.background});
  background-position: top center;
  background-size: cover;
  display: none;

  ${mq[3]} {
    display: block;
  }
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

  &:hover {
    opacity: 0.5;
  }
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

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Iframe = styled.iframe`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const VideoCancelBtn = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 16px;
  border: none;
  background-color: transparent;
  color: white;
  font-size: 50px;
  opacity: 0.2;
  transition: opacity 0.4s ease;

  &:hover {
    opacity: 1;
  }
`;
export default function Banner() {
  const [movie, setMovie] = useState([]);
  const [background, setBackground] = useState("");

  // 비디오
  const [isClicked, setIsClicked] = useState(false);

  const handlePlayBtn = () => {
    setIsClicked(true);
  };

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

  if (!isClicked) {
    return (
      <BannerContainer background={background}>
        <BannerSection>
          <MovieTitle>{movie.title || movie.original_title}</MovieTitle>
          <ButtonWrapper>
            <PlayBtn onClick={handlePlayBtn}>Play</PlayBtn>
            <InfoBtn>More Information</InfoBtn>
          </ButtonWrapper>
          <MovieDescription>{strFilter(movie.overview, 100)}</MovieDescription>
        </BannerSection>
      </BannerContainer>
    );
  } else {
    return (
      <VideoContainer>
        <Iframe
          src={`http://youtube.com/embed/${movie.videos?.results[0]?.key}?controls=0&autoplay=1&loop=1&mute=0&playlist=${movie.videos?.results[0]?.key}`}
        />
        <VideoCancelBtn onClick={() => setIsClicked(false)}>x</VideoCancelBtn>
      </VideoContainer>
    );
  }
}
