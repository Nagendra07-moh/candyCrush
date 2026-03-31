import React,{createContext,useState,useContext,ReactNode, Children} from "react";
import Video from "react-native-video";


interface SoundContextProps{
    playSound: (soundName: string , repeat:boolean) => void;
    stopSound: (soundName:string) => void;
}


interface SoundProviderProps{
    children: ReactNode;
}

// container that holds shared values | like a Store in Redux
const SoundContext = createContext<SoundContextProps | undefined>(undefined);

// object that will hold the sound paths [key:path]
const soundPaths:{[key:string]:string} = {
    ui: require('../assets/sfx/ui.mp3'),
    candy_shiffle: require('../assets/sfx/candy_shuffle.mp3'),
    candy_clear: require('../assets/sfx/candy_clear.mp3'),
    bg: require('../assets/sfx/bg.mp3'),
    cheer: require('../assets/sfx/cheer.mp3')
}

// This will make sure that any component in the app can import function inside this provider (play/pause)
const SoundProvider  = ({children}:SoundProviderProps) => {
    const [sounds,setSounds] = useState<any[]>([]);

    // this will fill the sondPath with the object 
    // {
    //     id:soundName,
    //     path:soundPath,
    //     repeat
    // }
    // and updatedSounds make sure that no duplicate sonds gets filled in the state (sounds) back to back

    const playSound = (soundName: string, repeat: boolean) => {
        const soundPath = soundPaths[soundName]
        if(soundPath){
            setSounds((prevSound) => {
                const updatedSounds = prevSound?.filter((sound) => sound.id !== soundName)
                return [
                    ...updatedSounds,
                    {
                        id:soundName,
                        path:soundPath,
                        repeat
                    }
                ] 
            })
        }else{
            console.error(`Sound ${soundName} not found!!`)
        }
    }

    // it stop the sound by removing the path from the soundPath so <Video/> do not have any
    const stopSound = (soundName: string) => {
        setSounds((prevSound) => prevSound.filter((sound) => sound.id !== soundName));
    }
    return(
        <SoundContext.Provider value={{playSound,stopSound}}>
            {children}
            {sounds?.map((sound) => (
                <Video
                  key={sound.id}
                  source={sound.path}
                  paused={false}
                  repeat={sound.repeat}
                  volume={0.4}
                  muted={false}
                  resizeMode="cover"
                  style={{position:'absolute',width:0,height:0}}
                />
            ))}
        </SoundContext.Provider>
    )
}


// this hook make sure that in the components that will use SondContex we dont have to import 
// sondContext , just import this hook and destructure the function of SoundContext
const useSound =():SoundContextProps =>{
    const context = useContext(SoundContext);
    if(!context){
        throw new Error('useSound must be used within a soundProvider')
    }
    return context;
}

export {SoundProvider,useSound};