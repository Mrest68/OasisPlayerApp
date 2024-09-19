import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import TutorialTab from '../components/CategoryTabs/TutorialTab';
import HomeworkTab from '../components/CategoryTabs/HomeworkTab';
import InterviewTab from '../components/CategoryTabs/InterviewTab';
import CategoryCircles from './CategoryCircles';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Base dimensions for consistent scaling
const baseWidth = 375;
const baseHeight = 667;

// Calculate scale factors
const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;

const Tabs = () => {
    const [selectedTab, setSelectedTab] = useState('Interview');
    const [selectedCategory, setSelectedCategory] = useState('');

    const images = {
        TrainingModules: [
            { source: require('../assets/images/oasis_badge.png'), category: 'Passing' },
            { source: require('../assets/images/oasis_badge.png'), category: 'Shooting' },
            { source: require('../assets/images/oasis_badge.png'), category: 'Dribbling' },
            { source: require('../assets/images/oasis_badge.png'), category: 'Control' },
            { source: require('../assets/images/oasis_badge.png'), category: 'Attacking' },
        ],
        Interview: [
            { source: require('../assets/images/oasis_badge.png'), category: 'Player' },
            { source: require('../assets/images/oasis_badge.png'), category: 'Coach' },
        ],
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const renderContent = () => {
        switch (selectedTab) {
            case 'TrainingModules':
                return (
                    <>
                        <CategoryCircles images={images[selectedTab]} onCategorySelect={handleCategorySelect} />
                        <TutorialTab selectedCategory={selectedCategory} />
                    </>
                );
            case 'Interview':
                return (
                    <>
                        <CategoryCircles images={images[selectedTab]} onCategorySelect={handleCategorySelect} />
                        <InterviewTab selectedCategory={selectedCategory} />
                    </>
                );
            case 'Homework':
                return <HomeworkTab selectedCategory={selectedCategory} />;
            default:
                return <Text>Select a tab to see content</Text>;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    onPress={() => setSelectedTab('Interview')}
                    style={[styles.tabButton, selectedTab === 'Interview' && styles.tabButtonActive]}
                >
                    <Text style={[styles.tabButtonText, selectedTab === 'Interview' && styles.tabButtonTextActive]}>
                        Interview
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setSelectedTab('TrainingModules')}
                    style={[styles.tabButton, selectedTab === 'TrainingModules' && styles.tabButtonActive]}
                >
                    <Text style={[styles.tabButtonText, selectedTab === 'TrainingModules' && styles.tabButtonTextActive]}>
                        Training Modules
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setSelectedTab('Homework')}
                    style={[styles.tabButton, selectedTab === 'Homework' && styles.tabButtonActive]}
                >
                    <Text style={[styles.tabButtonText, selectedTab === 'Homework' && styles.tabButtonTextActive]}>
                        Homework
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {renderContent()}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#9dcff8',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    tabButton: {
        paddingVertical: 10 * scaleHeight, // Adjust padding based on screen height
        paddingHorizontal: 20 * scaleWidth, // Adjust padding based on screen width
    },
    tabButtonActive: {
        borderBottomWidth: 2 * scaleHeight, // Adjust border width based on screen height
        borderBottomColor: 'black',
    },
    tabButtonText: {
        fontSize: 16 * scaleWidth, // Adjust font size based on screen width
        color: '#666',
    },
    tabButtonTextActive: {
        color: 'white',
        fontWeight: 'bold',
    },
    contentContainer: {
        paddingHorizontal: 5 * scaleWidth, // Adjust padding based on screen width
    },
});

export default Tabs;
