// importing the Functional Component
import React from 'react'
// importing the required components
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native'

const DataItem = (props) => {
    // console.log(props)
    return (
        // Main Container
        <View style={styles.container1}>
            {/* This is the Dp container */}
            <TouchableWithoutFeedback>
                <Image
                    source={{ uri: props.item.image }}
                    style={styles.imgContainer}>
                </Image>
            </TouchableWithoutFeedback>
            {/* This is the List Items Text Container */}
            <TouchableWithoutFeedback onPress={() => props.navigation.navigate('IndividualScreen', { item: props.item })}>
                <View style={styles.myData}>
                    <Text style={styles.Itemtext}>{props.item.companyName}</Text>
                    <Text style={styles.Itemtext1}>{props.item.owner}</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container1: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#e8e2cc',
        flexDirection: 'row',
        alignItems: 'center'
    },
    imgContainer: {
        width: 40,
        height: 40,
        marginLeft: 15,
        borderRadius: 30,
        backgroundColor: '#e0dcce'
    },
    myData: {
        paddingVertical: 12,
        paddingLeft: 15,
        flexDirection: 'column'
    },
    Itemtext: {
        fontSize: 17,
    },
    Itemtext1: {
        fontSize: 15,
        opacity: 0.5
    }
});

export default DataItem;

