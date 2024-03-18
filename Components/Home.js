import { Button, ImageBackground, StyleSheet, Text, TextInput, View,Image, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navbar from './Navbar';
import Input_comp from './Input_comp';
import My_tasks from './My_tasks';
import add from '../assets/plus.png'
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import In_process from '../Components/In_process';
import Bottom_nav from '../Components/Bottom_nav';

const Stack = createNativeStackNavigator();

const getTodaysIndiaDate = () => {
    const today = new Date();
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Kolkata', 
    }; 
  const dayOfWeek = today.getDay();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return `${days[dayOfWeek]}, ${today.toLocaleDateString('en-IN', options)}`;
  };

const Home = () => {
    const navigation = useNavigation();
    const Handler=()=>{
        navigation.navigate('Add_task');
    }
    const todaysDate = getTodaysIndiaDate();
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.add_pad}>
        <Text style={styles.add_header}>Hi,Buddy!</Text>
        <Text style={styles.dateText}>{todaysDate}</Text>
        <View style={{borderBottomWidth:2,marginTop:10}}></View>
        </View>
        <My_tasks/>
        <In_process/>
    </ScrollView>
    
  )
}

export default Home

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        padding: 10,
      },
    add_header:{
        fontSize:30,
        fontWeight:'bold',
    },
    add_pad:{
        marginTop:5,

    },
    dateText: {
        fontSize: 20,
        fontWeight: 'bold',
        borderWidth:2,
        borderColor:'#FF0800',
        padding:20,
        borderRadius:20,
        marginTop:10
    },
    three_tasks:{
        flexDirection:'row',
        width:'100%',
        height:40,
        justifyContent:'space-between',
        marginTop:40
    },
    text_border:{
        padding:10,
        borderRadius:10,
        fontSize:16,
        backgroundColor:'#ADD8E6',
        fontWeight:'600'
    }

})