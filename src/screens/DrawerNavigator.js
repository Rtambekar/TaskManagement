import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TaskScreen from './TaskScreen';
import ProfileScreen from './ProfileScreen';
import CustomDrawerContent from './CustomDrawerContent'; // <-- import custom drawer

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="TaskScreen"
      screenOptions={{ headerShown: false }}
      drawerContent={props => <CustomDrawerContent {...props} />} // <-- add this
    >
      <Drawer.Screen name="TaskScreen" component={TaskScreen} />
      <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
 

    </Drawer.Navigator>
  );
}
