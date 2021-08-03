import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';

const RootStack = createStackNavigator();

const RootStackScreen = () => {
    return (
            <RootStack.Navigator initialRouteName="SplashScreen">
                <RootStack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }}/>
                <RootStack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }}/>
            </RootStack.Navigator>
    )
};

export default RootStackScreen;