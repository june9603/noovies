import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { tvApi } from "../../api";
import TvPresenter from "./TvPresenter";

export default () => {
    const [shows, setShows] = useState({
        loading: true,
        today: [],
        todayError: null,
        thisWeek: [],
        thisWeekError: null,
        topRated: [],
        topRatedError: null,
        popular: [],
        popularError: null
    }); // 초기 상태값 지정 (전체 데이터 사용해 일반 useState보다 큼)
    const getData = async() => {
        const [today, todayError] = await tvApi.today();
        const [thisWeek, thisWeekError] = await tvApi.thisWeek();
        const [topRated, topRatedError] = await tvApi.topRated();
        const [popular, popularError] = await tvApi.popular();
        setShows({
            loading: false,
            today,
            todayError,
            thisWeek,
            thisWeekError,
            topRated,
            topRatedError,
            popular,
            popularError
        }); // setShows에 업데이트 되는 변수 입력
    };
    useEffect(() => {
        getData();
    }, []); // getData 함수 통해 useEffect를 실행, []는 해당 범위
    
    return (
        <TvPresenter  refreshFn={getData} {...shows} />
    );
};