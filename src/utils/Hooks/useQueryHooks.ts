import { useQuery } from "@tanstack/react-query";
import { IContent, IGetData } from "../../interface/Interface";
import { homeAPI, movieAPI, tvAPI } from "../../api/Apis";

interface IUseQueryWithDummyResult {
  data: IGetData;
  isError: boolean;
}

export const dummyData: IContent = {
  adult: false,
  backdrop_path: "",
  genres: [],
  id: 0,
  original_title: "",
  overview: "",
  poster_path: "",
  release_date: new Date(),
  tagline: "",
  title: "",
  vote_average: 0,
  category: "",
  media_type: "tv",
  production_companies: [],
  production_countries: [],
};

export const useQueryWithDummy = () => {
  const useCreateQuery = (queryKey: string[], queryFn: () => Promise<IGetData>): IUseQueryWithDummyResult => {
    const { data = { results: [] }, isError } = useQuery<IGetData>(queryKey, queryFn, {
      select: (data) => {
        if (data.results[0].id === 0) {
          return data;
        } else {
          data.results.unshift(dummyData);
          return data;
        }
      },
      staleTime: 100000,
    });

    return { data, isError };
  };

  return {
    Trending: useCreateQuery(["trending"], homeAPI.trending),
    PopularMovie: useCreateQuery(["popular", "movie"], movieAPI.popular),
    PopularTv: useCreateQuery(["popular", "tv"], tvAPI.popular),
    TopRateMovie: useCreateQuery(["top_rated", "movie"], movieAPI.top_rated),
    TopRateTV: useCreateQuery(["top_rated", "tv"], tvAPI.top_rated),
    NowPlayingMovie: useCreateQuery(["nowPlaying", "movie"], movieAPI.nowPlaying),
    OnTheAirTV: useCreateQuery(["on_the_air", "tv"], tvAPI.on_the_air),
    UpcomingMovie: useCreateQuery(["upcoming", "movie"], movieAPI.upcoming),
    AiringTodayTV: useCreateQuery(["airing_today", "tv"], tvAPI.airing_today),
  };
};
