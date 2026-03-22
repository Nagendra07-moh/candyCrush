import { View, Text,ImageBackground,Image,ActivityIndicator } from 'react-native'
import React,{useEffect} from 'react'
import { commonStyles } from '../styles/commonStyles'
import { resetAndNavigate } from '../utils/NavigationUtil'

const SplashScreen: React.FC = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      resetAndNavigate('Home')
    }, 2500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <ImageBackground source={require('../assets/images/bg.png')} style={commonStyles.container}>
      <Image source={require('../assets/text/logo.png')} style={commonStyles.img} />
      <ActivityIndicator size="large" color="#f1d38b" />
    </ImageBackground>
  )
}

export default SplashScreen