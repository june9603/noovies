// screen의 폴더와 components의 폴더 이름을 일치시키면 나중에 찾기 편하다
import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types"; // props 값들을 출력하기 위해 import
import { Image, TouchableOpacity } from "react-native";
import { apiImage } from "../../api";
import Poster from "../Poster";
import Votes from "../Votes";
import { trimText } from "../../utils";
import { useNavigation } from "@react-navigation/native";


const Container = styled.View`
  height: 100%;
  width: 100%;
`;
const BG = styled.Image`
  height: 100%;
  width: 100%;
  opacity: 0.4;
  position: absolute;
`;
const Content = styled.View`
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
const Data = styled.View`
  width: 50%;
  align-items: flex-start;
`;
const Title = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 19px;
  margin-bottom: 10px;
`;
const VotesContainer = styled.View`
  margin-bottom: 7px;
`;
const Overview = styled.Text`
  color: rgb(220, 220, 220);
  font-size: 14px;
  font-weight: 500;
`;
const Button = styled.View`
  margin-top: 10px;
  background-color: #e74c3c;
  padding: 10px;
  padding: 7px 10px;
  border-radius: 3px;
`;
const ButtonText = styled.Text`
  color: white;
`;


const Slide = ({id, title, backgroundImage, votes, overview, poster}) => {
  const navigation = useNavigation();
  const goToDetail = () => navigation.navigate("Detail", {
    id,
    title,
    backgroundImage,
    votes,
    overview,
    poster
  });
  return (
    <Container>
        <BG source={{uri: apiImage(backgroundImage)}} />
        <Content>
            <Poster url={poster} />
            <Data>
                <Title>{trimText(title, 30)}</Title>
                <VotesContainer>
                    <Votes votes={votes} />
                </VotesContainer>
                <Overview>{trimText(overview, 100)}</Overview>
                <TouchableOpacity onPress={goToDetail}> 
                    <Button>
                        <ButtonText>View details</ButtonText>
                    </Button>
                </TouchableOpacity>
            </Data>
        </Content>
    </Container>
  );
};
// TouchableOpacity을 통해 button을 커스텀 할 수 있다. TouchableOpacity 안에 button과 view, text를 넣어서

Slide.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired
}; // Slide는 prop type으로 데이터 값을 MoivePresenter에 넘겨 줌

export default Slide;