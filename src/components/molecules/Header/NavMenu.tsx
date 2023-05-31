import styled from "styled-components";
import { theme } from "../../../styles/theme";
import { Link } from "react-router-dom";

const NavMenu = () => {
  return (
    <NavContainer>
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
    </NavContainer>
  );
};

export default NavMenu;

const NavContainer = styled.ul`
  display: flex;
  margin-top: 2px;
`;

const NavItem = styled.li`
  margin-right: 2rem;
  transition: color 0.3s ease-in-out;
  position: relative;
  &:hover {
    color: ${theme.white.lighter};
  }
`;

const NavLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;
