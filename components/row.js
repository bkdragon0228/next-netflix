import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import axios from "../pages/api/axios";

const RowContainer = styled.div`
  width: 100%;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 20px 0 20px 20px;
  scroll-behavior: smooth;
  background-color: black;

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

const MovieTitle = styled.h2`
  padding-top: 16px;
  padding-left: 20px;
  background-color: black;
  color: white;
`;

export default function Row({ title, id, fetchUrl, isLarge }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axios.get(fetchUrl);
      setMovies(res.data.results);
    } catch (err) {
      throw err;
    }
  };
  return (
    <>
      <MovieTitle>{title}</MovieTitle>
      <RowContainer>
        {movies.map((movie) => (
          <>
            <MoviePoster
              key={movie.id}
              background={`https://image.tmdb.org/t/p/original/${
                isLarge ? movie.poster_path : movie.backdrop_path
              }`}
              isLarge={isLarge === true ? true : false}
            />
          </>
        ))}
      </RowContainer>
    </>
  );
}
