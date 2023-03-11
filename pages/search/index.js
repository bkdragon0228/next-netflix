import React, { useEffect, useState } from "react";
import Layout from "../../src/components/layout/layout";
import { useRouter } from "next/router";
import { useFetchSearchMovie } from "../../src/hooks/useFetchSearchMovie";
import styled from "@emotion/styled";

export default function SearchPage() {
  const [searchResults, setSearchResult] = useState([]);
  const router = useRouter();
  const { title } = router.query;

  const { data, isLoading } = useFetchSearchMovie(title);

  useEffect(() => {
    if (data) {
      setSearchResult(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleClick = (e) => {
    const id = e.currentTarget.id;
    router.push(`detail/${id}`);
  };

  return (
    <Layout>
      <Container>
        {!searchResults.length && <div>검색된 영화가 없습니다.</div>}
        {searchResults.length && (
          <MoviesWrapper>
            {searchResults.map((movie) => (
              <Movie key={movie.id}>
                <MoviePoster
                  id={movie.id}
                  backdrop={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  onClick={handleClick}
                />
              </Movie>
            ))}
          </MoviesWrapper>
        )}
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 700px;
  background-color: black;
  padding: 20px;
  color: white;
`;

const MoviesWrapper = styled.div`
  margin-top: 80px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Movie = styled.div``;

const MoviePoster = styled.div`
  width: 300px;
  height: 300px;
  background-image: url(${(props) => props.backdrop});
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;
