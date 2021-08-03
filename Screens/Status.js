import React from 'react'
import {
    View, StyleSheet, FlatList, ScrollView
} from 'react-native'

import { StudioJson } from './StudioJson'
import StudioStyle from './StudioStyle'

const Status = (props) => {
    return (

        <View style={{ flex: 1, }}>
            <ScrollView>
                <View>
                    <FlatList
                        data={StudioJson}
                        renderItem={({ item }) =>
                            <StudioStyle item={item} />
                        }
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default Status;

const styles = StyleSheet.create({

    container: {
        flex: 1
    },

    left: {

    },

    heading: {
        fontSize: 15,
        fontWeight: 'bold',
        opacity: 0.6
    },

    right: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 100,
    }


})


