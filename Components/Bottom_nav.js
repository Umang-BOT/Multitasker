import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Components/Home';
import News from '../Components/News';
import Add_task from '../Components/Add_task';
import HomeIcon from '../assets/ho.png';
import NewsIcon from '../assets/new.png';
import ai from '../assets/network-nodes.png'
import { Image, View } from 'react-native';
import Chat_BOT from '../Components/Chat_BOT'
import { Text,color } from 'react-native';
import Ai_img from '../assets/picture.png'
import newp from '../assets/newspaper.png'

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen key={1} name="HomeScreen" component={Home} />
      <HomeStack.Screen name="Add_task" component={Add_task} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  );
}

const BottomNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName = focused ? HomeIcon : HomeIcon;
          if (route.name === 'Home') {
            iconName = focused ? HomeIcon : HomeIcon;
          } else if (route.name === 'News') {
            iconName = focused ? NewsIcon : NewsIcon;
          }
          else if(route.name==='GenImageAI'){
            iconName=focused?ai:ai;
          }
          return <Image source={iconName} style={{ width: 30, height: 30 }} />;
        },
        tabBarLabel: ({ focused, color }) => (
          <Text style={{ color, fontSize: focused ? 16 : 14 }}>
            {route.name}
          </Text>
        ),
        tabBarStyle:{
          height:60
        }
      })}
      tabBarOptions={{
        activeTintColor: 'red',
        inactiveTintColor: 'gray',
        tabBarStyle:{
          backgroundColor: 'blue', 
          display: 'flex',
        },
      }}
    >
      <Tab.Screen key={2} name="Home" component={HomeStackNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="GenImageAI" component={Chat_BOT}
      options={{
        headerTitle: () => (
          <View style={{marginTop:10,flexDirection:'row',padding:10}}>
            <Image source={Ai_img} style={{width:50,height:50}}/>
          <View style={{marginLeft:10}}>
          <Text style={{ fontSize: 20 , fontWeight:500}}>GenImageAI</Text>
            <Text style={{ fontSize: 8 }}>powered by Stable Diffusion.</Text>
            </View>
          </View>
        ),
      }}
      />
      <Tab.Screen name="News" component={News} 
      options={{
        headerTitle:()=>(
          <View style={{marginTop:10,flexDirection:'row'}}>
            <Image source={newp} style={{width:50,height:50}}></Image>
            <Text style={{ fontSize: 20,fontWeight:500,marginLeft:10}}>News</Text>
          </View>
        )
      }}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;
