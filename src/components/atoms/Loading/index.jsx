import { ActivityIndicator, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'

const Loading = ({ visible = false }) => {
    const { height, width } = useWindowDimensions()
    return (
        visible && (
            <View style={[styles.container, { height, width }]}>
                <View style={styles.loader}>
                    <ActivityIndicator size='large' color='green' />
                    <Text style={styles.title}>Loading...</Text>
                </View>
            </View>
        )
    )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,.5)',
        justifyContent: 'center'
    },
    loader: {
        height: 70,
        backgroundColor: 'white',
        marginHorizontal: 50,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
    },
    title: {
        fontSize: 14,
        fontWeight: '600'
    }
})