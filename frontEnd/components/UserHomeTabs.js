import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserHome from '../components/UserHomeComponents/UserHome.js';
import ProfilePage from '../components/ProfilePage.js';
import BottomBar from '../components/UserHomeComponents/BottomBar.js';
import Contact from '../components/Contact.js';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const Tab = createBottomTabNavigator();

function UserHomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomBar {...props} />}
      initialRouteName="Home" // Ensure "Home" is the default route
    >
      <Tab.Screen 
        name="Contact" 
        component={Contact} 
        options={{
          tabBarIcon: ({ size, color }) => <Icon name='contacts' size={size} color={color} />,
          tabBarLabel: 'Contact'
        }}
      />
      <Tab.Screen 
        name="Home" 
        component={UserHome} 
        options={{
          tabBarIcon: ({ size, color }) => <Icon name='home' size={size} color={color} />,
          tabBarLabel: 'Home'
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfilePage} 
        options={{
          tabBarIcon: ({ size, color }) => <Icon name='person' size={size} color={color} />,
          tabBarLabel: 'Profile'
        }}
      />
    </Tab.Navigator>
  );
}

export default UserHomeTabs;
