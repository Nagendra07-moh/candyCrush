import { View, Text } from 'react-native'
import React from 'react'
import Navigation from './src/navigation/Navigation'
import { SoundProvider } from './src/navigation/SoundContext'

const App = () => {
  return (
    <SoundProvider>
       <Navigation />
    </SoundProvider>
  )
}

export default App