// import React, { useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import SignIn from '../auth/SignIn';
// import SignUp from '../auth/SignUp';
// import Tabs from '../tabs'; // Adjust the import path as needed

// const Stack = createStackNavigator();

// const AppNavigator = () => {
//   const [isSignedIn, setIsSignedIn] = useState(false);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {isSignedIn ? (
//           <Stack.Screen name="Tabs" component={Tabs} />
//         ) : (
//           <>
//             <Stack.Screen name="SignIn" component={SignIn} />
//             <Stack.Screen name="SignUp" component={SignUp} />
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppNavigator;
