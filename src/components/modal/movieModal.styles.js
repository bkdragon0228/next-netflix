import styled from "@emotion/styled";

export const MovieModalContainer = styled.div`
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

export const MovieModalContent = styled.div`
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

export const CancelBtn = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const MovieImage = styled.div`
  width: 100%;
  height: 50%;
  background-image: url(${(props) => props.background});
  background-repeat: no-repeat;
  background-size: cover;
`;

export const MovieDescription = styled.div`
  width: 100%;
  padding: 32px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

export const MovieDate = styled.div`
  & span {
    color: green;
  }
`;

export const MovieTitle = styled.div`
  font-size: 32px;
`;

export const MovieOverView = styled.div`
  width: 60%;
`;
