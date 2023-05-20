interface SeasonsProps {
  seasons: [];
};

export const Seasons: React.FC<SeasonsProps> = ({ seasons }) => {
  return <span>{`시즌 ${seasons?.length}개`}</span>;
};

interface RunningTimeProps {
  runtime: number;
};

export const RunningTime: React.FC<RunningTimeProps> = ({ runtime }) => {
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
