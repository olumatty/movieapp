import { Stack } from "expo-router";
import './global.css';

export default function RootLayout() {
  return(
     /* remove the header shown at the top of the screeen */  
    <Stack>
      <Stack.Screen name= "(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name= "movies/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
