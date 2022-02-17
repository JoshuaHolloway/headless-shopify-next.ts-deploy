// ==============================================

export type ApiFetcherOptions = {
  url: string;
  query: string;
  variables?: any;
};

// ==============================================

export type FetcherResults<T> = {
  data: T;
};

// ==============================================

export interface ApiConfig {
  apiUrl: string;
  fetch<T>(options: ApiFetcherOptions): Promise<FetcherResults<T>>; // generic function
}
