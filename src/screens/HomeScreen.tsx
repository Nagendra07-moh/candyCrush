import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import Animated,{
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated'
import React,{useEffect} from 'react'
import { commonStyles } from '../styles/commonStyles'
import { screenHeight, screenWidth } from '../utils/Constants'
import { useIsFocused } from '@react-navigation/native'
import { useSound } from '../navigation/SoundContext'

const HomeScreen:React.FC = () => {
  const isFocused = useIsFocused()
  const translateY = useSharedValue(-200)

  const {playSound} = useSound()

  useEffect(()=>{
      translateY.value = withTiming(0,{duration:3000})
      // playSound('bg',true)
  },[isFocused])

  const animatedStyle = useAnimatedStyle(()=>({
    transform: [{translateY:translateY.value}]
  }))


  return (
   <ImageBackground source={require('../assets/images/b2.png')} style={commonStyles.simpleContainer}>
    <Animated.Image
      source={require('../assets/images/banner.png')}
      style={[styles.dropImage,animatedStyle]}
    />
   </ImageBackground>
  )
}
const styles = StyleSheet.create({
  dropImage:{
    width:screenWidth,
    height:screenWidth * 0.8,
    position:'absolute',
    resizeMode:'contain',
    top:-20
  }
})

export default HomeScreen