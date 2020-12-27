import React, { useState } from "react";
import { useEffect } from "react";
import { movieApi, tvApi } from "../../api";
import * as WebBrowser from "expo-web-browser";
import DetailPresenter from "./DetailPresenter"

export default ({
    navigation, 
    route: { 
        params: {id, title, backgroundImage, poster, votes, overview, isTv}
    } 
}) =>  {
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState({
        loading: true,
        result:{
            title,
            backgroundImage,
            poster,
            overview,
            votes,
            videos: {
                results: []
            }
        }
    }); // 위 params 데이터를 state 데이터로 변경(state는 데이터의 근원)
    const getData = async() => {
        const [getDetail, getDetailError] = isTv 
            ? await tvApi.show(id) 
            : await movieApi.movie(id);
        setDetail({
            loading: false,
            result: {
                ...getDetail,
                title: getDetail.title || getDetail.name, // movie는 title, tv는 name
                backgroundImage: getDetail.backdrop_path,
                poster: getDetail.poster_path,
                overview: getDetail.overview,
                votes: getDetail.votes_average
            }
        });
    };
    useEffect(() => {
        getData();
    }, [id]);
    React.useLayoutEffect(() => {
        navigation.setOptions({ title }); 
    });

    const openBrowser = async(url) => {
        await WebBrowser.openBrowserAsync(url);
    };

    return <DetailPresenter openBrowser={openBrowser} {...detail}  />;
};