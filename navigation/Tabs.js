import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Movies from '../screens/Movies';
import TV from '../screens/Tv';
import Favs from '../screens/Favs';
import Search from '../screens/Search';
import { useLayoutEffect } from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Platform } from 'react-native';

const Tabs = createBottomTabNavigator();

const getHeaderName = route =>
    getFocusedRouteNameFromRoute(route) || 'Movies';

export default ({ navigation, route }) => {
    useLayoutEffect(() => {
        const name = getHeaderName(route);
        navigation.setOptions({
            title: name
        });
    },[route]);
    return(
        <Tabs.Navigator 
            screenOptions={({route}) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName = Platform.OS === "android" ? "md-" : "ios-";
                    if(route.name === "Movies"){
                        iconName += "film";
                    } else if (route.name === "TV"){
                        iconName += "tv";
                    }
                    else if (route.name === "Search"){
                        iconName += "search";
                    }
                    else if (route.name === "Discovery"){
                        iconName += "heart";
                    }
                    return <Ionicons 
                                name={iconName} 
                                color={focused ? "white" : "grey"}
                                size={26} 
                            />;
                }
            })}
            tabBarOptions={{
                showLabel: false,
                style: {
                    backgroundColor: "black",
                    borderTopColor: "black"
                }
            }}
        >
            <Tabs.Screen name="Movies"component={Movies} />
            <Tabs.Screen name="TV" component={TV} />
            <Tabs.Screen name="Search" component={Search} />
            <Tabs.Screen name="Discovery" component={Favs} />    
        </Tabs.Navigator>
    );
}