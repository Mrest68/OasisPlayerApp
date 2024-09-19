import React from "react";
import { Dimensions, View,Text , StyleSheet,Image} from "react-native";


const {width, height} = Dimensions.get('window')
const baseWidth = 375;
const baseHeight = 667;
const scale = Math.min(width / baseWidth, height / baseHeight); 
const HomeHeader = ()=>{
    return(
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/images/oasis_badge.png')} />
            {/* <Text style={styles.title}>
                Oasis Futsal Academy
            </Text> */}
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        height : 0.18 * height,
        backgroundColor: '#9dcff8',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',


    },
    // title:{
    //     fontSize: 15,
    //     textAlign:'center',
    //     color:'black',
    //     fontWeight:'bold',
    //     paddingTop:10,
    // },
    logo:{
        height:80 *scale,
        width: 80 * scale,
        marginTop: '7%',
    }

})
export default HomeHeader;
