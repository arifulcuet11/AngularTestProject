export interface Movie {
  id: number;
  budget: string;
  originalLang: string;
  originalTitle: string;
  overview: string;
  popularity: string;
  releaseDate: string;
  revenue?: number;
  runtime: number;
  status: string;
  tagline?: string;
  title: string;
  voteAverage?: number;
  voteCount: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  action?: string;
}
