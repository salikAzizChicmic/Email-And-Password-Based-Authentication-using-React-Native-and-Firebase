import React from 'react'
import { View,Text } from 'react-native'

const Message = ({data}) => {
  return (
    <View style={{marginLeft:10,backgroundColor:'#0077b5',maxWidth:300,borderTopLeftRadius: 40,marginEnd:8, borderTopRightRadius: 40, borderBottomLeftRadius: 40,marginBottom:20,flexDirection:'row',alignSelf:'flex-start'}}>
        <Text style={{color:'white',fontSize:15,marginHorizontal:15,marginVertical:10}}>{data}</Text>
    </View>
  )
}

export default Message