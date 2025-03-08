// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { StatusBar } from 'expo-status-bar';
// import { useEffect } from 'react';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/useColorScheme';

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="+not-found" />
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }



// import { Stack, Tabs } from 'expo-router';
// import { Platform, View, ActivityIndicator } from 'react-native';

// import { HapticTab } from '@/components/HapticTab';
// import { IconSymbol } from '@/components/ui/IconSymbol';
// import TabBarBackground from '@/components/ui/TabBarBackground';
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';
// import { useState, useEffect } from 'react';

// import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

//   const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
//     console.log('onAuthStateChanged', user);
//     setUser(user);  
//     if (initializing) setInitializing(false);
//   }

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber;
//   }, []);

//   if(initializing) return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <ActivityIndicator size="large" />
//     </View>
//   );

//   return (
//     <Stack>
//       <Stack.Screen name="signin" options={{ headerShown: false }} />
//     </Stack>
//     // <Tabs
//     //   screenOptions={{
//     //     tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//     //     headerShown: false,
//     //     tabBarButton: HapticTab,
//     //     tabBarBackground: TabBarBackground,
//     //     tabBarStyle: Platform.select({
//     //       ios: {
//     //         // Use a transparent background on iOS to show the blur effect
//     //         position: 'absolute',
//     //       },
//     //       default: {},
//     //     }),
//     //   }}>
//     //           <Tabs.Screen
//     //     name="index"
//     //     options={{
//     //       title: 'Home',
//     //       tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
//     //     }}
//     //   />
//     //   <Tabs.Screen
//     //     name="signin"
//     //     options={{
//     //       title: 'Sign In',
//     //       tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
//     //     }}
//     //   />
//     //   <Tabs.Screen
//     //     name="explore"
//     //     options={{
//     //       title: 'Explore',
//     //       tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
//     //     }}
//     //   />
//     // </Tabs>
//   );
// }



import { Stack, Tabs, useRouter, useSegments } from 'expo-router';
import { Platform, View, ActivityIndicator } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useState, useEffect } from 'react';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const router = useRouter();
  const segments = useSegments();

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log('onAuthStateChanged', user);
    setUser(user);  
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if(initializing) return;

    const inAuthGroup = segments[0] === '(tabs)';

    if(user && !inAuthGroup) {
      router.replace('/(tabs)/home');
    }

  }, [user, initializing]);

  if(initializing) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );

  // if (!user) {
  //   console.log(user);
  //   return (
  //     <Stack>
  //       <Stack.Screen name="signin" options={{ headerShown: false }} />
  //     </Stack>
  //   );
  // }

  return (
    <Stack>
      <Stack.Screen name="signin" options={{ headerShown: false }} /> 
    </Stack>
    // <Tabs
    //   screenOptions={{
    //     tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
    //     headerShown: false,
    //     tabBarButton: HapticTab,
    //     tabBarBackground: TabBarBackground,
    //     tabBarStyle: Platform.select({
    //       ios: {
    //         // Use a transparent background on iOS to show the blur effect
    //         position: 'absolute',
    //       },
    //       default: {},
    //     }),
    //   }}>
    //   <Tabs.Screen
    //     name="index"
    //     options={{
    //       title: 'Home',
    //       tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="signin"
    //     options={{
    //       title: 'Sign In',
    //       tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
    //     }}
    //   />
    // </Tabs>
  );
}