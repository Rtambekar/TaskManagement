import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TaskScreen from './TaskScreen'; // your main screen with the drawer
import ProfileScreen from './ProfileScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        
        <Drawer.Navigator initialRouteName="TaskScreen" screenOptions={{ headerShown: false }}>
            <Drawer.Screen name="TaskScreen" component={TaskScreen} />
            <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
        </Drawer.Navigator>
    );
}
