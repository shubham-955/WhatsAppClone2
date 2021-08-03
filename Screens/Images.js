import React, {useState, useEffect} from 'react';
import { View, Text, FlatList } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import RNFS from 'react-native-fs';
let dirs = RNFetchBlob.fs.dirs;
let Show = dirs.SDCardDir + '/TabImages'


const Images = () => {

    const [display, setDisplay] = useState([])

    useEffect(() => {
        GetImages()
    }, [])

    function myFunction(value, index, array){
         return value;
    }

    const GetImages = () => {
        console.log('images',dirs)
        try {
            RNFetchBlob.fs.isDir(dirs.SDCardDir + '/TabImages')
            .then(async(isDir) => {
                if(isDir){
                    RNFetchBlob.fs.ls(dirs.SDCardDir + '/TabImages').then(async (files) => {
                        console.log(files);
                        let newFiles = files.map(myFunction);
                        console.log(newFiles);
                        setDisplay(newFiles);
                    })
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View>
         <Text>
             {display}
         </Text>
        </View>
    )
}


export default Images;