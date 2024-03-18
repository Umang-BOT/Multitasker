import React, { useState, useEffect } from 'react';
import {
  Modal,
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bg1 from '../assets/bg_6.jpg';
import userIcon from '../assets/user.png';
import delIcon from '../assets/del.png';
import Add_task from '../Components/Add_task';
import add from '../assets/plus.png';
import * as Notifications from 'expo-notifications'

const { width } = Dimensions.get('window');

let f=0;

Notifications.setNotificationHandler({
  handleNotification:async()=>{
    return{
      shouldPlaySound:false,
      shouldSetBadge:false,
      shouldShowAlert:true
    }
  }
});

const Card = ({ item, onDelete }) => {
  const [textColor, setTextColor] = useState('green');

  useEffect(() => {
    function ScheduleNotificationHandler(){
      setTextColor('red');
      Notifications.scheduleNotificationAsync({
        content:{
          title:"Multitasker App",
          body:`Deadline for your ${item.title}`,
          data:{userName:'Max'}
        },
        trigger:{
          seconds:2
        }
      });
    }

    if (item && item.date && item.title) {
      const [day, month, year] = item.date.split('/').map(Number);
      const deadlineDate = new Date(year, month - 1, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      deadlineDate.setHours(0, 0, 0, 0);
      if (today.getTime() === deadlineDate.getTime()) {
        ScheduleNotificationHandler();
      } else {
        setTextColor('green');
      }
    }
  }, [item]); // Add item as a dependency

  return (
    <ImageBackground source={bg1} style={styles.card}>
      <Image source={userIcon} style={styles.img}/>
      <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.img2}>
        <Image source={delIcon} style={styles.img2} />
      </TouchableOpacity>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc}>{item.desc}</Text>
      <Text style={[styles.data,{color:textColor}]}>Deadline: {item.date}</Text>
    </ImageBackground>
  );
};


const MyTasks = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    const loadTasks = async () => {
      const tasksJson = await AsyncStorage.getItem('tasks');
      if (tasksJson) {
        setData(JSON.parse(tasksJson));
      }
    };

    loadTasks();
  }, []);
  useEffect(() => {
    const saveTasks = async () => {
      await AsyncStorage.setItem('tasks', JSON.stringify(data));
    };

    saveTasks();
  }, [data]);

  const handleDelete = (id) => {
    setData(currentData => {
      const updatedData = currentData.filter(item => item.id !== id);
      AsyncStorage.setItem('tasks', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const handleAddTask = (newTask) => {
    setData(currentData => {
      const updatedData = [...currentData, { ...newTask, id: String(currentData.length + 1) }];
      AsyncStorage.setItem('tasks', JSON.stringify(updatedData));
      return updatedData;
    });
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.three_tasks}>
        <Text style={styles.text_border}>My Tasks...</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={add} style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Add_task onAddTask={handleAddTask} />
      </Modal>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Card item={item} onDelete={handleDelete} />}
        horizontal={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  three_tasks: {
    flexDirection: 'row',
    width: '100%',
    height: 40,
    justifyContent: 'space-between',
    marginTop: 40
  },
  container: {
    backgroundColor: 'transparent',
    borderRadius: 30
  },
  card: {
    borderRadius: 60,
    padding: 8,
    margin: 8,
    width: width / 2 + 100,
    height: 200,
    marginTop:20
  },
  imageContainer: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  title: {
    marginTop: 50,
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    textAlign: 'center',
    fontSize: 20
  },
  img: {
    position: 'absolute',
    left: 10,
    width: 40,
    height: 40,
    marginLeft: 20,
    marginTop: 20
  },
  img2: {
    position: 'absolute',
    right: 20,
    width: 30,
    height: 30,
    marginTop: 20
  },
  image: {
    borderRadius: 40,
    width: '100%',
    height: '100%',
  },
  desc: {
    marginTop: 10,
    position: 'absolute',
    top: '70%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    textAlign: 'center',
    fontSize: 20
  },
  data: {
    marginTop: 10,
    bottom: 30,
    right: 60,
    position: 'absolute'
  },
  text_border: {
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#ADD8E6',
    fontWeight: '600',
    height:50
  }
});

export default MyTasks;
