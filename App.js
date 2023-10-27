import React from 'react'
import Login from './src/components/Login'
import Register from './src/components/Register'
import Dashboard from './src/components/Dashboard'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import UserView from './src/components/UserView'

const Stack=createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="UserView" component={UserView} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App