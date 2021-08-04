import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import RNFetchBlob from 'react-native-fetch-blob';
let dirs = RNFetchBlob.fs.dirs;
let Show = 'file://' + dirs.SDCardDir + '/TabImages'

const SingleImage = (props) => {
    // console.log('SingleImages.....', props)
    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: 50, backgroundColor: '#075E54', justifyContent: 'center', paddingLeft: 15 }}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <AntDesign name='arrowleft' size={25} color='white' />
                </TouchableOpacity>
            </View>
            <View style={{ height: 510, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    style={{ width: '90%', height: 200, margin: 20, backgroundColor: 'yellow', resizeMode: 'cover' }}
                    source={{ uri: Show + '/' + props.route.params.item }}
                />
            </View>
            <View style={{ color: 'white', borderTopWidth: 0.3, borderTopColor: 'black', opacity: 0.5 }}>

            </View>
        </View>
    )
}

export default SingleImage;
