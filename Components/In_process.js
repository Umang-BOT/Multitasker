import {Button, ImageBackground, StyleSheet, Text, TextInput, View,Image} from 'react-native';
import np from '../assets/newspaper.png'
import { NewsContext } from '../Components/NewsContext';
import React, { useContext } from 'react';
import { ScrollView } from 'react-native-gesture-handler';


const In_process = () => {
    const news = useContext(NewsContext);
    const firstArticleTitle = news.length > 0 ? news[0].title : 'Loading news...';
  return (
    <View style={styles.container}>
        <Text style={{fontWeight:'bold',fontSize:20}}>Latest News...</Text>
        <View style={styles.card}>
            <Image source={np} style={{width:60,height:60}}/>
            <Text style={styles.text}>{firstArticleTitle}</Text>
        </View>
        <Text style={styles.text2}>want to read more, go to the news section...</Text>
    </View>
  )
}

export default In_process

const styles=StyleSheet.create({
    text_bold:{
        fontSize:100
    }
    ,
    container:{
        marginTop:20,
        backgroundColor:'transparent',
    },
    card:{
        backgroundColor:'#bebebe',
        width:'100%',
        height:180,
        borderWidth:2,
        borderRadius:15,
        flexDirection:'row',
        alignItems:'flex-start',
        padding:10,
        justifyContent:'space-between',
    },
    text:{
        justifyContent:'space-around',
        width:'80%',
        fontSize:16
    },
    text2:{
        marginRight:20,
        fontSize:12,
        marginBottom:20
    }
})