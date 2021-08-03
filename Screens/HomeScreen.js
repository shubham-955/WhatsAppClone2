import React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Fab, Icon, Menu, NativeBaseProvider } from 'native-base';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Camera from './Camera'
import Chat from './Chat'
import Status from './Status'
import Calls from './Calls'

import { AuthContext } from '../src/Components/context';

const Tab = createMaterialTopTabNavigator();

const HomeScreen = (props) => {

    const {signOut} = React.useContext(AuthContext);
    
    return (
        <NativeBaseProvider>
            <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 60, backgroundColor: '#075E54' }}>
                        <View>
                            <Text style={{ color: 'white', paddingLeft: 15, fontWeight: 'bold', fontSize: 20 }}>WhatsApp</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => alert('For Emoji Section')}>
                                <View style={{ width: 35, alignItems: 'center', justifyContent: 'center', height: 35, backgroundColor: '#075E54', borderRadius: 20, marginRight: 15 }}>
                                    <EvilIcons name="search" size={30} color="white" />
                                </View>
                            </TouchableOpacity>
                            <Menu
                                style={{ width: 200, height: 295, bottom: 45, right: 3 }}
                                trigger={(triggerProps) => {
                                    return (
                                        <TouchableOpacity accessibilityLabel="More options menu" {...triggerProps}>
                                            <View style={{ width: 35, alignItems: 'center', justifyContent: 'center', height: 35, backgroundColor: '#075E54', borderRadius: 20, marginRight: 15 }}>
                                                <Entypo name="dots-three-vertical" size={22} color="white" />
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }}
                            >
                                <Menu.Item style={{ marginBottom: -10 }}>New Group</Menu.Item>
                                <Menu.Item style={{ marginBottom: -10 }}>New broadcast</Menu.Item>
                                <Menu.Item style={{ marginBottom: -10 }}>Linked Devices</Menu.Item>
                                <Menu.Item style={{ marginBottom: -10 }}>Starred messages</Menu.Item>
                                <Menu.Item style={{ marginBottom: -10 }} onPress={()=>props.navigation.navigate('Images')}>Images</Menu.Item>
                                <Menu.Item style={{ marginBottom: 5 }} onPress={()=>{signOut()}}>Sign Out</Menu.Item>
                            </Menu>
                        </View>
                    </View>
                <View style={{ flex: 1, height: 50, backgroundColor: "#075E54" }}>
                    <Tab.Navigator
                        tabBarOptions={{
                            activeTintColor: 'white',
                            labelStyle: { fontWeight: 'bold', fontSize: 15 },
                            indicatorStyle: { borderWidth: 1.5, borderColor: 'white' },
                            style: { backgroundColor: '#075E54' }
                        }}
                        initialRouteName="CHAT"
                    >
                        <Tab.Screen name="C" component={Camera} />
                        <Tab.Screen name="CHAT" component={Chat}/>
                        <Tab.Screen name="STATUS" component={Status} />
                        <Tab.Screen name="CALLS" component={Calls} />
                    </Tab.Navigator>
                </View>
            </View>
        </NativeBaseProvider>

    )
};

export default HomeScreen;
