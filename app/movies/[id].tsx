import { fetchMovieDetails } from '@/services/api'
import useFetch from '@/services/usefetch'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { icons } from '../../constants/icons'

interface MovieInfoProps {
    label: string
    value?: string | number | null;
}


const MovieInfo = ({label, value}: MovieInfoProps) => (
     <View className = "flex-col items-start justify-center mt-5">
        <Text className='text-light-200 font-normal text-sm'>{label}</Text>
        <Text className='text-light-100 font-bold text-sm'>{value}</Text>
     </View>
)


const MovieDetails = () => {
    const {id} = useLocalSearchParams()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {data:movie , loading, error} = useFetch(() => fetchMovieDetails(id as string))
  return (
    <View className='bg-primary flex-1'>
        <ScrollView contentContainerStyle={{ paddingBottom:80}}>
            <View>
                <Image source = {{uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`}} className='w-full h-[550px] rounded-lg' resizeMode='stretch'/>
            </View>

            <View className='flex-col items-start justify-between mt-5 px-5'>
                <Text className='text-white font-semibold text-xl'>{movie?.title}</Text>
                <View className='flex-row items-center'>
                <Text className='text-light-200 text-sm'>{movie?.release_date?.split('-')[0]}</Text>
                <Text className ='text-light-200 text-sm'>{movie?.runtime} mins</Text>
                </View>

            <View className='flex-row items-center px-2 py-1 bg-dark-100 rounded-md gap-x-1 mt-2'>
                <Image source={icons.star} className='size-4' />
                <Text className="text-white text-sm font-bold">{Math.round(movie?.vote_average ?? 0)}/10</Text>
                <Text className='text-light-200 text-sm'>{movie?.vote_count} votes</Text>
            </View>

            <MovieInfo label='Overview' value={movie?.overview}/>
            <MovieInfo label='Genres' value={movie?.genres?.map((g) => g.name).join(', ')}/>

            </View>

               
        </ScrollView>
      
    </View>
  )
}

export default MovieDetails
