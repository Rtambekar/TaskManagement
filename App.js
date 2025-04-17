import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EmailPassAuth from './src/screens/EmailPassAuth';
import DateTimeScreen from './src/screens/DateTimeScreen';
import TaskDetails from './src/screens/TaskDetails';
import ProfileScreen from './src/screens/ProfileScreen';
import DrawerNavigator from './src/screens/DrawerNavigator'; // This includes TaskScreen
import TaskScreen from './src/screens/TaskScreen';
const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={EmailPassAuth} />
                <Stack.Screen name="TaskDrawer" component={DrawerNavigator} />
                <Stack.Screen name="DateTimeScreen" component={DateTimeScreen} />
                <Stack.Screen name="TaskDetails" component={TaskDetails} />                
            </Stack.Navigator>
        </NavigationContainer>
    );
}
