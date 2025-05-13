import { Client, Databases, ID, Query } from "appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

console.log("Database ID:", DATABASE_ID);
console.log("Collection ID:", COLLECTION_ID);

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!); // Your project ID

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("movie_id", movie.id), // ✅ Match by movie, not search term
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        count: 1,
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.log("Error updating search count:", error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("count"),
      Query.limit(10),
    ]);
    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log("Error fetching trending movies:", error);
    return undefined;
  }
};

export const SaveMovie = async (movie: {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}) => {
  try {
    const existing = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("movie_id", movie.id), // ✅ Match by movie, not search term
    ]);

    if (existing.documents.length === 0) {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        movie_id: movie.id,
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
      });
    }
  } catch (error) {
    console.log(error);
    throw Error;
  }
};

interface SavedMovie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

export const getSavedMovies = async (): Promise<SavedMovie[]> => {
  try {
    const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID);
    return response.documents.map((doc) => ({
      id: doc.movie_id,
      title: doc.title,
      poster_path: doc.poster_url, // Return the full URL without modifying it
      vote_average: doc.vote_average,
      release_date: doc.release_date,
    }));
  } catch (error) {
    console.error("Error fetching saved movies:", error);
    throw error;
  }
};
