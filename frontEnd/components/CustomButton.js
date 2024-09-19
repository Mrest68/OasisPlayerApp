import React from "react";
import {View,Text,StyleSheet, Pressable} from 'react-native';

const CustomButton = ({onPress, text }) =>{
    return (

        <Pressable onPress={onPress} style = {styles.container}>
            <Text style={styles.text}> {text}</Text>



        </Pressable>

    );
};
const styles = StyleSheet.create(
    {
        container: {
            backgroundColor: 'black',
            width: '50%',
            padding: 15,
            marginVertical: 5,
            alignItems: 'center',
            borderRadius:20,
            marginTop:25,
            

        },
        text:{
            fontWeight:'bold',
            color:'white',

        }
    });
    export default CustomButton;