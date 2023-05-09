import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { FavoriteAtom, categoryAtom, detailAtom } from "../../../lib/Atoms";
import { posterAPI } from "../../../api/Apis";
import { bgImg } from "../../atoms/BannerImage";
import * as fonts from "../../../styles/Fonts";
import { Play } from "../../molecules/Button/RectangleButton";
import { CircleAdd, CircleCheck } from "../../molecules/Button/CircleButton";
import { FavoriteContentsAddRemove } from "../../../utils/hooks";
import Rating from "../../atoms/Slide/Rating";
import { IContent } from "../../../interface/Interface";
import ReleaseDate from "../../atoms/Slide/ReleaseDate";
import { RunningTime, Seasons } from "../../atoms/Slide/RunningTime";
import { AdultIcon, Age15, HD } from "../../atoms/Icons";

const DetailModalContainer = () => {
  const { addFavoriteContents, removeFavoriteContents } = FavoriteContentsAddRemove();
  const favoriteContents = useRecoilValue<IContent[]>(FavoriteAtom);
  const contentData = useRecoilValue<IContent>(detailAtom);
  const category = useRecoilValue<string>(categoryAtom);
  const contentsMatch = useMatch("/:dataId");
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const {
    id,
    backdrop_path,
    poster_path,
    title,
    name,
    vote_average,
    release_date,
    seasons,
    runtime,
    adult,
    overview,
    production_companies,
    production_countries,
    genres,
    tagline,
  } = contentData;
  const isAdded = favoriteContents.some((content) => content.id === id);

  const stopPropagationHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };

  const toBottomScrollHandler = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    };
  }, []);

  return (
    <BackdropOverlay onClick={() => navigate(-1)}>
      <Container layoutId={category + contentsMatch?.params.dataId} onClick={stopPropagationHandler}>
        <CoverBox bgimg={posterAPI(backdrop_path ?? poster_path, "w500")}>
          <Title>{title || name}</Title>
          <CoverButtonBox>
            <Play buttonSize="detailButton" />
            {isAdded ? (
              <CircleCheck buttonSize="detailButton" onClick={() => removeFavoriteContents(contentData)} />
            ) : (
              <CircleAdd buttonSize="detailButton" onClick={() => addFavoriteContents(contentData)} />
            )}
          </CoverButtonBox>
        </CoverBox>
        <DescriptionBox>
          <TopDescription>
            <LeftInfoDiv>
              <MedaDataBox>
                <Rating voteAverage={vote_average} />
                <ReleaseDate ReleaseDate={release_date} />
                {(seasons && <Seasons seasons={seasons} />) || (runtime && <RunningTime runtime={runtime} />)}
                <HD size="basic" />
              </MedaDataBox>
              {adult ? <AdultIcon size="basic" /> : <Age15 size="basic" />}
              <Overview>{overview}</Overview>
            </LeftInfoDiv>
            <RightInfoDiv>
              <DetailMetaData>
                <Label>제작사: </Label>
                <TextBox>
                  {production_companies.map((company, i) => {
                    if (i === production_companies.length - 1) {
                      return <Text key={company.name}>{`${company.name}`}</Text>;
                    } else {
                      return <Text key={company.name}>{`${company.name},`}</Text>;
                    }
                  })}
                </TextBox>
                <More onClick={toBottomScrollHandler}>더 보기</More>
              </DetailMetaData>
              <DetailMetaData>
                <div>
                  <Label>장르:</Label>
                  {genres.map((genre, i) => {
                    if (i === genres.length - 1) {
                      return <Text>{`${genre.name}`}</Text>;
                    } else {
                      return <Text>{`${genre.name},`}</Text>;
                    }
                  })}
                </div>
              </DetailMetaData>
              {tagline && tagline !== "" && (
                <DetailMetaData>
                  <div>
                    <Label>태그라인:</Label>
                    <Text>{tagline}</Text>
                  </div>
                </DetailMetaData>
              )}
            </RightInfoDiv>
          </TopDescription>
          <BottomDescription ref={scrollRef}>
            <BottomTitle>{`${title || name} 상세 정보`}</BottomTitle>
            <BottomDetailMetaDataBox>
              <BottomDetailMetaData>
                <div>
                  <Label>제작사:</Label>
                  {production_companies.map((company, i) => {
                    if (i === production_companies.length - 1) {
                      return <Text key={company.name}>{`${company.name}`}</Text>;
                    } else {
                      return <Text key={company.name}>{`${company.name},`}</Text>;
                    }
                  })}
                </div>
              </BottomDetailMetaData>
              <BottomDetailMetaData>
                <div>
                  <Label>국가:</Label>
                  {production_countries.map((country, i) => {
                    if (i === production_countries.length - 1) {
                      return <Text key={country.name}>{`${country.name}`}</Text>;
                    } else {
                      return <Text key={country.name}>{`${country.name},`}</Text>;
                    }
                  })}
                </div>
              </BottomDetailMetaData>
              <BottomDetailMetaData>
                <div>
                  <Label>장르:</Label>
                  {genres.map((genre, i) => {
                    if (i === genres.length - 1) {
                      return <Text>{`${genre.name}`}</Text>;
                    } else {
                      return <Text>{`${genre.name},`}</Text>;
                    }
                  })}
                </div>
              </BottomDetailMetaData>
              {tagline && tagline !== "" && (
                <BottomDetailMetaData>
                  <div>
                    <Label>태그라인:</Label>
                    <Text>{tagline}</Text>
                  </div>
                </BottomDetailMetaData>
              )}
            </BottomDetailMetaDataBox>
            <BottomDetailMetaData>
              <div style={{ display: "flex" }}>
                <Label>관람등급:</Label>
                {adult ? (
                  <div style={{ marginLeft: "0.5rem" }}>
                    <AdultIcon size="basic" />
                    <span style={{ marginLeft: "1.5rem" }}>19세이상관람가</span>
                  </div>
                ) : (
                  <div style={{ marginLeft: "0.5rem" }}>
                    <Age15 size="basic" />
                    <span style={{ marginLeft: "1.5rem" }}>15세이상관람가</span>
                  </div>
                )}
              </div>
            </BottomDetailMetaData>
          </BottomDescription>
        </DescriptionBox>
      </Container>
    </BackdropOverlay>
  );
};

