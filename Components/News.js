import { createContext,Button, ImageBackground, StyleSheet, Text, TextInput, View,Image,FlatList} from 'react-native';
import axios from 'axios';
import React, { useState, useEffect } from 'react';


const fetchNews = async () => {
  const response = await axios.get('https://newsdata.io/api/1/news?apikey=pub_40207095ed73228cb3595b4a3f68fa8350ddb&country=in&q=technology');
  console.log(response);
  return response.data.results;
};
const News = () => {
    const [news, setNews] = useState([]);
  
    useEffect(() => {
      fetchNews().then(data => setNews(data));
    }, []);
  
    return (
      <FlatList
        data={news}
        renderItem={({ item }) => 
          <View style={styles.card}>
            <Image style={styles.image} source={{ uri: item.image_url }} />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        }
        style={{width:'100%',flex:1}}
      />
    );
  };

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor:'#D4D4D4'
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    width:'70%'
  },
});

export default News;