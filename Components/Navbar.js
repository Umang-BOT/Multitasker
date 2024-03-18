import { Button, ImageBackground, StyleSheet, Text, TextInput, View,Image} from 'react-native';
import menu from '../assets/menu.png'
import man from '../assets/man.png'

const Navbar = () => {
  return (
    <View style={styles.design}>
        <Image source={menu} style={styles.image}/>
        <View style={styles.spacer} />
        <Image source={man} style={styles.image}/>
    </View>
  )
}

export default Navbar

const styles=StyleSheet.create({
    design:{
        flexDirection:'row',
        padding:5,
        backgroundColor:'transparent'
    },
    image: {
        width: 35,
        height: 35,
      },
      spacer:{
        flex:1
      }
})
