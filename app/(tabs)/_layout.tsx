import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { ImageBackground } from 'expo-image'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, Text } from 'react-native'
import { View } from 'react-native-reanimated/lib/typescript/Animated'


const TabIcon = ({ focused, icon, title }: any) => {

    if (focused) {
    return(
        <ImageBackground 
            source = {images.highlight} 
            className='flex flex-row items-center justify-center w-full flex-1 min-w-[112px] min-h-14 mt-4 rounded-full overflow-hidden'
        >
            <Image
             source= {icon} 
             tintColor = '#151312'
             className='size-5'
            />

            <Text className="text-secondary text-base font-semibold ml-2"> {title}</Text>
        </ImageBackground>
    )
}
    return(
        <View className="size-full justify-center items-center mt-4 rounded-full ">
            <Image source={icon} className='size-5' tintColor="#A8B5DB" />
        </View>
    )
}
const _Layout = () => { 
  return (
    <Tabs>
        <Tabs.Screen name='index' options={{ headerShown: false, title: 'Home', tabBarIcon:({focused}) => (
            <TabIcon focused={focused} icon={icons.home} title='Home'/>
        )}}/>
        <Tabs.Screen name='profile' options={{ headerShown: false, title: 'Profile', tabBarIcon:({focused}) => (
            <TabIcon focused={focused} icon={icons.person} title='Profile'/>
        ) }}/>
        <Tabs.Screen name='saved' options={{ headerShown: false, title: 'Saved', tabBarIcon:({focused}) => (
            <TabIcon focused={focused} icon={icons.save} title='Saved'/>
        ) }}/>
        <Tabs.Screen name='search' options={{ headerShown: false, title: 'Search', tabBarIcon:({focused}) => (
            <TabIcon focused={focused} icon={icons.search} title='Search'/>
        ) }}/>
    </Tabs>
  )
}

export default _Layout

