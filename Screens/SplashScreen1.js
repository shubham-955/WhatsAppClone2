import React, { useEffect } from 'react'
import { View, Image } from 'react-native'

const SplashScreen1 = (props) => {

    useEffect(() => {
        setTimeout(() => {
            // props.navigation.navigate('Home');  
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'HomeScreen' }],
            });

        }, 1000);
    }, [])

    return (
            <View style={{flex: 1,  justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: 110, height: 110 }}
                    source={require('../src/img/whatsapplogo.png')}>
                </Image>
            </View>
    )
}

export default SplashScreen1;