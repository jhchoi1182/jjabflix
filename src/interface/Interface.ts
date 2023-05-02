export interface IResult {
  backdrop_path: string;
  id: number;
  title: string;
  name?: string;
  original_title?: string;
  overview: string;
  poster_path: string;
  media_type: string;
  category: string;
}

export interface IGetData {
  dates?: {
    maximuum: string;
    minimuum: string;
  };
  page?: number;
  results: IResult[];
  total_pages?: number;
  total_results?: number;
  category: string;
  title: string;
  type?: string;
}
