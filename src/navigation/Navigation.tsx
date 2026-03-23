import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from '../screens/HomeScreen'
import SplashScreen from '../screens/SplashScreen'
import LevelScreen from '../screens/LevelScreen'
import GameScreen from '../screens/GameScreen'
import { navigationRef } from '../utils/NavigationUtil'
import { SoundProvider } from './SoundContext'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  return (
    <SoundProvider>
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ animation: 'fade' }} />
        <Stack.Screen name="Level" component={LevelScreen} options={{ animation: 'fade' }} />
        <Stack.Screen name="Game" component={GameScreen} options={{ animation: 'fade' }} />
      </Stack.Navigator>
    </NavigationContainer>
    </SoundProvider>
  )
}

export default Navigation