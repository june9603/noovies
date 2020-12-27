import React, { useState } from "react";
import { PanResponder, Dimensions, Animated} from "react-native";
import styled from "styled-components/native";
import { apiImage } from "../../api";

const {width:WIDTH, height:HEIGHT} = Dimensions.get("window")

const Container = styled.View`
    flex: 1;
    background-color: black;
    align-items: center;
`;

const Poster = styled.Image`
    border-radius: 20px;
    width:100%;
    height:100%;
`;

const styles = {
    top: 80,
    height: HEIGHT / 1.5,
    width: "90%",
    position: "absolute"
};


export default ({results}) => {
    const [topIndex, setTopIndex] = useState(0);
    // 왼쪽 오른쪽으로 카드를 버린 후 다음 카드가 첫번째 인덱스가 되서 첫 카드로 인식
    const nextCard = () => setTopIndex(currentValue => currentValue + 1);
    const position = new Animated.ValueXY();
    // PanResponder는 사용자가 화면을 누르거나 드래그 하는 등의 제스처를 인식할 수 있게 해준다
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        // resonderMove로 현재 방향을 알 수 있다.
        onPanResponderMove: (evt, {dx, dy}) => {
            position.setValue({x: dx, y: dy});
        },
        onPanResponderRelease: (evt, {dx, dy}) => {
            if(dx >= 300){
                // 카드를 오른쪽으로 버리는 코드
                Animated.spring(position, {
                    toValue: {
                        x: WIDTH + 200,
                        y: dy
                    },
                    useNativeDriver: true
                }).start(nextCard);
            } else if(dx <= -300){
                // 카드를 왼쪽으러 버리는 코드
                Animated.spring(position, {
                    toValue: {
                        x: -WIDTH -200,
                        y: dy
                    },
                    useNativeDriver: true
                }).start(nextCard);
            } else {
                // spring 에서는 어떤 값을 가지면 그걸 애니메이션으로 만든다. 100에서 0까지 천천히
                Animated.spring(position, {
                    toValue: {
                        x: 0,
                        y: 0
                    },
                    useNativeDriver: true
                }).start();
            }
        }
    });
    // card를 회전하는 방법
    const roationValues = position.x.interpolate({
        inputRange: [-255, 0 ,255], // 음수에서 양수로 interpolate 해야된다 // x값이 이거라면
        outputRange: ["-8deg", "0deg", "8deg"], // 문자열을 통해 각도 조절 가능  // output으로 이 값들을 준다는 의미
        extrapolate: "clamp"
    });
    // card 투명도 설정, opacity 설정
    const secondCardOpacity = position.x.interpolate({
        inputRange: [-255, 0 ,255],
        outputRange: [1, 0.2, 1],
        extrapolate: "clamp"
    });
    // card 크기가 작아지고 커기는 효과 설정
    const secondCardScale = position.x.interpolate({
        inputRange: [-255, 0 ,255],
        outputRange: [1, 0.8, 1],
        extrapolate: "clamp"
    });
    return (
        <Container> 
            {results.map((result, index) => {
                // 만약 카드가 0이고 topIndex가 10이라면 카드가 버려졌단 뜻, 이 카드는 다시 Render 하지 않겠다는 의미
                if (index < topIndex){
                    return null; 
                } else if (index === topIndex) {
                    return(
                        // annimated는 View로 작동 할 수 없고 Animnated.View 태그를 사용해야한다.
                        <Animated.View 
                            style={{
                                ...styles,
                                zIndex: 1, // 첫 번째 카드는 z-Index를 1로 가진다.
                                
                                transform: [
                                    { rotate: roationValues },
                                    ...position.getTranslateTransform() // getTranslateTransform 는 x와 y에 대해서 css 표현을 얻어내는 함수.
                                ]
                            }}
                            key={result.id} {...panResponder.panHandlers}
                        >
                            <Poster source={{uri: apiImage(result.poster_path)}} />
                        </Animated.View>
                    );
                    } else if(index === topIndex + 1){
                        return (
                            <Animated.View 
                                style={{
                                    ...styles,
                                    zIndex: -index,
                                    opacity: secondCardOpacity, // 투명도 설정
                                    transform: [
                                        {scale: secondCardScale} // 크기 애니메이션
                                    ]
                                }}
                                key={result.id} {...panResponder.panHandlers}
                            >
                                <Poster source={{uri: apiImage(result.poster_path)}} />
                            </Animated.View>
                        );
                    } else{
                        return (
                            <Animated.View 
                                style={{
                                    ...styles,
                                    zIndex: -index,
                                    opacity: 0 // 세번째 카드는 안 보여야 하니 투명도는 0
                                }}
                                key={result.id} {...panResponder.panHandlers}
                            >
                                <Poster source={{uri: apiImage(result.poster_path)}} />
                            </Animated.View>
                        )
                    }
            })}
        </Container>
    );
};