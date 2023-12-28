import { Alert, Image, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ILogo } from '../../assets'
import { Button, Input, Loading } from '../../components/atoms'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignIn = ({ navigation }) => {
    const [inputs, setInputs] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const handleChange = (value, input) => {
        setInputs(prevState => ({ ...prevState, [input]: value }))
    }

    const handleError = (errMessage, input) => {
        setErrors(prevState => ({ ...prevState, [input]: errMessage }))
    }

    // Validate
    const validate = () => {
        Keyboard.dismiss()
        let isValid = true

        if (!inputs.email) {
            handleError('Please input email', 'email')
            isValid = false
        } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError('Invalid email!', 'email')
            isValid = false
        }

        if (!inputs.password) {
            handleError('Please input password', 'password')
            isValid = false
        } else if (inputs.password.length < 5) {
            handleError('Password must more then 5', 'password')
            isValid = false
        }

        if (isValid) {
            login()
        }
    }

    const login = () => {
        setLoading(true)
        setTimeout(async () => {
            let data = await AsyncStorage.getItem('userData')
            setLoading(false)
            if (data) {
                let userData = JSON.parse(data)
                if (inputs.email == userData.email && inputs.password == userData.password) {
                    navigation.navigate('Home')
                    AsyncStorage.setItem(
                        'userData',
                        JSON.stringify({ ...userData, loggedIn: true })
                    )
                    console.log('Login: ', userData)
                } else {
                    Alert.alert('Error', 'userdata tidak terdaftar!')
                }
            } else {
                Alert.alert('Error', 'User data not found!')
            }
        }, 2000)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Loading visible={loading} />
            <ScrollView>
                <View style={styles.wrapper}>
                    <Image source={ILogo} style={styles.logo} resizeMode='contain' />
                    <Text style={[styles.name, { color: '#2952a8' }]}>SIBAKTI</Text>
                    <Text style={styles.name}>Sign In</Text>
                </View>
                <Input label='Email' placeholder='Masuken email...'
                    error={errors.email}
                    onFocused={() => { handleError(null, 'email') }}
                    onChangeText={value => handleChange(value, 'email')}
                    inputMode='email'
                />
                <View style={{ marginBottom: 25 }} />
                <Input label='Password' placeholder='Masukan password...' password
                    error={errors.password}
                    onFocused={() => { handleError(null, 'password') }}
                    onChangeText={value => handleChange(value, 'password')}
                />
                <View style={{ marginBottom: 10 }} />
                <Text style={styles.forgot}>Forgot Passowrd ?</Text>
                <Button label='Sign In' onPress={validate} />

                <View style={styles.textBottom}>
                    <Text style={styles.text1}>haven't an account</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.text2}>Sign Up here</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25
    },
    wrapper: {
        alignItems: 'center',
        marginBottom: 30
    },
    logo: {
        width: '25%',
        height: 120,
        marginTop: 20,
        marginBottom: 10
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#373737'
    },
    forgot: {
        fontSize: 12,
        fontWeight: '500',
        color: '#FF5E03'
    },
    textBottom: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text1: {
        color: '#8C8787'
    },
    text2: {
        color: '#FF5E03',
        marginLeft: 5
    }
})