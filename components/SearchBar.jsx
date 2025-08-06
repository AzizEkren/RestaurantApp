import { StyleSheet, Text, View, TextInput, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';


export default function SearchBar({term = '', onTermChange = () => {}, onTermSubmit = () => {}}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    );
    pulse.start();
  }, []);

  const handleFocus = () => {
    Animated.spring(scaleAnim, {
      toValue: 1.02,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.searchContainer,
          {
            transform: [{ scale: scaleAnim }],
          }
        ]}
      >
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.85)']}
          style={styles.backgroundStyle}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <FontAwesome style={styles.iconStyle} name="search" size={22} color="#667eea" />
          <TextInput 
            style={styles.inputStyle} 
            placeholder='Hangi lezzeti arıyorsunuz?'
            placeholderTextColor='rgba(102, 126, 234, 0.6)'
            autoCorrect={false}
            autoCapitalize='none'
            value={term}
            onChangeText={(newTerm)=>onTermChange(newTerm)}
            onEndEditing={()=>onTermSubmit()}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <View style={styles.searchButton}>
            <FontAwesome name="chevron-right" size={16} color="#667eea" />
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    searchContainer: {
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 15,
      elevation: 10,
    },
    backgroundStyle: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        borderRadius: 25,
        paddingHorizontal: 4,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    iconStyle: {
        marginLeft: 20,
        marginRight: 15,
    },
    inputStyle: {
        flex: 1,
        fontSize: 17,
        fontWeight: '600',
        color: '#2c3e50',
        paddingVertical: 0,
    },
    searchButton: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    }
})