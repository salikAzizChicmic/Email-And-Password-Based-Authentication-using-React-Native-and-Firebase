import { useNavigation } from '@react-navigation/native'
import React, { useEffect,useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { firebase } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

var ct=0
const UserList = ({name,email,uid}) => {
  const [allMsg,setAllMsg]=useState([])
  const [time,setTime]=useState("")
  const navigation=useNavigation();
  const handleNavigate=()=>{
    navigation.popToTop()
    navigation.navigate("Dashboard",{name:name,uid:uid})
    
  }

  const readData=()=>{
    const path=`/user/${auth().currentUser.uid}/chats/${uid}/`
    firebase.app()
      .database('https://emailauth-35097-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref(path)
      .once('value')
  .then(snapshot => {
    console.log(Object.values(snapshot.val()))
    var p=Object.keys(snapshot.val()) ; p.sort()
    let last=new Date(parseInt(p[p.length-1]))
    console.log(last.toString())
    setTime(`${last.getHours()}:${last.getMinutes()}`)
    var q=p.map((val1)=>{return snapshot.val()[val1]})

    setAllMsg(q)
  })
  }

  useEffect(()=>{
    readData()
  },[])
  return (
    <TouchableOpacity onPress={handleNavigate}>
    <View style={{height:1,width:'100%',backgroundColor:'lightgrey'}} />

    <View style={{backgroundColor:'white',flexDirection:'row'}}>
        <Image style={{height:100,width:100,borderRadius:50,marginVertical:10,marginHorizontal:5}} source={{uri:'https://randomuser.me/api/portraits/thumb/men/20.jpg'}} />

        <View style={{flexDirection:'column',marginLeft:10}}>
            <Text style={{marginTop:20,fontSize:20,fontWeight:'bold',color:'black'}}>{name}</Text>
            <Text style={{maxWidth:250}}>{allMsg!==null ?allMsg[allMsg.length-1]:"Demo Message"}</Text>
        </View>
        <Text style={{position:'absolute',marginLeft:'90%',marginTop:'5%'}}>{time}</Text>
    </View>
        <View style={{height:1,width:'100%',backgroundColor:'lightgrey'}} />
    </TouchableOpacity>
  )
}

export default UserList