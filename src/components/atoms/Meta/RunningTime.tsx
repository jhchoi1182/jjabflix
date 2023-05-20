export const Seasons = ({ seasons }: { seasons: [] }) => {
  return <span>{`시즌 ${seasons?.length}개`}</span>;
};

export const RunningTime = ({ runtime }: { runtime: number }) => {
  const { hours, minutes } = {
    hours: Math.floor(runtime / 60),
    minutes: runtime % 60,
  };

  const time = () => {
    if (hours === 0) return `${minutes}분`;
    else return `${hours}시간 ${minutes}분`;
  };

  return <span>{time()}</span>;
};
