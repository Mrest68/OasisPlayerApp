import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import SignOutButton from "../components/SignOut.js";

const { width, height } = Dimensions.get('window');

// Calculate scaling factors
const baseWidth = 390;
const baseHeight = 844;
const scale = Math.min(width / baseWidth, height / baseHeight);

const calcFont = (size) => Math.round(size * scale);

const ProfilePage = () => {
    const [playerInfo, setPlayerInfo] = useState(null);
    const [playerRef, setPlayerRef] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedPlayerRef = await AsyncStorage.getItem('email');
                if (storedPlayerRef) {
                    setPlayerRef(storedPlayerRef);

                    const response = await axios.get('http://127.0.0.1:5000/getUserInfo', {
                        params: { playerName: storedPlayerRef }
                    });

                    if (response.data.success) {
                        const playerData = response.data.userInfo[0];
                        setPlayerInfo(playerData);
                    } else {
                        console.log('Failed to fetch player data');
                    }
                } else {
                    console.log('Player reference is null');
                }
            } catch (error) {
                console.error('Error fetching player info', error);
            }
        };

        fetchData();
    }, []); 

    return (
        <View style={styles.container}>
            {playerInfo ? (
                <>
                    {/* FIFA Card Image */}
                    <View style={styles.cardContainer}>
                        <Image
                            style={styles.image}
                            source={require("../assets/images/fifaCard.png")}
                        />

                        {/* Overlayed Elements */}
                        <Image
                            style={styles.badge}
                            source={require("../assets/images/oasis_badge.png")}
                        />
                        <Image
                            style={styles.cardPicture}
                            source={{ uri: playerInfo.profilPicUrl }}
                        />
                        <Text style={styles.cardOverall}>{playerInfo.Overall}</Text>
                        <Text style={styles.cardPosition}>{playerInfo.playerPosition}</Text>
                        <Text style={styles.cardName}>{playerInfo.Name}</Text>
                    </View>
                    <SignOutButton style={styles.signOut}/>
                </>
            ) : (
                <>
                    <Text>Loading...</Text>
                    <SignOutButton style={styles.signOut}/>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    cardContainer: {
        width: '90%',     // 90% of the screen width
        height: '60%',    // 60% of the screen height
        position: 'relative', // Ensures child elements can be absolutely positioned
    },
    image: {
        width: '100%',    // Full width of the container
        height: '100%',   // Full height of the container
        resizeMode: 'contain', // Adjust the image to fit without stretching
    },
    badge: {
        position: 'absolute',
        top: '30%',         // Position the badge relative to the card
        left: '15%',        // Left margin as a percentage of container
        width: '25%',      // Width as a percentage of the card container
        height: '25%', 
        resizeMode:'contain',    // Height as a percentage of the card container
    },
    cardPicture: {
        position: 'absolute',
        top: '20%',        // Adjust top percentage to position it properly
        left: '47%',
        width: '35%',      // Width of the picture relative to the card
        height: '35%',     // Height of the picture relative to the card
        resizeMode: 'contain',
        borderRadius:'30%'

    },
    cardOverall: {
        position: 'absolute',
        top: '15%',        // Adjust top percentage based on the image layout
        left: '23%',      // Position on the right side of the card
        fontSize: calcFont(40), // Font scaling
        fontWeight: 'bold',
        color: 'white',
    },
    cardPosition: {
        position: 'absolute',
        top: '25%',        // Adjust based on card layout
        left: '25%',       // Positioned near the overall rating
        fontSize: calcFont(20),
        color: 'white',
    },
    cardName: {
        position: 'absolute',
        bottom: '35%',     // Positioned near the bottom
        left: '39%',       // Left alignment relative to the card
        fontSize: calcFont(30),
        fontWeight: 'bold',
        color: 'white',
    },
    signOut:{
        fontSize:calcFont(20)
    }
});

export default ProfilePage;
