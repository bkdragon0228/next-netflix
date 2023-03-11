import React, { useEffect, useRef } from "react";
import * as S from "./movieModal.styles";

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
    <S.MovieModalContainer>
      <S.MovieModalContent ref={ref}>
        <S.CancelBtn onClick={() => setModalOpen(false)}>X</S.CancelBtn>
        <S.MovieImage
          background={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
        />
        <S.MovieDescription>
          <S.MovieDate>
            <span>100% for you</span> {first_air_date}
          </S.MovieDate>
          <S.MovieTitle>{name}</S.MovieTitle>
          <S.MovieOverView>
            {`평점 : ${vote_average}`}
            <br />
            {overview}
          </S.MovieOverView>
        </S.MovieDescription>
      </S.MovieModalContent>
    </S.MovieModalContainer>
  );
}
