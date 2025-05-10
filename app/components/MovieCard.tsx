import { icons } from '@/constants/icons'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const MovieCard = ({id, poster_path, title, vote_average, release_date}: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
        <TouchableOpacity className='w-[30%]'>
            <Image 
                source={{
                    uri: poster_path
                    ? `https://image.tmdb.org/t/p/w500${poster_path}`
                    : `https://placeholder.co/600x400/1a1a1a/ffffff.png`,
                }}
                className='w-full h-52 rounded-lg'
                resizeMode='cover'
            />
            <Text className="text-white font-semibold text-sm mt-2" numberOfLines={1}>{title}</Text>

            <View className='flex-row items-center justify-start mt-2'>
                <Image source={icons.star} className='size-4' />
                <Text className="text-white text-xs font-bold uppercase">{Math.round(vote_average/2)}</Text>
            </View>
            <View className='flex-row items-center justify-between mt-1'>
                <Text className="text-light-300 text-xs font-medium mt-1">{release_date?.split('-')[0]}</Text>


            </View>
        </TouchableOpacity>
    </Link>
  )
}

export default MovieCard
