import { useState } from "react";
import styled from "styled-components";
import { flex } from "../../../styles/css";
import NavMenuModal from "./NavMenuModal";

const MobileNavMenu = () => {
  const [isModal, setIsModal] = useState(false);
  const [XY, setXY] = useState({ top: 0, left: 0 });

  const NavMenuModalHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsModal((prev) => !prev);
    setXY({
      top: event.currentTarget.offsetTop + 50,
      left: event.currentTarget.offsetLeft - 90,
    });
  };

  return (
    <>
      <MobileNavContainer onClick={NavMenuModalHandler}>
        <label>메뉴</label>
        <span>&#9662;</span>
        {isModal && <NavMenuModal XY={XY} />}
      </MobileNavContainer>
    </>
  );
};

export default MobileNavMenu;

const MobileNavContainer = styled.div`
  ${flex("none")}
  font-size: 1.2rem;
  margin-left: -15%;
  margin-top: -0.5rem;
  cursor: pointer;
  span {
    font-size: 2rem;
    margin-left: 0.5rem;
  }
`;
