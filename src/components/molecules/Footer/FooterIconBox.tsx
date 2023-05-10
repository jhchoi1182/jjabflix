import React from "react";
import styled from "styled-components";
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "../../atoms/Icons";

const FooterIconBox = () => {
  return (
    <FooterIcons>
      <a href="https://www.facebook.com/NetflixKR" rel="noopener noreferrer" target="_blank">
        <FacebookIcon size="big" />
      </a>
      <a href="https://www.instagram.com/netflixkr/" rel="noopener noreferrer" target="_blank">
        <InstagramIcon size="big" />
      </a>
      <a href="https://twitter.com/netflixkr" rel="noopener noreferrer" target="_blank">
        <TwitterIcon size="big" />
      </a>
      <a
        href="https://www.youtube.com/channel/UCiEEF51uRAeZeCo8CJFhGWw/featured"
        rel="noopener noreferrer"
        target="_blank"
      >
        <YoutubeIcon size="big" />
      </a>
    </FooterIcons>
  );
};

export default FooterIconBox;

const FooterIcons = styled.div`
  display: flex;
  gap: 1.9rem;
  margin-bottom: 7px;
  color: ${(props) => props.theme.white.lighter};
  a {
    width: 3.2rem;
    height: 3.7rem;
  }
`;
