import styled from "styled-components";
import { detailAPI } from "../../../api/Apis";
import { useQuery } from "@tanstack/react-query";
import { IContent } from "../../../interface/Interface";
import * as Button from "../../molecules/Button/RectangleButton";
import * as fonts from "../../../styles/Fonts";
import { ChildrenProps } from "../../../interface/type";
import { useTooltip } from "../../../utils/Hooks";

export type MainBannerProps = {
  id: number;
  media_type: string;
};

const MainBanner: React.FC<MainBannerProps> & {
  Title: React.FC<ChildrenProps>;
  Overview: React.FC<ChildrenProps>;
  BackgroundImage: React.FC<ChildrenProps>;
} = ({ id, media_type }) => {
  const { isHovered, showTooltipHandler, disappearTooltipHandler, renderTooltip } = useTooltip();
  const { data } = useQuery<IContent | undefined>(["bannerDetail"], () => detailAPI({ id, media_type }));
  const { title, name, overview } = data || {};

  return (
    <MainBanner.BackgroundImage>
      <MainBanner.Title>{title ?? name}</MainBanner.Title>
      <MainBanner.Overview>{overview}</MainBanner.Overview>
      <ButtonBox>
        <Button.Play
          data-tooltip-text="지원하지 않는 기능입니다."
          onClick={(event) => showTooltipHandler({ top: 610, x: -8, size: "detailTooltip" }, event)}
          onMouseLeave={disappearTooltipHandler}
          buttonSize="mainButton"
        />
        <Button.Detail buttonSize="mainButton" />
      </ButtonBox>
      {isHovered && renderTooltip()}
    </MainBanner.BackgroundImage>
  );
};

export default MainBanner;

MainBanner.BackgroundImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100vh;
  padding: 60px;
`;

MainBanner.Title = styled.h2`
  ${fonts.big2}
  ${fonts.bold}
  margin-bottom: 2.3rem;
  width: 37%;
`;

MainBanner.Overview = styled.p`
  ${fonts.mid2}
  ${fonts.bold}
  width: 37%;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 1.4rem;
  margin-top: 3.2rem;
  margin-bottom: 19rem;
`;
