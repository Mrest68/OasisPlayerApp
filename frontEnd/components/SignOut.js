import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');

// Calculate scaling factors
const baseWidth = 390;
const baseHeight = 844;
const scale = Math.min(width / baseWidth, height / baseHeight);

const calcFont = (size) => Math.round(size * scale);

const SignOutButton = () => {
  const navigation = useNavigation(); // Correctly getting the navigation object

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('role');
      await AsyncStorage.removeItem('email');
      navigation.navigate('RootNavigator', { screen: 'AuthStack', params: { screen: 'Login' } });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={styles.signOut}>
      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  signOut: {
    position: 'absolute',
    bottom: 120,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '30%',
    borderBottomColor: 'black',
    borderWidth: 1,
    borderRightColor: 'white',
    borderLeftColor: 'white',
    borderTopColor: 'white',
  },
  signOutText: {
    color: 'black',
    fontSize: calcFont(15),  // Customize text size
    fontWeight: 'bold',
    textAlign: 'center', // Bold text
  },
});

export default SignOutButton;
