import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'; // If not already present
import TaskScreen from '../screens/TaskScreen'; // Your existing Task Screen
import CalendarScreen from '../screens/DateTimeScreen'; // The new Calendar Screen
import Icon from 'react-native-vector-icons/MaterialIcons'; // Or your preferred icon library
import DateTimeScreen from '../screens/DateTimeScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Tasks') {
              iconName = focused ? 'list' : 'list-outline'; // Choose appropriate icons
            } else if (route.name === 'Calendar') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato', // Color of active icon and label
          tabBarInactiveTintColor: 'gray', // Color of inactive icon and label
        })}
      >
        <Tab.Screen name="TaskScreen" component={TaskScreen} />
        <Tab.Screen name="Calendar" component={DateTimeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;