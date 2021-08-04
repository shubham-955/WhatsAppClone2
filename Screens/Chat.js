import React, { useState, useEffect } from 'react';
import {
    TouchableOpacity,
    View,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { Fab, Icon, NativeBaseProvider } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DataItem from '../DataItem'

function Chat(props) {
    
    const { navigation } = props;

    useEffect(() => {
        GetData()
    }, [])

    const [myJsonData, setMyJsondata] = useState([]);
    const [loading, setLoading] = useState(false);

    const GetData = () => {
        setLoading(true)
        fetch('https://jsonkeeper.com/b/JR30', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('response', json)
                setMyJsondata(json)
                setLoading(false)
            })
    }
    return (
        <NativeBaseProvider>
            <View>
                <View>
                    {loading ?
                        <ActivityIndicator size="large" color="grey" style={{ marginTop: 20 }} />
                        :
                        <FlatList
                            data={myJsonData}
                            renderItem={({ item }) =>
                                <DataItem
                                    navigation={navigation}
                                    item={item}
                                />
                            }
                            keyExtractor={(item) => item.companyName}
                        />
                    }
                </View>
                <TouchableOpacity >
                    <Fab
                        style={{ backgroundColor: '#25D366' }}
                        position="absolute"
                        size="sm"
                        icon={<Icon color="white" as={<MaterialCommunityIcons name="android-messages" />} size={6} right={0.9} />}
                        onPress={() => props.navigation.navigate('GetContacts')}
                    />
                </TouchableOpacity>
            </View>
        </NativeBaseProvider>
    )
}

export default Chat;