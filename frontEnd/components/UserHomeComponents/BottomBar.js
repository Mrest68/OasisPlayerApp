import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { DimensionValue } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const {width,height} = Dimensions.get('window');
const calcFont = (percent)=>{
  const size = width/375;
  return Math.round(size*percent)
}

const BottomBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.bar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // const iconName = options.tabBarIcon ? options.tabBarIcon({ size: 24, color: isFocused ? '#673ab7' : '#222' }).props.name : 'default-icon';

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[styles.tab, isFocused && styles.tabFocused]}
          >
            {options.tabBarIcon && options.tabBarIcon({ size: calcFont(24), color: isFocused ? '#36b2f9' : 'white' })}

            {/* <Text style={{ color: isFocused ? '#33DAFF' : 'white' }}>
              {label}
            </Text> */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    position:'absolute',
    bottom: 10,
    left:60,
    right:60,
    borderRadius:20,
    flexDirection: 'row',
    height: calcFont(40),
    backgroundColor:'black',
    borderTopColor: 'blue',
   
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabFocused: {
    borderBottomColor: 'blue',
  },
  
});

export default BottomBar;
