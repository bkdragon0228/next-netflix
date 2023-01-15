import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";

const MovieModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(0 0 0 / 71%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const MovieModalContent = styled.div`
  position: relative;
  max-width: 50%;
  height: 90%;
  background-color: #111;
  overflow: hidden;
  color: white;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  transition: all 400ms ease-in-out 2s;
`;

const CancelBtn = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const MovieImage = styled.div`
  width: 100%;
  height: 50%;
  background-image: url(${(props) => props.background});
  background-repeat: no-repeat;
  background-size: cover;
`;

const MovieDescription = styled.div`
  width: 100%;
  padding: 32px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

const MovieDate = styled.div`
  & span {
    color: green;
  }
`;

const MovieTitle = styled.div`
  font-size: 32px;
`;

const MovieOverView = styled.div`
  width: 60%;
`;
export default function MovieModal({
  backdrop_path,
  name,
  overview,
  first_air_date,
  vote_average,
  setModalOpen,
}) {
  const ref = useRef();
  console.log(ref);

  useEffect(() => {
    const listener = (e) => {
      // 클릭한 부분이 ref에 포함되면
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      // 클릭한 부분이 ref에 포함되지 않으면, 즉 modal창 외부를 클릭하면
      setModalOpen(false);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, []);

  return (
    <MovieModalContainer>
      <MovieModalContent ref={ref}>
        <CancelBtn onClick={() => setModalOpen(false)}>X</CancelBtn>
        <MovieImage
          background={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
        />
        <MovieDescription>
          <MovieDate>
            <span>100% for you</span> {first_air_date}
          </MovieDate>
          <MovieTitle>{name}</MovieTitle>
          <MovieOverView>
            {`평점 : ${vote_average}`}
            <br />
            {overview}
          </MovieOverView>
        </MovieDescription>
      </MovieModalContent>
    </MovieModalContainer>
  );
}
