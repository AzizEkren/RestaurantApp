import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity, Linking, Animated } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import yelp from '../../api/yelp';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function ResultShowScreen({route}) {
    const {id} = route.params;
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Animations
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;
    
    const getResult = async (id) => {
        try {
            setLoading(true);
            const response = await yelp.get(`/${id}`);
            setResult(response.data);
            
            // Start animations after data is loaded
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ]).start();
            
        } catch (error) {
            console.log('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getResult(id);
    }, []);

    const openMaps = () => {
        if (result?.coordinates) {
            const { latitude, longitude } = result.coordinates;
            const url = `https://maps.google.com/?q=${latitude},${longitude}`;
            Linking.openURL(url);
        }
    };

    const callRestaurant = () => {
        if (result?.phone) {
            Linking.openURL(`tel:${result.phone}`);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    style={styles.loadingGradient}
                >
                    <View style={styles.loadingContent}>
                        <Text style={styles.loadingText}>Yükleniyor...</Text>
                        <Text style={styles.loadingSubtext}>Restoran bilgileri getiriliyor</Text>
                    </View>
                </LinearGradient>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Hero Image Section */}
                {result?.image_url && (
                    <View style={styles.heroContainer}>
                        <Image source={{uri: result.image_url}} style={styles.heroImage} />
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.7)']}
                            style={styles.heroOverlay}
                        >
                            <View style={styles.heroContent}>
                                <View style={styles.statusBadge}>
                                    {result?.is_closed ? (
                                        <>
                                            <AntDesign name="closecircleo" size={16} color="#fff" />
                                            <Text style={styles.statusText}>Kapalı</Text>
                                        </>
                                    ) : (
                                        <>
                                            <MaterialIcons name="delivery-dining" size={16} color="#fff" />
                                            <Text style={styles.statusText}>Açık</Text>
                                        </>
                                    )}
                                </View>
                            </View>
                        </LinearGradient>
                    </View>
                )}

                {/* Main Content */}
                <Animated.View 
                    style={[
                        styles.contentContainer,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }]
                        }
                    ]}
                >
                    <LinearGradient
                        colors={['#ffffff', '#f8f9fa']}
                        style={styles.infoCard}
                    >
                        <Text style={styles.restaurantName}>{result?.name}</Text>
                        
                        {/* Rating Section */}
                        <View style={styles.ratingSection}>
                            <View style={styles.ratingStars}>
                                {[...Array(5)].map((_, i) => (
                                    <FontAwesome 
                                        key={i} 
                                        name={i < Math.floor(result?.rating || 0) ? "star" : "star-o"} 
                                        size={18} 
                                        color="#f39c12" 
                                    />
                                ))}
                            </View>
                            <Text style={styles.ratingText}>
                                {result?.rating} ({result?.review_count} değerlendirme)
                            </Text>
                        </View>

                        {/* Categories */}
                        {result?.categories && (
                            <View style={styles.categoriesSection}>
                                {result.categories.map((category, index) => (
                                    <View key={index} style={styles.categoryTag}>
                                        <Text style={styles.categoryText}>{category.title}</Text>
                                    </View>
                                ))}
                            </View>
                        )}

                        {/* Contact Info */}
                        {result?.phone && (
                            <View style={styles.contactSection}>
                                <FontAwesome name="phone" size={16} color="#667eea" />
                                <Text style={styles.phoneText}>{result.phone}</Text>
                            </View>
                        )}

                        {/* Address */}
                        {result?.location?.display_address && (
                            <View style={styles.addressSection}>
                                <FontAwesome name="map-marker" size={16} color="#e74c3c" />
                                <Text style={styles.addressText}>
                                    {result.location.display_address.join(', ')}
                                </Text>
                            </View>
                        )}

                        {/* Action Buttons */}
                        <View style={styles.actionsContainer}>
                            <TouchableOpacity style={styles.actionButton} onPress={openMaps}>
                                <LinearGradient
                                    colors={['#667eea', '#764ba2']}
                                    style={styles.actionButtonGradient}
                                >
                                    <FontAwesome name="map" size={20} color="#fff" />
                                    <Text style={styles.actionButtonText}>Haritada Göster</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            {result?.phone && (
                                <TouchableOpacity style={styles.actionButton} onPress={callRestaurant}>
                                    <LinearGradient
                                        colors={['#27ae60', '#2ecc71']}
                                        style={styles.actionButtonGradient}
                                    >
                                        <FontAwesome name="phone" size={20} color="#fff" />
                                        <Text style={styles.actionButtonText}>Ara</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            )}
                        </View>
                    </LinearGradient>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    loadingContainer: {
        flex: 1,
    },
    loadingGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContent: {
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    loadingSubtext: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    heroContainer: {
        height: 300,
        position: 'relative',
    },
    heroImage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f0f0f0',
    },
    heroOverlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'flex-end',
        padding: 20,
    },
    heroContent: {
        alignItems: 'flex-end',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    statusText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 6,
    },
    contentContainer: {
        marginTop: -20,
        flex: 1,
    },
    infoCard: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 25,
        minHeight: '100%',
    },
    restaurantName: {
        fontSize: 32,
        fontWeight: '900',
        color: '#2c3e50',
        marginBottom: 15,
        lineHeight: 38,
    },
    ratingSection: {
        marginBottom: 20,
    },
    ratingStars: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    ratingText: {
        fontSize: 16,
        color: '#7f8c8d',
        fontWeight: '600',
    },
    categoriesSection: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 25,
    },
    categoryTag: {
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        marginRight: 8,
        marginBottom: 8,
    },
    categoryText: {
        color: '#667eea',
        fontSize: 14,
        fontWeight: '600',
    },
    contactSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    phoneText: {
        fontSize: 16,
        color: '#2c3e50',
        fontWeight: '600',
        marginLeft: 12,
    },
    addressSection: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 15,
        marginBottom: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    addressText: {
        fontSize: 15,
        color: '#2c3e50',
        fontWeight: '500',
        marginLeft: 12,
        flex: 1,
        lineHeight: 22,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    actionButton: {
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 25,
        overflow: 'hidden',
    },
    actionButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
})