import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, StrictMode } from 'react';
import { Button, FlatList, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Bottom_nav from './Components/Bottom_nav';
import { NewsProvider } from './Components/NewsContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack=createNativeStackNavigator();

export default function App() {
  
  return (
    <StrictMode>
    <NewsProvider>
    <View style={{ flex: 1 }}>
      <NavigationContainer>
          <Bottom_nav />
        </NavigationContainer>
    </View>
    </NewsProvider>
    </StrictMode>
  ); 
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});
