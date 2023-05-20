import { motion, useScroll, useMotionValueEvent, Variants, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { flex } from "../../../styles/css";
import Search from "../../molecules/Search/Search";
import { Logo } from "../../atoms/Icons";
import { theme } from "../../../styles/theme";

const navVariants: Variants = {
  transparent: {
    backgroundColor: "rgb(0, 0, 0, 0)",
  },
  scrolled: {
    backgroundColor: "rgb(0, 0, 0, 1)",
  },
};

const Header = () => {
  const { scrollYProgress } = useScroll();
  const navAnimation = useAnimation();

  /** 스크롤 위치에 따른 헤더 투명도 조절 */
  useMotionValueEvent(scrollYProgress, "change", (y) => {
    if (y < 0.1) navAnimation.start("transparent");
    else navAnimation.start("scrolled");
  });

  return (
    <HeaderContainer variants={navVariants} initial="transparent" animate={navAnimation}>
      <FlexContainer>
        <Link to="/">
          <Logo marginRight="4.5rem" />
        </Link>
        <NavMenu>
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
        </NavMenu>
      </FlexContainer>
      <FlexContainer>
        <Search />
      </FlexContainer>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled(motion.header)`
  ${flex("space-between")}
  position: fixed;
  z-index: 99;
  width: 100%;
  top: 0;
  background-color: black;
  font-size: 1.5rem;
  padding: 20px 60px;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const NavMenu = styled.ul`
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
