import styled from "styled-components";
import { font } from "../../../styles/Fonts";
import FooterIconBox from "../../molecules/Footer/FooterIconBox";
import FooterMenuBox from "../../molecules/Footer/FooterMenuBox";
import ServiceCode from "../../atoms/UI/ServiceCode";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterIconBox />
      <FooterMenuBox />
      <ServiceCode />
      <FooterInfoBox>
        <div>짭플릭스서비스코리아 통신판매업신고번호: 없음 전화번호: 010-6262-1182</div>
        <div>대표: 최지현</div>
        <div>이메일 주소: jhchoi1182@gmail.com</div>
        <div>주소: 경기도 어딘가 우편번호 00000</div>
        <div>사업자등록번호: 없음</div>
        <div>클라우드 호스팅: Vercel.</div>
        <div>
          <a href="http://www.ftc.go.kr/bizCommPop.do?wrkr_no=1658700119" rel="noopener noreferrer" target="_blank">
            공정거래위원회 웹사이트
          </a>
        </div>
      </FooterInfoBox>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.section`
  width: 59vw;
  height: 34.8rem;
  margin: 0 auto 2rem;
  overflow-y: hidden;
`;

const FooterInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.grey.lighter};
  margin-top: 2rem;
  gap: 0.5rem;
  ${font.footer_text}
  a {
    &:hover {
      text-decoration: underline;
    }
  }
`;
