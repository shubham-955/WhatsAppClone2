import React from 'react'
import { View, Text, Image, TouchableOpacity, Pressable, TouchableWithoutFeedback } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import {
    Menu,
    NativeBaseProvider
} from "native-base"

const Header = (props) => {
    // console.log('Headerprops', props)
    return (
        <View style={{ backgroundColor: '#075E54', padding: 10, elevation: 5, height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => props.allProps.navigation.goBack()}>
                    <View>
                        <AntDesign name='arrowleft' size={25} color='white' />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert('You press Dp')}>
                    <Image
                        source={{ uri: props.title1 }}
                        style={{ width: 35, height: 35, marginLeft: 3, borderRadius: 20, backgroundColor: 'grey' }}>
                    </Image>
                </TouchableOpacity>

                <TouchableOpacity onPress={() =>alert('You press Name')}>
                    <View style={{ width: 140, height: 60, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 18, marginLeft: 7, color: 'white' }}>{props.title}</Text>
                    </View>
                </TouchableOpacity>

            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => alert('For Video Call')}>
                    <View style={{ width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginRight: 15 }}>
                        <MaterialIcons name='videocam' size={25} color='white' />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert('For Audio Call')}>
                    <View style={{ width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                        <MaterialIcons name='call' size={22} color='white' />
                    </View>

                </TouchableOpacity>
                <View style={{ width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginRight: 5 }}>
                    <NativeBaseProvider>
                        <Menu
                            style={{ width: 200, height: 295, bottom: 40, right: 3 }}
                            trigger={(triggerProps) => {
                                return (
                                    <TouchableOpacity accessibilityLabel="More options menu" {...triggerProps}>
                                        <View style={{ width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }} >
                                            <Entypo name="dots-three-vertical" size={20} color="white" />
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                        >
                            <Menu.Item style={{ marginBottom: -10 }}>View contact</Menu.Item>
                            <Menu.Item style={{ marginBottom: -10 }}>Media, links and docs</Menu.Item>
                            <Menu.Item style={{ marginBottom: -10 }}>Search</Menu.Item>
                            <Menu.Item style={{ marginBottom: -10 }}>Mute notifications</Menu.Item>
                            <Menu.Item style={{ marginBottom: -10 }}>Wallpaper</Menu.Item>
                            <Menu.Item style={{ marginBottom: 5 }}>More</Menu.Item>
                        </Menu>
                    </NativeBaseProvider>
                </View>

            </View>
        </View>
    )
}

export default Header;