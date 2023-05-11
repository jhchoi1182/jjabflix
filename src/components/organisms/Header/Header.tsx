import { motion, useScroll, useMotionValueEvent, Variants, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { flex } from "../../../styles/css";
import Search from "../../molecules/Search/Search";
import { Logo } from "../../atoms/Icons";

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
    <NavBar variants={navVariants} initial="transparent" animate={navAnimation}>
      <FlexContainer>
        <Link to="/">
          <Logo marginRight="4.5rem" />
        </Link>
        <Pages>
          <Link to="/">
            <Page>홈</Page>
          </Link>
          <Link to="/tv">
            <Page>시리즈</Page>
          </Link>
          <Link to="/movie">
            <Page>영화</Page>
          </Link>
          <Link to="/bookmark">
            <Page>내가 찜한 콘텐츠</Page>
          </Link>
        </Pages>
      </FlexContainer>
      <FlexContainer>
        <Search />
      </FlexContainer>
    </NavBar>
  );
};

export default Header;

const NavBar = styled(motion.nav)`
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

const Pages = styled.ul`
  display: flex;
  margin-top: 2px;
`;

const Page = styled.li`
  margin-right: 2rem;
  transition: color 0.3s ease-in-out;
  position: relative;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;
