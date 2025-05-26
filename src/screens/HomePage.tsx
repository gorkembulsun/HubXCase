import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import appTheme from '../theme/appTheme';
import CustomTabBar from '../components/CustomTabBar';

const { sw, sh, sf, COLORS, FONTS, TYPOGRAPHY, SIZING } = appTheme;

interface Category {
  id: number;
  name: string;
  title: string;
  rank: number;
  image: {
    url: string;
  };
}

interface Question {
  id: number;
  title: string;
  subtitle: string;
  image_uri: string;
  uri: string;
  order: number;
}

const HomePage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  
  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://dummy-api-jtg6bessta-ey.a.run.app/getCategories');
      setCategories(response.data.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  
  const fetchQuestions = async () => {
    try {
      const response = await axios.get('https://dummy-api-jtg6bessta-ey.a.run.app/getQuestions');
      setQuestions(response.data || []);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchCategories(), fetchQuestions()]);
      setLoading(false);
    };
    loadData();
  }, []);

  // Handle question item press to open URL
  const handleQuestionPress = async (uri: string) => {
    try {
      const supported = await Linking.canOpenURL(uri);
      if (supported) {
        await Linking.openURL(uri);
      } else {
        Alert.alert('Error', 'Cannot open this URL');
      }
    } catch (error) {
      console.error('Error opening URL:', error);
      Alert.alert('Error', 'Failed to open URL');
    }
  };

  return (
    <View style={styles.container}>
      {/* Background */}
      <View style={styles.backgroundLayer} />
      
      {/* Header with Background Image */}
      <ImageBackground 
        source={require('../assets/images/Homebackground.png')} 
        style={styles.headerWithBackground}
        resizeMode="contain"
        imageStyle={styles.headerBackgroundImageStyle}
      >
        <View style={styles.headerOverlay}>
          <SafeAreaView>
            {/* Status Bar Space */}
            <View style={styles.statusBarSpace} />
            
            {/* Greeting */}
            <View style={styles.greetingContainer}>
              <Text style={styles.greetingText}>Hi, plant lover!</Text>
              <Text style={styles.greetingSubtext}>Good Afternoon! ⛅</Text>
            </View>
            
            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <View style={styles.searchIconContainer}>
                <FontAwesome name="search" size={sf(24)} color="#ABABAB" />
              </View>
              <TextInput
                style={styles.searchInput}
                placeholder="Search for plants"
                placeholderTextColor="#AFAFAF"
              />
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>

      {/* Content */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Premium Box */}
        <TouchableOpacity style={styles.premiumBox} activeOpacity={0.8}>
          <View style={styles.premiumContent}>
            <View style={styles.premiumTextContainer}>
              <Text style={styles.premiumTitle}>FREE Premium Available</Text>
              <Text style={styles.premiumSubtitle}>Tap to upgrade your account!</Text>
            </View>
            <View style={styles.premiumIconContainer}>
              <View style={styles.premiumIcon}>
                <Text style={styles.premiumIconText}>🌿</Text>
              </View>
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumBadgeText}>1</Text>
              </View>
            </View>
          </View>
          <Text style={styles.arrowIcon}>›</Text>
        </TouchableOpacity>

        {/* Get Started Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Get Started</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.articlesScrollView}
          >
            {questions.map((question) => (
              <TouchableOpacity 
                key={question.id} 
                style={styles.articleCard}
                onPress={() => handleQuestionPress(question.uri)}
              >
                <View style={styles.articleImageContainer}>
                  <Image 
                    source={{ uri: question.image_uri }} 
                    style={styles.articleImage}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.articleTextContainer}>
                  <Text style={styles.articleText}>{question.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Categories Section */}
        <View style={styles.categoriesContainer}>
          {categories.map((category, index) => {
            const isLastItem = index === categories.length - 1;
            
            return (
              <TouchableOpacity 
                key={category.id} 
                style={[
                  styles.categoryCard,
                  isLastItem && categories.length % 2 !== 0 ? styles.categoryCardFullWidth : {},
                ]}
              >
                <View style={styles.categoryImageContainer}>
                  <Image 
                    source={{ uri: category.image.url }} 
                    style={styles.categoryImage}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.categoryText}>{category.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Bottom spacing for tab bar */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Custom Tab Bar */}
      <CustomTabBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFAFA',
  },
  backgroundLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FBFAFA',
    opacity: 0.96,
    zIndex: -1, // Ensure it stays behind
    
  },
  headerWithBackground: {
    width: '100%',
    // Remove any fixed height to let content determine the height
  },
  headerBackgroundImageStyle: {
    
    width: '100%',
    height: sh(300),
    position: 'absolute',
    
    right: 0,
    opacity: 0.8,
  },
  headerOverlay: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(60, 60, 67, 0.1)',
  },
  headerContainer: {
    backgroundColor: 'rgba(246, 246, 246, 0.84)',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(60, 60, 67, 0.1)',
  },
  statusBarSpace: {
    height: Platform.OS === 'ios' ? 0 : sh(24),
  },
  greetingContainer: {
    paddingHorizontal: sw(24),
    marginTop: sh(16),
    marginBottom: sh(12),
  },
  greetingText: {
    fontSize: sf(16),
    fontFamily: FONTS.rubikRegular,
    color: '#13231B',
    letterSpacing: 0.07,
    marginBottom: sh(6),
  },
  greetingSubtext: {
    fontSize: sf(24),
    fontFamily: FONTS.rubikBold,
    fontWeight: '500',
    color: '#13231B',
    letterSpacing: 0.035
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    marginHorizontal: sw(24),
    marginBottom: sh(16),
    borderRadius: 12,
    borderWidth: 0.2,
    borderColor: 'rgba(60, 60, 67, 0.25)',
    height: sh(44),
  },
  searchIconContainer: {
    paddingLeft: sw(16),
    paddingRight: sw(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: sf(20),
  },
  searchInput: {
    flex: 1,
    fontSize: sf(15.5),
    fontFamily: FONTS.rubikRegular,
    color: '#13231B',
    paddingRight: sw(16),
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingTop: sh(24),
  },
  premiumBox: {
    marginHorizontal: sw(24),
    backgroundColor: '#24201A',
    borderRadius: 12,
    padding: sw(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: sh(24),
  },
  premiumContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  premiumTextContainer: {
    flex: 1,
  },
  premiumTitle: {
    fontSize: sf(16),
    fontFamily: FONTS.sfProText,
    fontWeight: '600',
    letterSpacing: -0.32,
    marginBottom: sh(6),
    // Gradient text effect would need a library like react-native-linear-gradient-text
    color: '#E5C990',
  },
  premiumSubtitle: {
    fontSize: sf(13),
    fontFamily: FONTS.sfProText,
    color: '#FFDE9C',
  },
  premiumIconContainer: {
    marginRight: sw(12),
    position: 'relative',
  },
  premiumIcon: {
    width: sw(36),
    height: sh(30),
    backgroundColor: 'rgba(232, 176, 70, 0.2)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumIconText: {
    fontSize: sf(20),
  },
  premiumBadge: {
    position: 'absolute',
    top: -sh(4),
    right: -sw(4),
    backgroundColor: 'rgba(232, 44, 19, 0.9)',
    borderRadius: sw(8),
    width: sw(16),
    height: sw(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumBadgeText: {
    color: 'white',
    fontSize: sf(10),
    fontWeight: 'bold',
  },
  arrowIcon: {
    color: 'white',
    fontSize: sf(24),
  },
  sectionContainer: {
    marginBottom: sh(24),
  },
  sectionTitle: {
    fontSize: sf(15),
    fontFamily: FONTS.rubikBold,
    fontWeight: '500',
    color: '#13231B',
    marginBottom: sh(16),
    marginHorizontal: sw(24),
  },
  articlesScrollView: {
    paddingLeft: sw(24),
  },
  articleCard: {
    width: sw(240),
    height: sh(164),
    marginRight: sw(10),
  },
  articleImageContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  articleImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  articleTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: sw(14),
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  articleText: {
    fontSize: sf(15),
    fontFamily: FONTS.rubikBold,
    fontWeight: '500',
    color: 'white',
    lineHeight: 20,
    letterSpacing: -0.24,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: sw(24),
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (Dimensions.get('window').width - sw(48) - sw(11)) / 2,
    height: sh(152),
    backgroundColor: '#F4F6F6',
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(41, 187, 137, 0.18)',
    padding: sw(16),
    marginBottom: sh(16),
    overflow: 'hidden',
    
  },
  categoryCardFullWidth: {
    width: Dimensions.get('window').width - sw(48),
    
    
  },
  categoryImageContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: sw(143),
    height: sh(151),
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryText: {
    fontSize: sf(16),
    fontFamily: FONTS.rubikBold,
    fontWeight: '500',
    color: '#13231B',
    lineHeight: 21,
    letterSpacing: -0.32,
  },
  bottomSpacing: {
    height: sh(120),
  },
});

export default HomePage; 