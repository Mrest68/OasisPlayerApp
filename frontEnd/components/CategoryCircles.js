import React, { useState } from "react";
import { View, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Text } from "react-native";
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');
const baseWidth = 375;
const baseHeight = 667;

const scale = Math.min(width / baseWidth, height / baseHeight); // Uniform scale based on the smaller dimension

const CategoryCircles = ({ images, onCategorySelect }) => {
    const [pressedIndex, setPressedIndex] = useState(null);
    
    const handlePress = (index) => {
        setPressedIndex(index);
        const selectedCategory = images[index].category;
        console.log("Selected Category:", selectedCategory); 
        onCategorySelect(selectedCategory);
    };
    
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                {images.map((imageSource, index) => (
                    <TouchableOpacity
                        key={index} 
                        onPress={() => handlePress(index)}
                    >
                        <Image
                            style={[styles.image, pressedIndex === index && styles.isPressed]}
                            source={imageSource.source}
                        />
                        <Text style={styles.categoryText}>{images[index].category}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    categoryText: {
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16 * scale, // Adjust font size based on uniform scale
        marginTop: 5 * scale,  // Adding margin to separate text from the image
    },
    container: {
        height: height * 0.22, // 22% of screen height
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '100%', // Full width of the screen
    },
    scrollContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10 * scale, // Full width of the screen
    },
    image: {
        height: 95 * scale, // Use uniform scale for image height
        width: 95 * scale, // Use uniform scale for image width to keep a square aspect ratio
        borderRadius: 95 * scale / 2, // Half of width or height for perfect circle
        marginHorizontal: 10 * scale, // Adjust margin based on uniform scale
    },
    isPressed: {
        borderWidth: 3 * scale, // Adjust border width based on uniform scale
        borderColor: '#9dcff8',
    },
});

export default CategoryCircles;
