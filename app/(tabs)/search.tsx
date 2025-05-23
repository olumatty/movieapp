import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { getMovies } from '@/services/api'
import { updateSearchCount } from '@/services/appwrite'
import useFetch from '@/services/usefetch'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'
import MovieCard from '../components/MovieCard'
import SearchBar from '../components/SearchBar'


const Search = () => {
    
    const [searchQuery, setSearchQuery] = useState('')
      const {
        data: movies,
        loading: moviesLoading,
        error: moviesError,
        refetch: loadMovies,
        reset,

      } = useFetch(() => getMovies({ query: searchQuery }), false);


      useEffect(() => {
        
        const timeOut = setTimeout( async() => {
            if (searchQuery.trim()) {
                await loadMovies()

            } else {
                reset()
            }
        }, 500)
        return () => clearTimeout(timeOut)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [searchQuery]);

      useEffect(() => {
        if(movies?.length > 0  && movies?.[0]) {
             updateSearchCount(searchQuery, movies[0])
            
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [movies]);

  return (
    <View className='flex-1 bg-primary'>
        <Image source={images.bg} className=" flex-1 absolute w-full z-0" resizeMode='cover'/>

        <FlatList
            data= {movies}
            renderItem={({ item }) => <MovieCard {...item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
                justifyContent:"center",
                gap: 16,
                marginVertical: 16,
            }}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListHeaderComponent={
                <>
                <View className='w-full flex-row justify-center mt-20 items-center'>
                    <Image source = {icons.logo} className='w-12 h-10'/>
                </View>

                <View className= "my-5">
                    <SearchBar
                         placeholder="Search Movies ..."
                         value={searchQuery}
                         onChangeText={(text: string) => setSearchQuery(text)}
                    />
                </View>

                {moviesLoading && (
                    <ActivityIndicator size="large"  color="#0000ff" className='my-3'/>
                )}

                {moviesError && (
                    <Text className ="text-red-500 px-5 my-5">Error:{moviesError.message}</Text>
                )}

                
                    {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 &&(
                        <Text className='text-xl text-white font-bold'>
                            Search Results for {' '}
                            <Text className='text-accent'>{searchQuery}</Text>
                        </Text>
                    )}  
                </>
            }
            ListEmptyComponent={
                !moviesLoading && !moviesError ? (
                    <View className='mt-10 px-5'>
                        <Text className='text-center text-gray-500'>
                            {searchQuery.trim () ? 'No Movies Found' : 'Search for a movie'}
                        </Text>
                    </View>
                ): null
            }
        />
    </View>
  )
}

export default Search
