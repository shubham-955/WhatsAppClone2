import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import RNFetchBlob from 'react-native-fetch-blob';
let dirs = RNFetchBlob.fs.dirs;
let Show = 'file://' + dirs.SDCardDir + '/TabImages'

const Images = (props) => {
    console.log(props)
    const [loading, setLoading] = useState(false);
    const [display, setDisplay] = useState([]);

    useEffect(() => {
        GetImages()
    }, [])

    const GetImages = () => {
        setLoading(true);
        // console.log('images', dirs)
        try {
            RNFetchBlob.fs.isDir(dirs.SDCardDir + '/TabImages')
                .then(async (isDir) => {
                    if (isDir) {
                        RNFetchBlob.fs.ls(dirs.SDCardDir + '/TabImages').then(async (files) => {
                            // console.log(files);
                            let newFiles = files.map((value) => {
                                return value;
                            });
                            // console.log(newFiles);
                            setDisplay(newFiles);
                            setLoading(false);
                        })
                    }
                });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View>
            <View style={{ height: 50, flexDirection:'row', backgroundColor: '#075E54', alignItems: 'center', paddingLeft: 15 }}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <AntDesign name='arrowleft' size={25} color='white' />
                </TouchableOpacity>
                <Text style={{color:'white', fontSize:17, paddingLeft:15}}>Folder Images</Text>
            </View>
            {loading ?
                <ActivityIndicator size="large" color="grey" style={{ marginTop: 20 }} />
                :
                <FlatList
                    data={display}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => props.navigation.navigate('SingleImage', { item: item })}>
                            <Image
                                style={{ width: '90%', height: 200, margin: 20, resizeMode: 'cover' }}
                                source={{ uri: Show + '/' + item }}
                            />
                        </TouchableOpacity>
                    }
                />
            }
        </View>
    )
}

export default Images;