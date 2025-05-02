
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { getAuth, signOut } from 'firebase/auth';
import app from '../constant/firebaseConfig'; 
import { useNavigation } from '@react-navigation/native';

export default function CustomDrawerContent(props) {
  const auth = getAuth(app);
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert('Logged out', 'You have been signed out successfully');
      navigation.replace('Login'); // redirect to login
    } catch (error) {
      Alert.alert('Logout Error', error.message);
    }
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <DrawerItemList {...props} />
      </View>

      {/* Logout button at bottom */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  logoutContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  logoutButton: {
    paddingVertical: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'red',
  },
});
