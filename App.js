import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import EmailPassauth from './src/screens/EmailPassAuth';


const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen name="Login" component={EmailPassauth} />
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
