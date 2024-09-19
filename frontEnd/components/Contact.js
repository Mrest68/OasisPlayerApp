import React from "react";
import {View,Text,Image,StyleSheet} from "react-native";
import { Dimensions } from "react-native";

const {width,height} = Dimensions.get('window');
const baseWidth = 375;
const baseHeight = 667;
const scale = Math.min(width / baseWidth, height / baseHeight); 
const calcFont = (percent)=>{
    const size = width/375;
    return Math.round(percent*size);
};

const Contact = () =>{
    return(
        <View style={styles.container} >
        <Image style={styles.Image} source= {require("../assets/images/oasis_badge.png")}/>
        <Text style={styles.comingsoon}> Schedule Training Coming Soon...</Text>
            
        </View>
    )
}
const styles = StyleSheet.create({
    comingsoon:{
        fontSize:calcFont(21),
        justifyContent:'center',
        marginTop:'20%',


    },
    container:{
        flex:1,
        // justifyContent:'center',
        alignItems:'center',

    },
    Image:{
        height: 200 * scale,
        width:200 * scale,
        marginTop:'30%'

        
    }
})

export default Contact;