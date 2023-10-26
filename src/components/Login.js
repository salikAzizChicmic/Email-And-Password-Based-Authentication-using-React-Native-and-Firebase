import React,{useEffect, useState} from 'react'
import { Image, Text,TextInput,TouchableOpacity,View } from 'react-native'
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    useEffect(()=>{
        if(auth().currentUser){
            navigation.navigate("Dashboard")
        }
    },[])
    const navigation=useNavigation()
    const handleLogin=()=>{
        try {
            auth().signInWithEmailAndPassword(email, password).then((res)=>{
                console.log(res)
                navigation.navigate("Dashboard")
            }).catch((err)=>{
                console.log(err)
            })
          } catch (error) {
            console.log(error);
          }
    }
  return (
    <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:"50%"}}>
        <Text style={{fontSize:25,color:'black',fontWeight:'bold'}}>SIGN IN</Text>
        <View style={{flexDirection:'row',marginTop:20,borderWidth:1,width:'60%',borderRadius:10}}>
            <Image style={{height:26,width:26,marginTop:9,marginLeft:6}} source={require('../Assets/mail.png')} />
            <TextInput style={{width:'83%',marginLeft:5}} onChangeText={(text)=>setEmail(text.trim())}  placeholder='Email' />
        </View>
        <View style={{flexDirection:'row',marginTop:20,borderWidth:1,width:'60%',borderRadius:10}}>
            <Image style={{height:26,width:26,marginTop:9,marginLeft:6}} source={require('../Assets/padlock.png')} />
            <TextInput style={{width:'83%'}} onChangeText={(text)=>setPassword(text.trim())}  placeholder='Password' />
        </View>

        <View style={{flexDirection:'row',marginTop:20,width:'60%'}}>
            <Text>Dont have an account? </Text>
            <TouchableOpacity onPress={()=>navigation.navigate("Register")}>
                <Text style={{color:'blue'}}>Register Here</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleLogin} style={{backgroundColor:'black',marginTop:20}}>
            <Text style={{color:'white', paddingHorizontal:35,paddingVertical:9,fontSize:20}}>Login</Text>
        </TouchableOpacity>

    </View>
  )
}

export default Login