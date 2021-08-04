import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
let dirs = RNFetchBlob.fs.dirs;
let Show = 'file://' + dirs.SDCardDir + '/TabImages'

const Images = () => {

    const [loading, setLoading] = useState(false);
    const [display, setDisplay] = useState([]);

    useEffect(() => {
        GetImages()
    }, [])

    const GetImages = () => {
        setLoading(true);
        console.log('images', dirs)
        try {
            RNFetchBlob.fs.isDir(dirs.SDCardDir + '/TabImages')
                .then(async (isDir) => {
                    if (isDir) {
                        RNFetchBlob.fs.ls(dirs.SDCardDir + '/TabImages').then(async (files) => {
                            console.log(files);
                            let newFiles = files.map((value) => {
                                return value;
                            });
                            console.log(newFiles);
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
            {loading ?
                <ActivityIndicator size="large" color="grey" style={{ marginTop: 20 }} />
                :
                    <FlatList
                       data={display}
                       renderItem={({item}) => 
                       <Image
                         style={{width:'90%', height:200, margin:20, backgroundColor:'yellow', resizeMode:'cover'}}
                         source={{ uri: Show + '/' + item }}
                       />}
                    />
            }
        </View>
    )
}

export default Images;