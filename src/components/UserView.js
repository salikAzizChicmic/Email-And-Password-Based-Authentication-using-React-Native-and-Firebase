import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, TextInput, View } from 'react-native'
import UserList from './UserList'
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { style } from './UserViewStyle';

var ct=0;
const UserView = () => {
  const[user,setAllUser]=useState([])
  const[curuser,setCurUser]=useState([])
  const[searchText,setSearchText]=useState("")
  const navigation=useNavigation()

  const getData=()=>{
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
    setCurUser(arr)
    //console.log(arr)
  });
  }
 
  useEffect(()=>{
    getData()
  },[])

  const handleSearch=(text)=>{
    setSearchText(text);
    console.log(user)
    if(searchText.trim().length>0){
      const temp=curuser.filter((ele)=>ele.name.includes(searchText))
      setAllUser(temp)
    }else{
      setAllUser(user)
    }
    
    
  }

  const handleSearch1=()=>{
    if(searchText.trim().length>0){
      const temp=curuser.filter((ele)=>ele.name.includes(searchText))
      setAllUser(temp)
    }else{
      setAllUser(user)
    }
    
    
  }
      
  return (
    <View>
        <View style={style.box}>
            <TextInput onChange={handleSearch1} onChangeText={(text)=>setSearchText(text)} style={style.searchInp} placeholder='Enter your requirements' />
            <Image style={style.searchImg} source={require('../Assets/search.png')} />
        </View>
        <View style={style.borderView} />
        <ScrollView style={style.scrl}>
            {user && user.map((ele)=>{
              return <UserList key={ct++} uid={ele.uid} name={ele.name} email={ele.email} />
            }) }
            
        </ScrollView>
    </View>

  )
}

export default UserView