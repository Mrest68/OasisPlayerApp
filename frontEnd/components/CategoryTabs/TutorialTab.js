import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Modal, TouchableOpacity, Platform } from 'react-native';
import { Video } from 'expo-av';
import axios from 'axios';

const { width, height } = Dimensions.get('window');
const calcFont = (percent)=>{
    const size = width/375;
    return Math.round(percent*size);
};


const TutorialTab = ({ selectedCategory }) => {
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null);
    const [filterVideo, setFilterVideo] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const loadVideos = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:5000/tutorials");
            console.log("API Response:", response.data);
            if (response.data.success) {
                const videoData = response.data.video_urls
                    .filter(item => item.url && !item.url.endsWith('None'))
                    .map(item => ({ url: item.url, title: item.name || 'No Title', description: item.description || 'No Description', category: item.category || 'No Category' }));

                setVideos(videoData);
                setFilterVideo(videoData.filter(video => video.category === selectedCategory));
                console.log(filterVideo);

            } else {
                setError("Failed to load videos");
            }
        } catch (error) {
            console.error("Error loading videos:", error);
            setError("Failed to load videos");
        }
    };

    useEffect(() => {
        loadVideos();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            setFilterVideo(videos.filter(video => video.category === selectedCategory));
        } else {
            setFilterVideo(videos);
        }
    }, [selectedCategory, videos]);

    const handlePlayPress = (videoUrl) => {
        setSelectedVideo(videoUrl);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedVideo(null);
    };

    console.log("Filtered Videos:", filterVideo);

    return (
        <View style={styles.container}>
            {error && <Text style={styles.errorText}>{error}</Text>}
            {videos.length > 0 ? (
                <ScrollView contentContainerStyle={styles.videoScrollContainer}>
                    {filterVideo.map((video, index) => (
                        <View key={index} style={styles.videoRow}>
                            <Video
                                source={{ uri: video.url }}
                                style={styles.video}
                                useNativeControls
                                resizeMode="contain"
                            />
                            <View style={styles.textContainer}>
                                <View style={styles.textAndButtonContainer}>
                                    <View style={styles.textContent}>
                                        <Text style={styles.videoTitle}>{video.title}</Text>
                                        <Text style={styles.videoDescription}>{video.description}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => handlePlayPress(video.url)} style={styles.playButtonContainer}>
                                        <Text style={styles.playButtonText}>▶</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <Text style={styles.loadingText}>Loading...</Text>
            )}
            {selectedVideo && (
                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    onRequestClose={handleCloseModal}
                    animationType="slide"
                >
                    <View style={styles.modalContainer}>
                        <Video
                            source={{ uri: selectedVideo }}
                            style={styles.fullScreenVideo}
                            useNativeControls
                            resizeMode="contain"
                            shouldPlay
                        />
                        <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                            <Text style={styles.closeButtonText}>✖</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    playButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#36b2f9',
        borderRadius: 10,
        padding: '3%',
    },
    playButtonText: {
        fontSize:calcFont(20),
        color: 'white',
        margin:'2%'
    },
    loadingText: {
        textAlign: 'center',
        fontSize:calcFont(20),
        fontWeight: 'bold',
        color: '#36b2f9',
    },
    container: {
        flex: 1,
        marginTop: '3%',
    },
    videoScrollContainer: {
        paddingHorizontal: '5%',
    },
    videoRow: {
        flexDirection: 'row',
        marginBottom: '5%',
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '4%',
    },
    video: {
        // width: 84.5,
        width:calcFont(84.5),
        height:calcFont(150),
        borderRadius: 5,
    },
    textContainer: {
        flex: 1,
        margin: '4%',


    },
    textAndButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // margin:'4%',
    },
    textContent: {
        flex: 1,
    },
    videoTitle: {
        fontSize: calcFont(15),
        fontWeight: 'bold',
    },
    videoDescription: {
        fontSize: calcFont(13),
        color: '#555',
        marginTop: '3%',
    },
    errorText: {
        color: 'red',
        marginVertical: '3%',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreenVideo: {
        width: width,
        height: height,
    },
    closeButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 50 : 30,
        right: Platform.OS === 'ios' ? 20 : 30,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: '2%',
    },
    closeButtonText: {
        fontSize: 24,
        color: 'black',
    },
});

export default TutorialTab;
