import { icons } from '@/constants/icons';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

// Support both old way (destructured props) and new way (movie object)
interface MovieCardProps {
  movie?: Movie;
  fromSavedPage?: boolean;
  id?: number;
  poster_path?: string;
  title?: string;
  vote_average?: number;
  release_date?: string;
}

const MovieCard = (props: MovieCardProps) => {
  // Handle both old and new calling patterns
  const { movie, fromSavedPage = false } = props;
  
  // If movie object is passed, use it, otherwise use the destructured props
  const id = movie?.id || props.id;
  const poster_path = movie?.poster_path || props.poster_path;
  const title = movie?.title || props.title;
  const vote_average = movie?.vote_average || props.vote_average;
  const release_date = movie?.release_date || props.release_date;

  // For saved movies, the poster_path is already the full URL
  const posterUrl = fromSavedPage
    ? poster_path
    : poster_path
      ? `https://image.tmdb.org/t/p/w500${poster_path}`
      : `https://placeholder.co/600x400/1a1a1a/ffffff.png`;

  return (
    <Link href={`/movies/${id}`} asChild>
        <TouchableOpacity className='w-[30%]'>
            <Image 
                source={{
                    uri: posterUrl,
                }}
                className='w-full h-52 rounded-lg'
                resizeMode='cover'
            />
            <Text className="text-white font-semibold text-sm mt-2" numberOfLines={1}>{title}</Text>

            <View className='flex-row items-center justify-start mt-2'>
                <Image source={icons.star} className='size-4' />
                <Text className="text-white text-xs font-bold uppercase">{Math.round((vote_average || 0)/2)}</Text>
            </View>
            <View className='flex-row items-center justify-between mt-1'>
                <Text className="text-light-300 text-xs font-medium mt-1">{release_date?.split('-')[0]}</Text>
            </View>
        </TouchableOpacity>
    </Link>
  )
}

export default MovieCard