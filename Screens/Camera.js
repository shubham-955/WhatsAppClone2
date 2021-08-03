import React, { useState, useEffect } from 'react'
import {
    PermissionsAndroid,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';
import RNFetchBlob from 'react-native-fetch-blob';
import RNFS from 'react-native-fs';

function Camera() {

    useEffect(() => {
        checkAndGrantStoragePermission()
    }, [])

    const [{ cameraRef }, { takePicture }] = useCamera(null);

    const [storagePermission, setStoragePermission] = useState(false)

    function checkAndGrantStoragePermission() {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then((isPermitted) => {
            if (isPermitted) {
                setStoragePermission(true);
            } else {
                PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    { message: 'Please access to save image', title: 'Permission Grant' }).then(() => {
                        setStoragePermission(true);
                    });
            }
        });
    }

    const captureHandle = async () => {
        try {
            const data = await takePicture();
            const fileName = data.uri;
            const spilttedArray = fileName.split('/');
            const imageName = spilttedArray[spilttedArray.length - 1];
            const folderPath = '/storage/emulated/0/TabImages'
            const newFilePath = folderPath + '/' + imageName;
            RNFetchBlob.fs.isDir(folderPath).then((isDir) => {
                if (isDir) {
                    RNFS.moveFile(fileName, newFilePath).then(() => {
                        console.log('Image has moved', fileName, '---to---', newFilePath)
                    }).catch(error => {
                        console.log(error);
                    });
                } else {
                    RNFetchBlob.fs.mkdir(folderPath).then(() => { 
                        RNFS.moveFile(fileName, newFilePath).then(() => {
                            console.log('Image has moved', fileName, '---to---', newFilePath)
                        }).catch(error => {
                            console.log(error);
                        }); 
                    })
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <RNCamera
                ref={cameraRef}
                type={RNCamera.Constants.Type.back}
                style={{ flex: 1 }}
            >
                <TouchableOpacity onPress={() => captureHandle()}>
                    <View style={{
                        width: 100, height: 60,
                        backgroundColor: 'red',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20
                    }}>
                        <Text>Capture</Text>
                    </View>
                </TouchableOpacity>
            </RNCamera>
        </View>
    )
}
export default Camera;