import { images } from '@/constants/images'
import { getSavedMovies } from '@/services/appwrite'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { icons } from '../../constants/icons'
import MovieCard from '../components/MovieCard'

// Make sure to define or import your Movie interface
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

const Saved = () => {
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedMovies = async () => {
    try {
      setLoading(true);
      const movies = await getSavedMovies();
      console.log("Saved movies fetched:", movies); // Debug log
      setSavedMovies(movies || []);
    } catch (error) {
      console.error('Error fetching saved movies:', error);
      setSavedMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedMovies();
  }, []);   
    
  return (
    <View className="bg-primary flex-1">
      <Image source={images.bg} className="absolute w-full z-0" resizeMode="cover" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        <View className="flex-1 mt-5">
          <Text className="text-white font-bold text-xl">Saved Movies</Text>

          {loading ? (
            <Text className="text-white text-sm mt-5">Loading saved movies...</Text>
          ) : savedMovies.length === 0 ? (
            <Text className="text-white text-sm mt-5">No saved movies yet.</Text>
          ) : (
            <View className="flex-row flex-wrap justify-between mt-5">
              {savedMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} fromSavedPage={true} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Saved;