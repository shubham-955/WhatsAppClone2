import React, { useEffect } from 'react'
import { View, Text, Image } from 'react-native'

const SplashScreen = (props) => {

    useEffect(() => {
        setTimeout(() => {
            // props.navigation.navigate('Home');  
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'SignInScreen' }],
            });

        }, 1000);
    }, [])

    return (
        <View style={{flex: 1}}>
            <View style={{flex: 2,  justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: 110, height: 110 }}
                    source={require('../src/img/whatsapplogo.png')}>
                </Image>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{fontSize: 12, color: "grey"}}>from</Text>
                <Text style={{fontSize: 15, color: "#25D366", letterSpacing: 2, fontWeight: "bold"}}>FACEBOOK</Text>
            </View>
        </View>
    )
}

export default SplashScreen;