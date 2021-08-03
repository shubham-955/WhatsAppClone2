import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicon from 'react-native-vector-icons/Ionicons'

import Sound from 'react-native-sound'

const StudioStyle = (props) => {
    // for like 
    const [isLiked, setIsLiked] = useState(false);
    //  for save
    const [isSaved, setIsSaved] = useState(false)

    // like sound
    const buttonPress = new Sound(require('../src/audio/sound.mp3'))
    const playSound = () => {
        buttonPress.play((sucess) =>
            buttonPress)
    }
    //  onlike function
    const onLikePressed = () => {
        playSound()
        setIsLiked(!isLiked);
    }

    //   onSave (is not saved function)
    const onSavePressed = () => {
        setIsSaved(!isSaved);
    }

    return (
        <View style={{ flex: 1, marginBottom: 14 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 10 }}>

                {/* userImg */}
                <Image source={props.item.userImg} style={styles.UserImg} />

                {/* userName,PostTime */}
                <View style={{ flexDirection: 'column', marginLeft: 10, }}>
                    <Text>{props.item.userName}</Text>
                    <Text>{props.item.postTime}</Text>
                </View>

                {/* ... */}
                <View style={{ position: 'absolute', right: 10, bottom:30 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 25 }}>...</Text>
                </View>
            </View>

            {/* mainImg */}
            <View style={{}}>
                <Image source={props.item.postImg} style={{ width: '100%', height: 450, resizeMode: 'contain' }} />
            </View>

            {/* hold them and space beetween left side heart,comment and right side save */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12, paddingTop: 8, backgroundColor: 'white' }}>

                {/* heart */}
                <View style={{ flexDirection: 'row', marginRight: 10, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>

                        <TouchableOpacity onPress={onLikePressed}>
                            {isLiked ?
                                <Ionicon name='heart' size={25} color={"#e73838"} />

                                : <Ionicon name='heart-outline' size={25} color={"#545454"} />
                            }
                        </TouchableOpacity>

                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 5 }}>{props.item.likes}</Text>
                    </View>

                    {/* comment */}
                    <View style={{ flexDirection: 'row', paddingLeft: 15 }}>
                        <Ionicon name='md-chatbubble-outline' size={22} />
                    </View>
                </View>
                {/* bookmark */}
                <View>
                    <TouchableOpacity onPress={onSavePressed}>
                        {isSaved ?
                            <FontAwesome name='bookmark' size={24} />
                            : <FontAwesome name='bookmark-o' size={24} />
                        }
                    </TouchableOpacity>
                </View>
            </View>
            {/* for caption */}
            <View style={{ backgroundColor: 'white', paddingVertical: 8, paddingLeft: 10, flexDirection: 'row', }}>
                <Image source={props.item.userImg} style={{ width: 22, height: 22, borderRadius: 11, marginRight: 5 }} />
                <Text style={{ fontWeight: 'bold', fontSize: 14, }}>{props.item.userName}</Text>
                <Text style={{ fontSize: 13, marginLeft: 7 }}>{props.item.caption}</Text>
            </View>
        </View >
    )
}

export default StudioStyle;

const styles = StyleSheet.create({

    UserImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        resizeMode: 'cover'
    }
})


