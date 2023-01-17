import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import axios from "../pages/api/axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import MovieModal from "./moviemodal/movieModal";
import { useQuery } from "react-query";

const RowContainer = styled.div`
  position: relative;
  background-color: black;
`;

const SlideContainer = styled.div`
  width: 100%;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 20px 0 20px 20px;
  scroll-behavior: smooth;
  /* transition: all 0.2s ease-in-out; */

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MoviePoster = styled.div`
  width: ${(props) => (props.isLarge ? "300px" : "400px")};
  height: ${(props) => (props.isLarge ? "400px" : "200px")};
  background-image: url(${(props) => props.background});
  background-repeat: no-repeat;
  background-size: contain;
  flex-shrink: 0;
  transition: transform 0.4s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const MovieSkelton = styled(MoviePoster)`
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  background-image: none;
  background-color: lightgray;
  opacity: 0.3;
  margin: 0 16px;

  @keyframes loading {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(300px);
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: loading 1.5s infinite linear;
  }

  &:hover {
    transform: none;
  }
`;

const MovieTitle = styled.h2`
  padding-top: 16px;
  padding-left: 20px;
  background-color: black;
  color: white;
`;

const RightArrow = styled.div`
  width: 50px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 16px;
  padding: 20px 16px;
  background-color: black;
  opacity: 0.3;
  color: white;
  font-size: 32px;
  transition: all 0.3s ease;
  z-index: 10;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const LeftArrow = styled.div`
  width: 50px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 16px;
  padding: 20px 16px;
  background-color: black;
  opacity: 0.3;
  color: white;
  font-size: 32px;
  transition: all 0.3s ease;
  z-index: 10;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

export default function Row({ title, id, fetchUrl, isLarge }) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  const fetchMovies = async () => {
    const res = await axios.get(fetchUrl);

    return res.data.results;
  };

  const handleClick = (movie) => {
    setModalOpen(true);
    console.log(movie);
    setMovieSelected(movie);
  };

  const { isLoading, data, isError } = useQuery(
    ["getMovies", { movieId: id }],
    fetchMovies,
    {
      onSuccess: (data) => {
        setMovies(data);
        console.log(movies);
      },
      enable: false,
      retry: 0,
    }
  );

  if (isError) {
    alert("error");
  }

  return (
    <RowContainer>
      <MovieTitle>{title}</MovieTitle>
      {/* innerwidth - 80 만큼 이동 */}
      <LeftArrow
        onClick={() =>
          (document.getElementById(id).scrollLeft -= window.innerWidth - 80)
        }
      >
        {"<"}
      </LeftArrow>
      <SlideContainer id={id}>
        {isLoading
          ? new Array(10).fill(1).map((_, i) => (
              <div style={{ margin: "0 16px" }} key={i}>
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                  <Skeleton width="300px" height="400px" />
                </SkeletonTheme>
              </div>
            ))
          : movies.map((movie) => (
              <MoviePoster
                key={movie.id}
                background={`https://image.tmdb.org/t/p/original/${
                  isLarge ? movie.poster_path : movie.backdrop_path
                }`}
                isLarge={isLarge === true ? true : false}
                onClick={() => handleClick(movie)}
              />
            ))}
      </SlideContainer>
      <RightArrow
        onClick={() =>
          (document.getElementById(id).scrollLeft += window.innerWidth - 80)
        }
      >
        {">"}
      </RightArrow>

      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </RowContainer>
  );
}

// {isLoading
//   ? new Array(10)
//       .fill(1)
//       .map((_, i) => (
//         <MovieSkelton
//           key={i}
//           isLarge={isLarge === true ? true : false}
//         />
//       ))
//   : movies.map((movie) => (
//       <MoviePoster
//         key={movie.id}
//         background={`https://image.tmdb.org/t/p/original/${
//           isLarge ? movie.poster_path : movie.backdrop_path
//         }`}
//         isLarge={isLarge === true ? true : false}
//       />
//     ))}
