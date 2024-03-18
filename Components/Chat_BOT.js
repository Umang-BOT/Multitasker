import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import right from '../assets/rar.png'
import node from '../assets/imageAI.png'
import bot from '../assets/chatbot.png'

const API_URL = 'https://api-inference.huggingface.co/models/Kvikontent/midjourney-v6';
const API_TOKEN = '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'; 
const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
async function generateImage(prompt) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: prompt,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const blob = await response.blob();
  console.log(blob);
  return blobToBase64(blob);
}
const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) {
      alert('Please enter a prompt for the image.');
      return;
    }
    setIsLoading(true);
    const userMessage = { sender: 'User', text: input, type: 'text' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');

    try {
      const imageBase64 = await generateImage(input);
      const imageMessage = { sender: 'Bot', image: imageBase64, type: 'image' };
      setMessages(prevMessages => [...prevMessages, imageMessage]);
    } catch (error) {
      alert('Failed to generate image, please try something else or try again...');
    } finally {
      setIsLoading(false); 
    }
  };

  const downloadImage = async (base64Data) => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (permission.granted) {
      const base64WithoutPrefix = base64Data.split(',')[1];
      const filename = `image_${Date.now()}.jpg`;
      const fileUri = FileSystem.cacheDirectory + filename;
  
      try {
        await FileSystem.writeAsStringAsync(fileUri, base64WithoutPrefix, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const asset = await MediaLibrary.createAssetAsync(fileUri);
        await MediaLibrary.createAlbumAsync('Downloaded Images', asset, false);
  
        alert('Image saved to gallery:');
      } catch (error) {
        console.error('Error saving the image:', error);
      }
    } else {
      alert('Media Library permission is not granted');
    }
  };
  
  
  

  return (
    <KeyboardAvoidingView style={{ flex: 1,marginTop:20}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.promptContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Enter a prompt for the image"
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage}>
          <View>
            <Image source={right} style={{ width: 40, height: 40 }} />
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{justifyContent:'center',alignContent:'center',marginLeft:10,fontSize:10,padding:2,color:'red'}}>Note: This app doesn't store any of your previous sessions....</Text>
        </View>
        <View style={{borderBottomWidth:3,borderBottomWidth: 4,borderColor: '#E8751A'}}></View>
      
      {isLoading && <ActivityIndicator size="large" color="#000" />}
      
      <ScrollView style={{ flex: 1 }}>
        {messages.map((message, index) => (
          <View key={index} style={styles.messageContainer}>
            {message.type === 'text' && <><View style={{flexDirection:'row',padding:10}}><Image source={bot} style={{width:30,height:30,padding:2}}/><Text style={{fontWeight:'bold'}}>{message.sender+":"} {message.text}</Text></View></>}
            {message.type === 'image' && (
              <>
              <View style={{alignItems:'flex-start',flexDirection:'row'}}>
              <Image source={node} style={{width:25,height:25,padding:5}}/>
              <View style={{width:320,height:320,alignContent:'center',padding:8,backgroundColor:'white',borderRadius:10}}>
                <Image source={{ uri: message.image }} style={styles.image} />
                </View>
                </View>
                <TouchableOpacity onPress={() => downloadImage(message.image)}>
                  <Text style={{padding:5,borderRadius:10,marginTop:5,backgroundColor:'#abf7b1'}}>Download</Text>
                </TouchableOpacity>
                
              </>
            )}
          </View>
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Styles
const styles = StyleSheet.create({
  promptContainer: {
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderWidth: 3,
    borderColor: '#51829B',
    borderRadius: 10,
  },
  messageContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    borderColor:'white'
  },
});

export default ChatScreen;
