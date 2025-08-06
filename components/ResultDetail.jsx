import { StyleSheet, Text, View, Image, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { LinearGradient } from 'expo-linear-gradient'

export default function ResultDetail({result}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 100,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const getPriceColor = (price) => {
    switch(price) {
      case '₺': return '#27ae60';
      case '₺₺': return '#f39c12';
      case '₺₺₺': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesome key={i} name="star" size={12} color="#f39c12" />);
    }
    if (hasHalfStar) {
      stars.push(<FontAwesome key="half" name="star-half-empty" size={12} color="#f39c12" />);
    }
    return stars;
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        }
      ]}
      onTouchStart={handlePressIn}
      onTouchEnd={handlePressOut}
    >
      <Image source={{uri: result.image_url}} style={styles.image} />
      
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.imageOverlay}
      >
        <View style={styles.ratingBadge}>
          <FontAwesome name="star" size={12} color="#fff" />
          <Text style={styles.ratingBadgeText}>{result.rating}</Text>
        </View>
      </LinearGradient>
      
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>{result.name}</Text>
        
        <View style={styles.ratingContainer}>
          <View style={styles.starsContainer}>
            {getRatingStars(result.rating)}
          </View>
          <Text style={styles.reviews}>({result.review_count})</Text>
        </View>
        
        <View style={styles.detailsRow}>
          {result.price && (
            <View style={[styles.priceContainer, {backgroundColor: getPriceColor(result.price)}]}>
              <Text style={styles.price}>{result.price}</Text>
            </View>
          )}
          
          <View style={styles.distanceContainer}>
            <FontAwesome name="map-marker" size={12} color="#95a5a6" />
                    <Text style={styles.distance}>
          {Math.round(result.distance / 1000 * 10) / 10} km uzaklıkta
        </Text>
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          {result.categories && result.categories.slice(0, 2).map((category, index) => (
            <Text key={index} style={styles.category}>
              {category.title}
            </Text>
          ))}
        </View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#f8f9fa',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: 180,
    justifyContent: 'space-between',
    padding: 15,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-end',
  },
  ratingBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  infoContainer: {
    padding: 18,
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2c3e50',
    marginBottom: 10,
    lineHeight: 24,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviews: {
    fontSize: 12,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    fontSize: 12,
    color: '#95a5a6',
    fontWeight: '600',
    marginLeft: 4,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  category: {
    fontSize: 11,
    color: '#667eea',
    fontWeight: '600',
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 4,
  },
})