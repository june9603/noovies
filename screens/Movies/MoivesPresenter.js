import React from "react";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { Dimensions } from "react-native";
import Slide from "../../components/Movies/Slide";
import Vertical from "../../components/Vertical";
import Horizontal from "../../components/Horizontal";
import ScrollContainer from "../../components/ScrollContainer";
import HorizontalSlider from "../../components/HorizontalSlider";
import List from "../../components/List";


const {width: WIDTH, height: HEIGHT } = Dimensions.get("window");


const SliderContainer = styled.View`
    width:100%;
    height:${HEIGHT / 4}px;
    background-color: black;
    margin-bottom: 40px;
`;

const Container = styled.View`

`;



export default ({ refreshFn, loading, nowPlaying, popular, upcoming }) => (
   <ScrollContainer  refreshFn={refreshFn} loading={loading}>
       <>
            <SliderContainer>
                <Swiper controlsEnabled={false} loop timeout={3}>
                    {nowPlaying.map(movie => (
                        <Slide
                            key={movie.id}
                            id={movie.id}
                            title={movie.original_title}
                            overview={movie.overview}
                            votes={movie.vote_average}
                            backgroundImage={movie.backdrop_path}
                            poster={movie.poster_path} 
                        /> // Components/Movies/Slide 에서의 props 값들을 출력  
                    ))} 
                </Swiper> 
            </SliderContainer>
            <Container>
                <HorizontalSlider title={"Popular Moives"} >
                    {popular.map(movie => (
                    <Vertical
                            id={movie.id}
                            key={movie.id}
                            poster={movie.poster_path}
                            title={movie.title}
                            votes={movie.vote_average}
                        />
                    ))}
                </HorizontalSlider>
                <List title="Coming Soon">
                {upcoming.map(movie => (
                    <Horizontal
                        key={movie.id} 
                        id={movie.id} 
                        title={movie.title}
                        releaseDate={movie.release_date}
                        poster={movie.poster_path}
                        overview={movie.overview}
                    />
                ))}
                </List>
            </Container>
        </>
   </ScrollContainer>
   // children 은 <ScrollContainer> 안에 있는 것들
);