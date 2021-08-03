import React, { useState, useEffect, useMemo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen1 from './Screens/SplashScreen1';
import HomeScreen from './Screens/HomeScreen';
import IndividualScreen from './Screens/IndividualScreen';
import GetContacts from './Screens/GetContacts'
import  Images  from './Screens/Images';
import { ActivityIndicator, View } from 'react-native';
import RootStackScreen from './Screens/RootStackScreen';
import { AuthContext } from './src/Components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const App = () => {
    // const [isLoading, setIsLoading] = useState(true);
    // const [userToken, setUserToken] = useState(null);

    const initialLoginState = {
        isLoading: true,
        userName: null,
        userToken: null
    };

    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGIN':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    userName: null,
                    userToken: null,
                    isLoading: false,
                };
            case 'REGISTER':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
        }
    }

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

    const authContext = useMemo(() => ({
        signIn: async (userName, password) => {
            // setUserToken('abcd');
            // setIsLoading(false);
            let userToken;
            userToken = null;
            if (userName == 'user' && password == 'pass') {
                try {
                    userToken = 'fdffdf';
                    await AsyncStorage.setItem('userToken', userToken);
                } catch (e) {
                    console.log(e);
                }
            }
            dispatch({ type: 'LOGIN', id: userName, token: userToken })
        },
        signOut: async () => {
            // setUserToken(null);
            // setIsLoading(false);
            try {
                await AsyncStorage.removeItem('userToken');
            } catch (e) {
                console.log(e);
            }
            dispatch({ type: 'LOGOUT'});
        },
    }), []);

    useEffect(() => {
        setTimeout(async() => {
            let userToken;
            userToken = null;
            try {
                userToken = await AsyncStorage.getItem('userToken');
            } catch (e) {
                console.log(e);
            }
            // setIsLoading(false)
            dispatch({ type: 'REGISTER', token: userToken })
        }, 1000);
    }, []);

    if (loginState.isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {loginState.userToken !== null ? (
                    <Stack.Navigator initialRouteName="SplashScreen1">
                        <Stack.Screen name="SplashScreen1" component={SplashScreen1} options={{ headerShown: false }} />
                        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="IndividualScreen" component={IndividualScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="GetContacts" component={GetContacts} options={{ headerShown: false }} />
                        <Stack.Screen name="Images" component={Images} options={{ headerShown: false }} />
                    </Stack.Navigator>
                )
                    :
                    <RootStackScreen />
                }
            </NavigationContainer>
        </AuthContext.Provider>
    )
};

export default App;