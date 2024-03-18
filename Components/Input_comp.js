import { Button, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';

const Input_comp = () => {
  return (
    <View style={styles.inputContainer}>
        <TextInput placeholder='Your course goal!' style={styles.TextInput}/>
        <Button title="Add Goal "/>
    </View>
  )
}

export default Input_comp

const styles=StyleSheet.create({
    inputContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingBottom:24,
        borderBottomWidth:2,
        borderBottomColor:'#FF0800'
      },
})