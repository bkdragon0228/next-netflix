import styled from "@emotion/styled";
import React from "react";

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  padding: 40px 0;
  border: 1px solid rgb(25, 25, 25);
`;

const FooterLists = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 150px);
  gap: 32px;
`;

const FooterListContent = styled.li`
  color: gray;
  text-decoration: underline;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterLists>
        <FooterListContent>넷플릭스 소개</FooterListContent>
        <FooterListContent>고객 센터</FooterListContent>
        <FooterListContent>미디어 센터</FooterListContent>
        <FooterListContent>이용약관</FooterListContent>
        <FooterListContent>개인정보</FooterListContent>
        <FooterListContent>회사정보</FooterListContent>
        <FooterListContent>문의하기</FooterListContent>
        <FooterListContent>법적고지</FooterListContent>
        <FooterListContent>투자 정보</FooterListContent>
        <FooterListContent>입사 정보</FooterListContent>
        <FooterListContent>속도 테스트</FooterListContent>
        <FooterListContent>오직 넷플릭스에서</FooterListContent>
      </FooterLists>
    </FooterContainer>
  );
}
