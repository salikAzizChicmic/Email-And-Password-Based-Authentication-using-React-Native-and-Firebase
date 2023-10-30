import React, { useEffect, useRef, useState } from 'react'
import { Text, View ,TouchableOpacity, Image, ScrollView, TextInput} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import auth from '@react-native-firebase/auth';
import { useNavigation, useRoute } from '@react-navigation/native';
import Message from './Message';
import { firebase } from '@react-native-firebase/database';
import { style } from './Style';


var c=0
const Dashboard = () => {
    const navigation=useNavigation()
    const ref=useRef(null);
    
    const route=useRoute()
    const {name,uid}=route.params
    const [msgText,setMessage]=useState("")
    const [allMsg,setAllMsg]=useState([])

    const [loading,setLoading]=useState(false)

    
  const handleLogout=()=>{
    auth().signOut()
    navigation.navigate("Login")
  }

  const readData=()=>{
    setLoading(false)
    console.log("Reading")
    const path=`/user/${auth().currentUser.uid}/chats/${uid}/`
    firebase.app()
      .database('https://emailauth-35097-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref(path)
      .once('value')
  .then(snapshot => {
    //console.log(Object.values(snapshot.val()))
    var p=Object.keys(snapshot.val()) ; 
    p.sort(); 
    var q=p.map((val1,key)=>{return snapshot.val()[val1]})
    setAllMsg(q)
    //setLoading(true)
    ref.current?.scrollToEnd({ animated: true });
    console.log(q)
    
  })
  }

  const handleSend=()=>{
    setMessage("")
   if(msgText.trim().length>0){
    var mili=new Date().getTime()
    firebase.app().database('https://emailauth-35097-default-rtdb.asia-southeast1.firebasedatabase.app/')
  .ref(`/user/${auth().currentUser.uid}/chats/${uid}/${mili}`)
  .set(msgText)
  .then(() => {
    console.log('Data set reciever end')
    firebase.app().database('https://emailauth-35097-default-rtdb.asia-southeast1.firebasedatabase.app/')
  .ref(`/user/${uid}/chats/${auth().currentUser.uid}/${mili}`)
  .set(msgText)
  .then(() => {
    readData()

  });
  })
   }
   
  }

  const handleback=()=>{
    navigation.popToTop()
    navigation.navigate("UserView")
  }



  
  useEffect(()=>{
      readData()
  },[])
  return (
    <View style={style.Box}>
       <View style={style.sUBbOX}>
       <TouchableOpacity onPress={handleback}>
          <View style={style.BackBtn}>
            <Image style={style.BackImg} source={require('../Assets/left-arrow.png')} />
          </View>
        </TouchableOpacity>  
          <Image style={{height:60,width:60,marginLeft:10,borderRadius:50,marginTop:5}} source={{uri:'https://randomuser.me/api/portraits/thumb/men/20.jpg'}} />
          <View style={{flexDirection:'column',marginTop:12,marginLeft:10}}>
              <Text style={{fontSize:18,fontWeight:'bold',color:'black'}}>{name}</Text>
              <Text>Online</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'flex-start'}}>
          <TouchableOpacity>
            <View style={{marginLeft:50,backgroundColor:'white',height:50,paddingVertical:8,paddingHorizontal:1,borderRadius:10,marginTop:10}}>
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
        <ScrollView ref={ref} style={{maxHeight:"84%"}}>
            {allMsg.map((ele)=>{
              return <Message key={c++} data={ele} />
            }) }
            
        </ScrollView>
        <KeyboardAwareScrollView style={{position:'absolute',marginTop:"190%"}}>
        <View style={{backgroundColor:'white',marginHorizontal:10,borderRadius:10,marginVertical:5,flexDirection:'row'}}>
          <TextInput style={{width:"92%"}} value={msgText} onChangeText={(text)=>setMessage(text)} placeholder='Enter message to send' />
          <TouchableOpacity  onPress={handleSend}>
              <Image style={{height:25,width:25,objectFit:'fill',marginVertical:'40%'}} source={require('../Assets/send.png')} />
          </TouchableOpacity>
        </View>
        </KeyboardAwareScrollView>
    </View>
    
  )
}

export default Dashboard