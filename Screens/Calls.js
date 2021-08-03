import React, { useState } from 'react'
import { View, Image, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import {
    useDisclose,
    IconButton,
    Stagger,
    NativeBaseProvider,
} from "native-base"
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-crop-picker';


const Calls = () => {
    const { isOpen, onToggle } = useDisclose();
    const [image, setImage] = useState(null)
    const [images, setImages] = useState(null)

    const pickMultiple = () => {
        onToggle(isOpen);
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            sortOrder: 'desc',
            includeExif: true,
            forceJpg: true,
        })
            .then((images) => {
                // setImage(null)
                setImages(
                    images.map((i) => {
                        console.log('received image', i);
                        return {
                            uri: i.path,
                            width: i.width,
                            height: i.height,
                            mime: i.mime,
                        };
                    }),
                );
            })
            .catch((e) => alert(e));
    }

    const pickSingleWithCamera = (cropping, mediaType = 'photo') => {
        onToggle(isOpen);
        ImagePicker.openCamera({
          cropping: cropping,
          width: 500,
          height: 500,
          includeExif: true,
          mediaType,
        })
          .then((image) => {
            console.log('received image', image);
            setImage({
                    uri: image.path,
                    width: image.width,
                    height: image.height,
                    mime: image.mime,
            })
            // setImages(null)
          })
          .catch((e) => alert(e));
      }

    const renderImage = (image) => {
        return (
            <Image
                style={{ width: 320, height: 300, resizeMode: 'cover' }}
                source={image}
            />           
            );
    }
    
    const renderAsset = (image) => {
        return renderImage(image);
    }


    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <ScrollView style={{marginTop:10}}>
                    {image ? renderAsset(image) : null}
                    {images
                        ? images.map((i) => (
                            <View key={i.uri} style={{width:'100%',paddingVertical:10, resizeMode:'stretch'}}>{renderAsset(i)}</View>
                        ))
                        : null}
                </ScrollView>
                <View style={{ position: 'absolute', bottom: 15, right: 15 }}>
                    <TouchableOpacity >
                        <Stagger
                            visible={isOpen}
                            initial={{ opacity: 0, scale: 0, translateY: 34 }}
                            animate={{
                                translateY: 0, scale: 1, opacity: 1,
                                transition: {
                                    type: "spring", mass: 0.8,
                                    stagger: {
                                        offset: 30, reverse: true
                                    },
                                },
                            }}
                            exit={{
                                translateY: 34, scale: 0.5, opacity: 0,
                                transition: {
                                    duration: 100,
                                    stagger: {
                                        offset: 30, reverse: true,
                                    },
                                },
                            }}
                        >
                            <IconButton
                                mb={4}
                                variant="solid"
                                rounded="full"
                                style={{ backgroundColor: '#25D366' }}
                                icon={<Entypo size={24} name="camera" color='white' />}
                                onPress={()=>pickSingleWithCamera(false)}
                            />
                            <IconButton
                                mb={4}
                                variant="solid"
                                rounded="full"
                                style={{ backgroundColor: '#25D366' }}
                                icon={<Entypo size={24} name="images" color='white' />}
                                onPress={() => pickMultiple()}
                            />
                        </Stagger>
                        <IconButton
                            variant="solid"
                            rounded="full"
                            size='lg'
                            style={{ backgroundColor: '#25D366' }}
                            onPress={onToggle}
                            icon={<Ionicons size={32} name="md-add" color='white' />}
                        >
                            Press me
                        </IconButton>
                    </TouchableOpacity>
                </View>
            </View>
        </NativeBaseProvider >
    )
};
export default Calls;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
});