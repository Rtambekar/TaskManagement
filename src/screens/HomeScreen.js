import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function HomeScreen() {
  return (
    <View>
      <Text style={styles.header}>HomeScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
 header:{
    color: "#ffffff",
    backgroundColor: "yellow"
 }
})