export default DetailModalContainer;

const BackdropOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled(motion.div)`
  width: 902.5px;
  margin: 30px auto 0px;
  background-color: ${(props) => props.theme.black.darker};
`;

const CoverBox = styled.div<{ bgimg: string }>`
  ${bgImg}
  background-image: linear-gradient(rgba(24, 24, 24, 0), rgba(24, 24, 24, 0), rgba(24, 24, 24, 1)),
    url(${(props) => props.bgimg});
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 53px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

const Title = styled.h3`
  ${fonts.big1}
  ${fonts.bold}
  color: ${(props) => props.theme.white.lighter};
  width: 50%;
  margin-bottom: 2rem;
`;

const CoverButtonBox = styled.div`
  display: flex;
  gap: 2rem;
`;

const DescriptionBox = styled.section`
  padding: 3.5rem 5rem;
`;

const TopDescription = styled.div`
  display: flex;
  gap: 3rem;
`;

const MedaDataBox = styled.div`
  display: flex;
  ${fonts.normal2}
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

const Overview = styled.p`
  margin-top: 3.2rem;
  ${fonts.normal3}
  line-height: 1.5;
`;

const LeftInfoDiv = styled.div`
  width: 67%;
`;

const RightInfoDiv = styled.div`
  width: 33%;
  margin-top: -2.5rem;
`;

const DetailMetaData = styled.div`
  display: flex;
  margin-bottom: 1.7rem;
`;

const Label = styled.label`
  color: ${(props) => props.theme.grey.lighter};
  margin-right: 0.5rem;
`;

const TextBox = styled.div`
  width: 14rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Text = styled.span`
  color: ${(props) => props.theme.white.lighter};
  margin-right: 0.5rem;
`;

const More = styled.span`
  margin-left: 0.5rem;
  color: ${(props) => props.theme.white.lighter};
  font-style: italic;
  cursor: pointer;
`;

const BottomDescription = styled.div`
  margin-top: 8rem;
`;

const BottomTitle = styled.h3`
  ${fonts.mid2rem}
`;

const BottomDetailMetaDataBox = styled.div`
  margin-top: 2.3rem;
`;

const BottomDetailMetaData = styled.div`
  display: flex;
  margin-bottom: 0.7rem;
`;
