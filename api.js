import axios from 'axios';

const TMDB_KEY = "51f1b8c3aad7b7bedc98d13f1f4f9ccd"; //api key

const makeRequest = (path, params) =>
  axios.get(`https://api.themoviedb.org/3${path}`, {
    params: {
      ...params,
      api_key: TMDB_KEY
    }
  }); // request 함수 생성

const getAnything = async (path, params = {}) => {
    try{
        const { data: { results }, data } = await makeRequest(path, params);
        return [results || data, null]; // results 범위에 없는 path가 있으므로 data 하나 더 생성 후 or로 구현
    } catch (e) {
        return [null, e];
    }
}; //get 함수 생성(request 함수 삽입)


export const movieApi = {
    nowPlaying: () => getAnything("/movie/now_playing"),
    popular: () => getAnything("/movie/popular"),
    upcoming: () => getAnything("/movie/upcoming", { region: "kr" }),
    search: query => getAnything("/search/movie", { query }),
    movie: id => getAnything(`/movie/${id}`, {append_to_response: "video"}),
    discover: () => getAnything("/discover/movie")
};

export const tvApi = {
    today: () => getAnything("/tv/airing_today"),
    thisWeek: () => getAnything("/tv/on_the_air"),
    topRated: () => getAnything("/tv/top_rated"),
    popular: () => getAnything("/tv/popular"),
    search: query => getAnything("/search/tv", { query }),
    show: id => getAnything(`/tv/${id}`, {append_to_response: "video"})
};

export const apiImage = (path, defaultPoster = "https://images.unsplash.com/photo-1568578728625-d07d645cdfe3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTAwfHxwb3N0ZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60") => 
  path 
    ? `https://image.tmdb.org/t/p/w500${path}`
    : defaultPoster;
// poster 이미지가 있으면 위 주소로 없으면 아래 이미지 주소로