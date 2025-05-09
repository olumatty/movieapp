import { icons } from '@/constants/icons'
import React from 'react'
import { Image, TextInput, View } from 'react-native'

const SearchBar = () => {
  return (
    <View className='flex-row items-center justify-center bg-dark-200 rounded-full px-5 py-4'>
        <Image source={icons.search} className='size-5' tintColor="#ab8bff" resizeMode='contain'/>
        <TextInput
          onPress={() => {}}
          placeholder='Search for movies'
          value=''
          className='text-white flex-1 ml-2'
          onChangeText={() => {}}
          placeholderTextColor="#a8b5db"

        />
      
    </View>
  )
}

export default SearchBar
