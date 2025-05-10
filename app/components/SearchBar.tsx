import { icons } from '@/constants/icons'
import React from 'react'
import { Image, TextInput, View } from 'react-native'


interface props {
  onPress: () => void
  placeholder: string
  value: string
  onChangeText:(text: string) => void
}
const SearchBar = ({onPress, placeholder, value, onChangeText}: props) => {
  return (
    <View className='flex-row items-center justify-center bg-dark-200 rounded-full px-5 py-4'>
        <Image source={icons.search} className='size-5' tintColor="#ab8bff" resizeMode='contain'/>
        <TextInput
          onPress={onPress}
          placeholder={placeholder}
          value={value}
          className='text-white flex-1 ml-2'
          onChangeText={onChangeText}
          placeholderTextColor="#a8b5db"

        />
      
    </View>
  )
}

export default SearchBar
