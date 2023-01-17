import styled from "@emotion/styled";
import Image from "next/legacy/image";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";

const breakpoints = [576, 768, 992, 1200];
const mq = breakpoints.map((bp) => `@media screen and (min-width : ${bp}px)`);

const NavContainer = styled.nav`
  position: relative;
  width: 100%;
  height: 80px;
  z-index: 1;
  color: white;
  transition: all 0.5s ease;
  background-color: black;

  ${mq[3]} {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: ${(props) =>
      props.show === true ? "black" : "transparent"};
  }
`;

const NavMenu = styled.ul`
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  list-style: none;
  display: flex;
  column-gap: 16px;

  & li {
    cursor: pointer;
  }

  & li:hover {
    opacity: 0.8;
  }

  ${mq[3]} {
    display: none;
  }
`;

const NavLogo = styled.div`
  width: 100px;
  position: absolute;
  top: 20%;
  left: 32px;
  cursor: pointer;
`;

const NavAvatar = styled.div`
  width: 80px;
  position: absolute;
  top: 20%;
  right: 16px;
  cursor: pointer;
`;

const NavInput = styled.input`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 16px 20px;
  border: none;
  background-color: black;
  color: white;
  border-radius: 5px;
`;

export default function Nav() {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [timerId, setTimerId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const handleSearch = useCallback(() => {
    // 검색을 수행하는 코드
    router.push({
      pathname: "/search",
      query: { title: searchValue },
    });
  }, [searchValue]);

  const handleChange = useCallback(
    (e) => {
      setSearchValue(e.target.value);
      if (timerId) clearTimeout(timerId);
      setTimerId(setTimeout(handleSearch, 2000));
    },
    [timerId]
  );

  return (
    <NavContainer show={show}>
      <NavLogo>
        <Image
          width={"100%"}
          height={"50%"}
          objectFit="contain"
          alt="netflix logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
          onClick={() => router.push("/")}
        />
      </NavLogo>

      {/* <NavMenu>
        <li>TV SHOW</li>
        <li>MOVIE</li>
        <li>MY LIST</li>
        <li>MOST FAMOUS</li>
      </NavMenu> */}

      <NavInput
        placeholder="영화를 검색해주세요."
        // value={searchValue}
        onChange={handleChange}
        type="text"
      />

      <NavAvatar
        alt="user logged"
        src="https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
        className="nav__avatar"
      >
        <Image
          width={"100%"}
          height={"50%"}
          objectFit="contain"
          alt="user logged"
          src="https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
        />
      </NavAvatar>
    </NavContainer>
  );
}
