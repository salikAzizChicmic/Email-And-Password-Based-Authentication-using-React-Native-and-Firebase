import React from 'react'
import { Text, View ,TouchableOpacity} from 'react-native'
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
    const navigation=useNavigation()
  const handleLogout=()=>{
    auth().signOut()
    navigation.navigate("Login")
  }
  return (
    <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:200}}>
        <Text style={{fontSize:20,fontWeight:'bold'}}>{auth().currentUser.email}</Text>
        <TouchableOpacity onPress={handleLogout} style={{backgroundColor:'black',marginTop:20}}>
            <Text style={{color:'white', paddingHorizontal:65,paddingVertical:9,fontSize:20}}>Logout</Text>
        </TouchableOpacity>
    </View>
    
  )
}

export default Dashboard