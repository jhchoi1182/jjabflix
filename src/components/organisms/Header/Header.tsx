import { motion, useScroll, useMotionValueEvent, Variants, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { flex } from "../../../styles/css";
import Search from "../../molecules/Search/Search";
import { Logo } from "../../atoms/Icons";
import { useEffect, useState } from "react";
import NavMenu from "../../molecules/Header/NavMenu";
import MobileNavMenu from "../../molecules/Header/MobileNavMenu";

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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800 ? true : false);

  /** 스크롤 위치에 따른 헤더 투명도 조절 */
  useMotionValueEvent(scrollYProgress, "change", (y) => {
    if (y < 0.1) navAnimation.start("transparent");
    else navAnimation.start("scrolled");
  });

  /** 반응형 헤더 구현을 위한 로직 */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 800) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <HeaderContainer variants={navVariants} initial="transparent" animate={navAnimation}>
      <FlexContainer>
        <Link to="/">
          <Logo marginRight="4.5rem" />
        </Link>
        {isMobile ? <MobileNavMenu /> : <NavMenu />}
      </FlexContainer>
      <FlexContainer>{!isMobile && <Search />}</FlexContainer>
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
  padding: 20px 5vw;
`;

const FlexContainer = styled.div`
  display: flex;
`;
