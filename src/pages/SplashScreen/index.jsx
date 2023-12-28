import { Image, ImageBackground, StyleSheet, Text } from 'react-native'
import React, { useEffect } from 'react'
import { ILogo, ILbackground } from '../../assets'

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('SignIn')
    }, 2000)
  }, [])
  return (
    <ImageBackground source={ILbackground} style={styles.container}>
      <Image source={ILogo} style={styles.logo} resizeMode='contain' />
      <Text style={styles.name}>SIBAKTI</Text>
    </ImageBackground>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2952a8',
    marginTop: 30,
  },
  logo: {
    width: '50%'
  }
})