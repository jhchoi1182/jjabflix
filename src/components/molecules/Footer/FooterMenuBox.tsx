import styled from "styled-components";
import { font } from "../../../styles/Fonts";
import { theme } from "../../../styles/theme";

const menuItems = [
  {
    href: "https://www.netflix.com/browse/audio-description",
    text: "화면 해설",
  },
  {
    href: "https://help.netflix.com/ko/",
    text: "고객 센터",
  },
  {
    href: "https://www.netflix.com/kr/redeem",
    text: "기프트 카드",
  },
  {
    href: "https://media.netflix.com/ko/",
    text: "미디어 센터",
  },
  {
    href: "https://ir.netflix.net/ir-overview/profile/default.aspx",
    text: "투자 정보(IR)",
  },
  {
    href: "https://jobs.netflix.com/",
    text: "입사 정보",
  },
  {
    href: "https://help.netflix.com/legal/termsofuse",
    text: "이용 약관",
  },
  {
    href: "https://help.netflix.com/legal/privacy",
    text: "개인정보",
  },
  {
    href: "https://help.netflix.com/legal/notices",
    text: "법적 고지",
  },
  {
    href: "https://help.netflix.com/legal/privacy#cookies",
    text: "쿠키 설정",
  },
  {
    href: "https://help.netflix.com/legal/corpinfo",
    text: "회사 정보",
  },
  {
    href: "https://help.netflix.com/ko/contactus",
    text: "문의하기",
  },
];

const FooterMenuBox = () => {
  return (
    <FooterMenu>
      {menuItems.map((menuItem) => (
        <li key={menuItem.text}>
          <a href={menuItem.href}>
            <span>{menuItem.text}</span>
          </a>
        </li>
      ))}
    </FooterMenu>
  );
};

export default FooterMenuBox;

const FooterMenu = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 18px;
  color: ${theme.grey.lighter};
  margin-bottom: 3rem;
  a {
    &:hover {
      text-decoration: underline;
    }
  }
  span {
    ${font.footer_menu}
  }
  @media (max-width: 799px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
