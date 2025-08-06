import { StyleSheet, Text, View, FlatList, ScrollView, SafeAreaView, Animated, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import SearchBar from '../../components/SearchBar'
import useResult from '../../hooks/useResult'
import ResultsList from '../../components/ResultsList'


export default function SearchScreen() {
    const [term, setTerm] = useState('');
    const [searchApi, results, errorMessage] = useResult();
    
    // Animations
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    
    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const filterResultsByPrice = (price) => {
        const filtered = results.filter(result => {
            return result.price === price;
        });
        console.log(`Fiyat kategorisi ${price}: ${filtered.length} sonuç (Toplam: ${results.length})`);
        return filtered;
    };

    return (
        <LinearGradient
            colors={['#667eea', '#764ba2', '#f093fb']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <SafeAreaView style={styles.safeArea}>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <Animated.View 
                        style={[
                            styles.header,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }]
                            }
                        ]}
                    >
                        <Text style={styles.welcomeText}>🍽️ Acıktım</Text>
                        <Text style={styles.subtitleText}>Muhteşem lezzetleri keşfedin</Text>
                    </Animated.View>
                    
                    <SearchBar term={term} onTermChange={setTerm} onTermSubmit={()=>searchApi(term)} />
                    
                    {errorMessage ? (
                        <Animated.View style={[styles.errorContainer, { opacity: fadeAnim }]}>
                            <Text style={styles.errorText}>⚠️ Hata: {errorMessage}</Text>
                        </Animated.View>
                    ) : null}
                    
                    <Animated.View 
                        style={[
                            styles.listsContainer,
                            { opacity: fadeAnim }
                        ]}
                    >
                        <ResultsList title='💰 Ekonomik Seçenekler' results={filterResultsByPrice('₺')} />
                        <ResultsList title='💳 Kaliteli & Uygun' results={filterResultsByPrice('₺₺')} />
                        <ResultsList title='💎 Premium Deneyim' results={filterResultsByPrice('₺₺₺')} />
                    </Animated.View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 42,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitleText: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 25,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  listsContainer: {
    paddingBottom: 30,
  },
  errorContainer: {
    backgroundColor: 'rgba(231, 76, 60, 0.9)',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
    padding: 15,
    shadowColor: '#e74c3c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  errorText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
  },
})