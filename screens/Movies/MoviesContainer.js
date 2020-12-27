import React, { useState } from "react";
import { useEffect } from "react";
import { movieApi } from "../../api";
import MoviesPresenter from "./MoivesPresenter";

export default () => {
    const [refreshing, setRefresing] = useState(false);
    const [movies, setMovies] = useState({
        loading: true,
        nowPlaying: [],
        nowPlayingError: null,
        upcoming: [],
        upcomingError: null,
        popular: [],
        popularError: null,
    });
    const getData = async () => {
        const [nowPlaying, nowPlayingError] = await movieApi.nowPlaying();
        const [popular, popularError] = await movieApi.popular();
        const [upcoming, upcomingError] = await movieApi.upcoming();
        setMovies({
            loading: false,
            nowPlaying,
            popular,
            upcoming,
            nowPlayingError,
            popularError,
            upcomingError
        });
    };
    useEffect(()=> {
        getData();
    },[]);

    return <MoviesPresenter refreshFn={getData} {...movies} />; // moives의 모든 states 값들을 MoviePresenter로 전송
};