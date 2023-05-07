import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { homeAPI } from "../../api/Apis";
import DetailModalContainer from "../templates/DetailBox/DetailModalContainer";
import Loading from "../atoms/Loading/Loading";
import Wrapper from "../atoms/Layout/Wrapper";
import MainBanner from "../organisms/MainBanner/MainBanner";
import Slide from "../organisms/Slide/Slide";
import { Link, useOutletContext } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { IGetData } from "../../interface/Interface";
import styled from "styled-components";
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "../atoms/Icons";
import { normal2, small } from "../../styles/Fonts";

const Home = () => {
  const [serviceCode, setServiceCode] = useState<string>("서비스 코드");
  const { pathnameId } = useOutletContext<{ pathnameId: number }>();
  const { data: trending = { results: [] }, isLoading } = useQuery<IGetData>(["trending"], homeAPI.trending, {
    // select: (data) => {
    //   const test = data.results.slice(1);
    //
    //   return test;
    // },
    staleTime: 100000,
  });
  const { data: nowPlaying = { results: [] } } = useQuery<IGetData>(["nowPlaying"], homeAPI.nowPlaying, {
    staleTime: 100000,
  });

  const serviceCodeGenerator = () => {
    const num = Math.random().toFixed(6).split(".")[1];
    const code = `${num.substring(0, 3)}-${num.substring(3)}`;
    setServiceCode(code);
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <MainBanner id={trending?.results[0]?.id ?? 0} media_type={trending?.results[0]?.media_type ?? ""} />
          <SlideContainer>
            <Slide title="지금 뜨는 콘텐츠" category="trending" {...trending} />
            <Slide title="상영 중인 영화" category="nowPlaying" type="movie" {...nowPlaying} />
          </SlideContainer>
          <AnimatePresence>{pathnameId && <DetailModalContainer />}</AnimatePresence>
        </React.Fragment>
      )}
      <Footer>
        <FooterIconbox>
          <a href="https://www.facebook.com/NetflixKR" rel="noopener noreferrer" target="_blank">
            <FacebookIcon size={2.4} />
          </a>
          <a href="https://www.instagram.com/netflixkr/" rel="noopener noreferrer" target="_blank">
            <InstagramIcon size={2.4} />
          </a>
          <a href="https://twitter.com/netflixkr" rel="noopener noreferrer" target="_blank">
            <TwitterIcon size={2.4} />
          </a>
          <a
            href="https://www.youtube.com/channel/UCiEEF51uRAeZeCo8CJFhGWw/featured"
            rel="noopener noreferrer"
            target="_blank"
          >
            <YoutubeIcon size={2.4} />
          </a>
        </FooterIconbox>
        <FooterMenuBox>
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
        </FooterMenuBox>
        <FooterServiceCodeBox>
          <button disabled={serviceCode !== "서비스 코드" && true} onClick={serviceCodeGenerator}>
            {serviceCode}
          </button>
        </FooterServiceCodeBox>
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
      </Footer>
    </Wrapper>
  );
};

export default Home;

const SlideContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: -40px;
`;

const Footer = styled.section`
  width: 113.2rem;
  height: 34.8rem;
  margin: 0 auto 2rem;
`;

const FooterIconbox = styled.div`
  display: flex;
  gap: 1.9rem;
  margin-bottom: 7px;
  color: ${(props) => props.theme.white.lighter};
  a {
    width: 3.2rem;
    height: 3.7rem;
  }
`;

const FooterMenuBox = styled.ul`
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
    ${normal2}
  }
`;

const FooterServiceCodeBox = styled.div`
  button {
    height: 3.2rem;
    background-color: transparent;
    color: ${(props) => props.theme.grey.lighter};
    border: 1px solid;
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.white.darker};
      border: 1px solid ${(props) => props.theme.grey.lighter};
    }
  }
`;

const FooterInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.grey.lighter};
  margin-top: 2rem;
  gap: 0.5rem;
  ${small}
  a {
    &:hover {
      text-decoration: underline;
    }
  }
`;
