import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import CustomInput from '../components/CustomInput';
import logo from '../assets/images/oasis_badge.png';
import CustomButton from '../components/CustomButton.js';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const Login = ({ setIsAuthenticated, setUserRole }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userToken, setUserToken] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        email: username,
        password: password,
      });
      await AsyncStorage.setItem('email', username);
      const { success, token, role, profilePicture } = response.data;
      if (success) {
        setUserToken(token);
        setIsAuthenticated(true);
        setUserRole(role);

        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('role', role);

        // Test for Warning Bugs when logging in with correct credentials
        // console.log(token,AsyncStorage.getItem('userToken'))
        // console.log(role, AsyncStorage.getItem('role'))
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.root}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
      <CustomInput placeholder="Username" value={username} setValue={setUsername} />
      <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true} />
      <CustomButton text="Sign In" onPress={handleSubmit} />
      <Text style={styles.footNote}>Powered by USYF</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: width * 0.05,  // 5% of screen width for padding
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  logo: {
    margin: height * 0.05,  // 5% of screen height for margin
    height: height * 0.2,   // 20% of screen height for logo size
    width: width * 0.4,     // 40% of screen width for logo size
    marginBottom: height * 0.03, // 3% of screen height for margin bottom
  },
  footNote: {
    color: 'grey',
    marginTop: height * 0.02,  // 2% of screen height for margin top
  }
});

export default Login;
