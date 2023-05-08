import React from "react";

type SeasonsProps = {
  seasons: [];
};

export const Seasons: React.FC<SeasonsProps> = ({ seasons }) => {
  return <span>{`시즌 ${seasons?.length}개`}</span>;
};

type RunningTimeProps = {
  runtime: number;
};

export const RunningTime: React.FC<RunningTimeProps> = ({ runtime }) => {
  const totalMinutes = runtime || 0;
  const { hours, minutes } = {
    hours: Math.floor(totalMinutes / 60),
    minutes: totalMinutes % 60,
  };

  return <span>{`${hours}시간 ${minutes}분`}</span>;
};
