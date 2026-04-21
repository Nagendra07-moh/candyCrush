import { View, Text, ImageBackground, Image, SafeAreaView, FlatList, ListRenderItem } from 'react-native'
import React, { FC } from 'react'
import { commonStyles } from '../styles/commonStyles'
// import { SafeAreaView } from 'react-native-safe-area-context'
import { levelStyles } from '../styles/levelStyles'
import ScalePress from '../components/UI/ScalePress'
import { goBack } from '../utils/NavigationUtil'
import { useLevelStore } from '../state/useLevelStore'



const LevelScreen: FC = () => {
  const { levels } = useLevelStore()

  type LevelItem = {
    id: number
    unlocked: boolean
    completed: boolean
    highScore: number
  }

  const renderItems: ListRenderItem<LevelItem> = ({ item }) => {
    const opacity = item.unlocked ? 1 : 0.5
    const emoji = item.completed ? '✅' : item.unlocked ? '🍭' : '🔒'

    return (
      <ScalePress
        style={levelStyles.levelItem}
        onPress={() => {
          if (!item.unlocked) return
        }}
      >
      <View style={{ opacity }}>
        <Text style={levelStyles.levelText}>
          {emoji}
        </Text>
        <Text style={levelStyles.levelText}>
          Level {item.id}
        </Text>
       {item.highScore > 0 &&
        <Text style={levelStyles.highScoreText}>
         Score {item.highScore}
        </Text>}
      </View>
    </ScalePress>
    )
  }
  return (
    <ImageBackground
      style={commonStyles.container}
      source={require('../assets/images/forest.jpeg')}
    >
      <SafeAreaView />
      <View style={levelStyles.flex1}>
        <ScalePress onPress={goBack}>
          <Image
            source={require('../assets/icons/back.png')}
            style={levelStyles.backIcon}
          />
        </ScalePress>
        <ImageBackground
          source={require('../assets/images/lines.jpg')}
          style={levelStyles.levelContainer}
        >
          <View style={levelStyles.subLevelContainer}>
            <FlatList
              data={levels}
              keyExtractor={(item)=>item.id.toString()}
              renderItem={renderItems}
              numColumns={2}
              columnWrapperStyle={levelStyles.columnWrapper}
              ListFooterComponent={
                <View style={levelStyles.comingSoonContainer}>
                  <Image source={require('../assets/images/doddle.png')}  style={levelStyles.doddle}/>
                  <Text style={levelStyles.comingSoonText}>Coming Soon! Dev Cooking</Text>
                </View>
              }
            />
          </View>
        </ImageBackground>
        <View style={levelStyles.flex2}>
          <Text style={levelStyles.text}>
            Rule:  Collect The minimum amount of candy before time runs out!
          </Text>
        </View>
      </View>
    </ImageBackground>
  )
}

export default LevelScreen