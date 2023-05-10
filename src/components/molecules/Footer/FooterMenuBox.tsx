import React from "react";
import styled from "styled-components";
import { normal1 } from "../../../styles/Fonts";

const FooterMenuBox = () => {
  return (
    <FooterMenu>
      <li>
        <a href="https://www.netflix.com/browse/audio-description">
          <span>화면 해설</span>
        </a>
      </li>
      <li>
        <a href="https://help.netflix.com/ko/">
          <span>고객 센터</span>
        </a>
      </li>
      <li>
        <a href="https://www.netflix.com/kr/redeem">
          <span>기프트카드</span>
        </a>
      </li>
      <li>
        <a href="https://media.netflix.com/ko/">
          <span>미디어 센터</span>
        </a>
      </li>
      <li>
        <a href="https://ir.netflix.net/ir-overview/profile/default.aspx">
          <span>투자 정보(IR)</span>
        </a>
      </li>
      <li>
        <a href="https://jobs.netflix.com/">
          <span>입사 정보</span>
        </a>
      </li>
      <li>
        <a href="https://help.netflix.com/legal/termsofuse">
          <span>이용 약관</span>
        </a>
      </li>
      <li>
        <a href="https://help.netflix.com/legal/privacy">
          <span>개인정보</span>
        </a>
      </li>
      <li>
        <a href="https://help.netflix.com/legal/notices">
          <span>법적 고지</span>
        </a>
      </li>
      <li>
        <a href="https://help.netflix.com/legal/privacy#cookies">
          <span>쿠키 설정</span>
        </a>
      </li>
      <li>
        <a href="https://help.netflix.com/legal/corpinfo">
          <span>회사 정보</span>
        </a>
      </li>
      <li>
        <a href="https://help.netflix.com/ko/contactus">
          <span>문의하기</span>
        </a>
      </li>
    </FooterMenu>
  );
};

export default FooterMenuBox;

const FooterMenu = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 18px;
  color: ${(props) => props.theme.grey.lighter};
  margin-bottom: 3rem;
  a {
    &:hover {
      text-decoration: underline;
    }
  }
  span {
    ${normal1}
  }
`;
