import React from "react";
import {View,Text,Image,StyleSheet, Dimensions} from "react-native";
import Tabs from '../Tabs.js'
import CategoryCircles from '../CategoryCircles.js'
import HomeHeader from '../HomeHeader.js'
const { width,height} = Dimensions.get('window');
const calcFont = (percent)=>{
    const size = width/375;
    return Math.round(size*percent)
}
const UserHome = ()=>{
    return (
        <View style={styles.container} >
        <HomeHeader/>
        <Tabs/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#F2F6FB',
        flex:1,
        justifyContent:'center',
        alignItems:'center',

    },
    Image:{
        height: calcFont(300),
        width:calcFont(300),
        
    }
})

export default UserHome;