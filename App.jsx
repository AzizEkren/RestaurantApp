import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SearchScreen from './src/screens/SearchScreen';
import ResultShowScreen from './src/screens/ResultShowScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{
            headerStyle: {
              backgroundColor: '#667eea',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: '900',
              fontSize: 26,
              letterSpacing: 2,
              textShadowColor: 'rgba(0, 0, 0, 0.4)',
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 6,
            },
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={SearchScreen} 
            options={{ 
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="ResultShow" 
            component={ResultShowScreen} 
            options={{ 
              headerTitle: '🏪 RESTORAN DETAYI',
              headerBackTitle: 'Geri',
              headerTitleStyle: {
                fontWeight: '800',
                fontSize: 20,
                letterSpacing: 1,
                textShadowColor: 'rgba(0, 0, 0, 0.4)',
                textShadowOffset: { width: 0, height: 2 },
                textShadowRadius: 4,
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
