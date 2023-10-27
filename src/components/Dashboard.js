import React, { useEffect, useState } from 'react'
import { Text, View ,TouchableOpacity, Image, ScrollView, TextInput, KeyboardAvoidingView} from 'react-native'
import auth from '@react-native-firebase/auth';
import { useNavigation, useRoute } from '@react-navigation/native';
import Message from './Message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/database';



const Dashboard = () => {
    const navigation=useNavigation()
    const route=useRoute()
    const {name,uid}=route.params
    const [msgText,setMessage]=useState("")
    const [allMsg,setAllMsg]=useState(null)
  const handleLogout=()=>{
    auth().signOut()
    navigation.navigate("Login")
  }

  const readData=()=>{
    const path=`/user/${auth().currentUser.uid}/chats/${uid}/`
    firebase.app()
      .database('https://emailauth-35097-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref(path)
      .once('value')
  .then(snapshot => {
    //console.log(Object.values(snapshot.val()))
    var p=Object.keys(snapshot.val()) ; p.sort(); 
    var q=p.map((val1)=>{return snapshot.val()[val1]})
    setAllMsg(q)
    
  })
  }

  const handleSend=()=>{
    var mili=new Date().getTime()
    firebase.app().database('https://emailauth-35097-default-rtdb.asia-southeast1.firebasedatabase.app/')
  .ref(`/user/${auth().currentUser.uid}/chats/${uid}/${mili}`)
  .set(msgText)
  .then(() => {
    console.log('Data set reciever end')
    readData()
  });

  firebase.app().database('https://emailauth-35097-default-rtdb.asia-southeast1.firebasedatabase.app/')
  .ref(`/user/${uid}/chats/${auth().currentUser.uid}/${mili}`)
  .set(msgText)
  .then(() => {
    console.log('Data set sender end')

  });
  }

  
  useEffect(()=>{
    readData()
  },[])
  return (
    <View style={{flexDirection:'column'}}>
       <View style={{flexDirection:'row'}}>
       <TouchableOpacity>
          <View style={{backgroundColor:'white',marginTop:10,marginLeft:10,paddingHorizontal:10,height:50,paddingVertical:15,borderRadius:10}}>
            <Image style={{height:20,width:20}} source={require('../Assets/left-arrow.png')} />
          </View>
        </TouchableOpacity>  
          <Image style={{height:60,width:60,marginLeft:10,borderRadius:50,marginTop:5}} source={{uri:'https://randomuser.me/api/portraits/thumb/men/20.jpg'}} />
          <View style={{flexDirection:'column',marginTop:12,marginLeft:10}}>
              <Text style={{fontSize:18,fontWeight:'bold',color:'black'}}>{name}</Text>
              <Text>Online</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'flex-end'}}>
          <TouchableOpacity>
            <View style={{marginLeft:50,backgroundColor:'white',height:50,paddingVertical:8,paddingHorizontal:4,borderRadius:10,marginTop:10}}>
              <Image style={{height:30,width:30}} source={require('../Assets/info.png')} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <View style={{backgroundColor:'white',height:50,paddingVertical:8,paddingHorizontal:8,borderRadius:10,marginTop:10,marginHorizontal:10}}>
              <Image style={{height:30,width:25,objectFit:'fill'}} source={require('../Assets/log-out.png')} />
            </View>
          </TouchableOpacity>
          </View>
       </View>
       <View style={{backgroundColor:'lightgrey',height:2,width:'100%',marginVertical:10}} />
        <ScrollView style={{maxHeight:"81%"}}>
            {allMsg && allMsg.map((ele)=>{
              return <Message key={new Date().getTime()} data={ele} />
            }) }
            
        </ScrollView>
        <KeyboardAwareScrollView>
        <KeyboardAvoidingView style={{backgroundColor:'white',marginHorizontal:10,borderRadius:10,marginVertical:5,flexDirection:'row'}}>
          <TextInput onChangeText={(text)=>setMessage(text)} placeholder='Enter message to send' />
          <TouchableOpacity onPress={handleSend}>
              <Image style={{height:25,width:25,objectFit:'fill',marginLeft:"67%",marginVertical:'5.5%'}} source={require('../Assets/send.png')} />
          </TouchableOpacity>
        

        </KeyboardAvoidingView>
        </KeyboardAwareScrollView>
    </View>
    
  )
}

export default Dashboard