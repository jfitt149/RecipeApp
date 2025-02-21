// import { createContext, useContext, useState, useEffect } from 'react';
// import * as Google from 'expo-auth-session/providers/google';
// import * as WebBrowser from 'expo-web-browser';
// import * as SecureStore from 'expo-secure-store';
// import axios from 'axios';

// WebBrowser.maybeCompleteAuthSession();

// const API_URL = 'http://your-backend-url:5000/api';
// const AuthContext = createContext({});

// export function AuthProvider({ children }) {
//   const [session, setSession] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [request, response, promptAsync] = Google.useAuthRequest({
//     clientId: 'YOUR_GOOGLE_CLIENT_ID',
//     iosClientId: 'YOUR_IOS_CLIENT_ID',
//     androidClientId: 'YOUR_ANDROID_CLIENT_ID',
//   });

//   useEffect(() => {
//     loadStoredSession();
//   }, []);

//   useEffect(() => {
//     if (response?.type === 'success') {
//       handleGoogleSignIn(response.authentication.idToken);
//     }
//   }, [response]);

//   const loadStoredSession = async () => {
//     try {
//       const token = await SecureStore.getItemAsync('userToken');
//       if (token) {
//         const user = await fetchUserProfile(token);
//         setSession({ token, user });
//       }
//     } catch (error) {
//       console.error('Error loading session:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSignIn = async (idToken) => {
//     try {
//       const response = await axios.post(`${API_URL}/auth/google`, {
//         token: idToken,
//       });

//       const { token, user } = response.data;
//       await SecureStore.setItemAsync('userToken', token);
//       setSession({ token, user });
//     } catch (error) {
//       console.error('Sign in error:', error);
//     }
//   };

//   const fetchUserProfile = async (token) => {
//     try {
//       const response = await axios.get(`${API_URL}/auth/profile`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };

//   const signIn = async () => {
//     promptAsync();
//   };

//   const signOut = async () => {
//     await SecureStore.deleteItemAsync('userToken');
//     setSession(null);
//   };

//   if (loading) {
//     return null; // Or a loading component
//   }

//   return (
//     <AuthContext.Provider value={{ session, signIn, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);