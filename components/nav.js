import styled from "@emotion/styled";
import Image from "next/legacy/image";
import { useEffect, useState } from "react";

const NavContainer = styled.nav`
  width: 100%;
  height: 80px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  color: white;
  background-color: ${(props) => (props.show === true ? "lightgray" : "black")};
  transition: all 0.5s ease;
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

export default function Nav() {
  const [show, setShow] = useState(false);

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

  return (
    <NavContainer show={show}>
      <NavLogo>
        <Image
          width={"100%"}
          height={"50%"}
          objectFit="contain"
          alt="netflix logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
          onClick={() => window.location.reload()}
        />
      </NavLogo>

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
