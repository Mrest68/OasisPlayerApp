import React,{useState} from "react";
import { TextInput,View , StyleSheet,Text } from "react-native";

const CustomInput = ({value,setValue,placeholder,secureTextEntry}) => {

    return(
    <View style={styles.container}>
    <TextInput
    value={value}
    onChangeText={setValue}
    placeholder={placeholder}
    style={styles.input}
    secureTextEntry={secureTextEntry}
    autoCapitalize="none"  />
</View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginTop:10,
    },
    input:{
        width: '100%',
        borderColor:'#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical:2,
        textAlign:'center',
        height: 40,
    },
});

export default CustomInput;