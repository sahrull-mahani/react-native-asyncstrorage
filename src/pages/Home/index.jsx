import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ILogo } from '../../assets'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = ({ navigation }) => {
    const [userDetails, setUserDetails] = useState()

    useEffect(() => {
        // panggil data
        getUserData().then(userDetails)
    }, [])

    const getUserData = async () => {
        try {
            let data = await AsyncStorage.getItem('userData')
            if (data) {
                setUserDetails(JSON.parse(data))
            }
        } catch (er) {
            Alert.alert('Failed', er)
        }
    }

    const logout = async () => {
        AsyncStorage.clear()
        navigation.navigate('SplashScreen')
    }

    return (
        <View style={styles.container}>
            <Image source={ILogo} style={styles.logo} resizeMode='contain' />
            <Text>{userDetails && userDetails.fullname}</Text>
            <TouchableOpacity onPress={logout}>
                <Text style={styles.logout}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        height: 170
    },
    logout: {
        fontWeight: '800',
        fontSize: 25,
        color: '#f00330'
    }
})