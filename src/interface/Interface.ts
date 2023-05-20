export interface Genre {
  id: number;
  name: string;
}

export interface productionCompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface productionCountries {
  name: string;
}

export interface IContent {
  adult: boolean;
  backdrop_path: string;
  genres: Genre[];
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: Date;
  seasons?: [];
  runtime?: number;
  tagline: string;
  title: string;
  name?: string;
  vote_average: number;
  category: string;
  media_type: "movie" | "tv";
  production_companies: productionCompanies[];
  production_countries: productionCountries[];
}

export interface IGetData {
  dates?: {
    maximuum: string;
    minimuum: string;
  };
  page?: number;
  results: IContent[];
  total_pages?: number;
  total_results?: number;
}

export interface ChildrenProps {
  children: React.ReactNode;
}
