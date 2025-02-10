import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EmailPassAuth from './src/screens/EmailPassAuth';
import TaskScreen from './src/screens/TaskScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={EmailPassAuth} />
                <Stack.Screen name="TaskScreen" component={TaskScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
