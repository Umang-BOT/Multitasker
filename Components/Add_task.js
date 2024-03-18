import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import user from '../assets/user.png';

const Add_task = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState(new Date());
  const [dateText, setDateText] = useState('');
  const [show, setShow] = useState(false); 

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    setDateText(fDate);
  };
  

  const showDatepicker = () => {
    setShow(true);
  };

  const addTask = () => {
    onAddTask({
      title,
      desc,
      date: dateText
    });
    setTitle('');
    setDesc('');
    setDate(new Date());
    setDateText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>New Task...</Text>
        <Image source={user} style={styles.userIcon} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Title</Text>
        <TextInput
          placeholder='Write your title...'
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Date</Text>
        <TouchableOpacity onPress={showDatepicker} style={styles.datePicker}>
          <Text style={styles.dateText}>{dateText || 'Choose the date...'}</Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
            style={styles.datePicker}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Desc</Text>
        <TextInput
          placeholder='Write your description...'
          style={styles.input}
          value={desc}
          onChangeText={setDesc}
        />
      </View>
      <TouchableOpacity onPress={addTask} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
  
};

export default Add_task;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  userIcon: {
    width: 40,
    height: 40,
  },
  inputContainer: {
    marginTop: 20,
  },
  inputLabel: {
    fontSize: 16,
  },
  input: {
    borderBottomWidth: 2,
    height: 50,
  },
  datePicker: {
    borderBottomWidth: 2,
    height: 50,
  },
  dateText: {
    fontSize: 16,
  },
  addButton: {
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
    opacity: 0.5,
  },
  addButtonText: {
    fontSize: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#733de0',
  },
});
