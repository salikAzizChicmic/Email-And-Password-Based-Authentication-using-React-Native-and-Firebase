import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, TextInput, View } from 'react-native'
import UserList from './UserList'
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

var ct=0;
const UserView = () => {
  const[user,setAllUser]=useState([])
  const navigation=useNavigation()
 
  useEffect(()=>{
    const path='/user/'
    
  const reference = firebase.app()
      .database('https://emailauth-35097-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref(path)
      .once('value')
  .then(snapshot => {
    console.log(snapshot.val())
    let arr=[]    
    for(let x in snapshot.val()){
      if(x!==auth().currentUser.uid){
        const obj={
          uid:x,
          name:snapshot.val()[x].uname,
          email:snapshot.val()[x].uemail
         }
         arr.push(obj)
      }
    }
    setAllUser(arr)
    console.log(arr)
  });
  },[])
      
  return (
    <View>
        <View style={{flexDirection:'row',backgroundColor:'white',marginVertical:10,marginHorizontal:10,borderRadius:10}}>
            <TextInput style={{width:'85%'}} placeholder='Enter your requirements' />
            <Image style={{height:"50%",width:"7%",marginVertical:10}} source={require('../Assets/search.png')} />
        </View>
        <View style={{width:'100%' ,height:1,backgroundColor:'lightgrey',marginBottom:10}} />
        <ScrollView style={{height:700}}>
            {user && user.map((ele)=>{
              return <UserList key={ct++} uid={ele.uid} name={ele.name} email={ele.email} />
            }) }
            
        </ScrollView>
    </View>

  )
}

export default UserView