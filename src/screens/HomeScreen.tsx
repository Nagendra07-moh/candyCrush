import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated'
import React, { useEffect } from 'react'
import { commonStyles } from '../styles/commonStyles'
import { screenHeight, screenWidth } from '../utils/Constants'
import { useIsFocused } from '@react-navigation/native'
import { useSound } from '../navigation/SoundContext'
import LottieView from 'lottie-react-native'
import ScalePress from '../components/UI/ScalePress'
import { navigate } from '../utils/NavigationUtil'
import Footer from '../components/UI/Footer'

const HomeScreen: React.FC = () => {
  const isFocused = useIsFocused()
  const translateY = useSharedValue(-200)

  const { playSound } = useSound()

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 3000 })
    // playSound('bg',true)
  }, [isFocused])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }]
  }))


  return (
    <ImageBackground source={require('../assets/images/b2.png')} style={commonStyles.simpleContainer}>
      <Animated.Image
        source={require('../assets/images/banner.png')}
        style={[styles.dropImage, animatedStyle]}
      />
      <LottieView
        source={require('../assets/animations/bird.json')}
        speed={1}
        loop
        autoPlay
        hardwareAccelerationAndroid
        style={styles.lottieView}
      />

      <ScalePress style={styles.playButtonContainer} onPress={() => navigate('Level')}>
        <Image source={require('../assets/icons/play.png')} style={styles.playButton} />
      </ScalePress>

      <Footer/>
      

    </ImageBackground> 
  )
}
const styles = StyleSheet.create({
  dropImage: {
    width: screenWidth,
    height: screenWidth * 0.8,
    position: 'absolute',
    resizeMode: 'contain',
    top: -20
  },
  lottieView: {
    width: 200,
    height: 200,
    position: 'absolute',
    left: -20,
    top: '30%',
    transform: [{ scaleX: -1 }]
  },
  playButton: {
    resizeMode: 'center', 
  },
  playButtonContainer:{
    alignSelf:'center',
    marginTop:460
  }
})

export default HomeScreen