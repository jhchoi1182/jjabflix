import React from "react";
import styled from "styled-components";
import { theme } from "../../../styles/theme";
import { Link } from "react-router-dom";
import { flex } from "../../../styles/css";

type NavMenuModalProps = {
  XY: {
    top: number;
    left: number;
  };
};

const NavMenuModal = ({ XY }: NavMenuModalProps) => {
  return (
    <NavModalContainer XY={XY}>
      <NavItem>
        <NavLink to="/">홈</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/tv">시리즈</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/movie">영화</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/bookmark">내가 찜한 콘텐츠</NavLink>
      </NavItem>
    </NavModalContainer>
  );
};

export default NavMenuModal;

const NavModalContainer = styled.div<NavMenuModalProps>`
  position: absolute;
  width: 250px;
  background-color: rgb(0, 0, 0, 0.5);
  top: ${({ XY }) => XY.top}px;
  left: ${({ XY }) => XY.left}px;
  color: ${theme.white.darker};
  font-size: 1.5rem;
  padding: 10px 0;
  border-top: 2px solid white;
  :before {
    content: "";
    position: absolute;
    top: -18px;
    left: 50%;
    transform: translateX(-50%);
    border-style: solid;
    border-width: 8px 8px 8px 8px;
    border-color: transparent transparent white transparent;
  }
`;

const NavItem = styled.li`
  ${flex()}
  height: 50px;
`;

const NavLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;
