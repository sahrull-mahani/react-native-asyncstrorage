import { Alert, Image, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { IBack } from '../../assets'
import { Button, Input, Loading } from '../../components'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SignUp = ({ navigation }) => {
    const [inputs, setInputs] = useState({ fullname: '', phone: '', password: '', repassword: '' })
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

        if (!inputs.fullname) {
            handleError('Please input fullname', 'fullname')
            isValid = false
        }
        if (!inputs.phone) {
            handleError('Please input phone', 'phone')
            isValid = false
        }

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

        if (!inputs.repassword) {
            handleError('Please input repassword', 'repassword')
            isValid = false
        } else if (inputs.repassword.length < 5) {
            handleError('Re-Password must more then 5', 'repassword')
            isValid = false
        } else if (inputs.repassword !== inputs.password) {
            handleError('Re-Password dosen\' match with password', 'repassword')
            isValid = false
        }

        if (isValid) {
            register()
        }
    }

    const register = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            try {
                AsyncStorage.setItem('userData', JSON.stringify(inputs))
                navigation.navigate('SignIn')
                console.log(inputs)
            } catch (e) {
                Alert.alert('Failed', e)
            }
        }, 3000)
    }

    return (
        <View style={styles.container}>
            <Loading visible={loading} />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                    <Image source={IBack} style={styles.iback} />
                </TouchableOpacity>
                <Text style={styles.title}>Create an account</Text>
            </View>

            <ScrollView>
                <View style={styles.form}>
                    <Input placeholder='Enter Fullname...' label='Fullname'
                        error={errors.fullname}
                        onFocused={() => { handleError(null, 'fullname') }}
                        onChangeText={value => handleChange(value, 'fullname')}
                    />
                    <View style={{ height: 10 }} />
                    <Input placeholder='Enter Phone...' label='Phone'
                        error={errors.phone}
                        onFocused={() => { handleError(null, 'phone') }}
                        onChangeText={value => handleChange(value, 'phone')}
                        inputMode='tel'
                    />
                    <View style={{ height: 10 }} />
                    <Input placeholder='Enter Email...' label='Email'
                        error={errors.email}
                        onFocused={() => { handleError(null, 'email') }}
                        onChangeText={value => handleChange(value, 'email')}
                        inputMode='email'
                    />
                    <View style={{ height: 10 }} />
                    <Input placeholder='Enter Password...' label='Password' password
                        error={errors.password}
                        onFocused={() => { handleError(null, 'password') }}
                        onChangeText={value => handleChange(value, 'password')}
                    />
                    <View style={{ height: 10 }} />
                    <Input placeholder='Enter Repassword...' label='Repassword' password
                        error={errors.repassword}
                        onFocused={() => { handleError(null, 'repassword') }}
                        onChangeText={value => handleChange(value, 'repassword')}
                    />

                    <View style={{ height: 50 }} />

                    <Button label='Create an account' onPress={validate} />

                    <View style={styles.textBottom}>
                        <Text style={styles.text1}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('SignIn') }}>
                            <Text style={styles.text2}>Sign In here</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 55,
        paddingHorizontal: 25,
        borderBottomWidth: 1.5,
        borderBottomColor: '#e3e3e3'
    },
    iback: {
        height: 21,
        width: 11,
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        color: '#3C3737',
        fontWeight: '600',
        flex: 1,
    },
    form: {
        paddingHorizontal: 25,
        flex: 1,
        paddingVertical: 25,
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