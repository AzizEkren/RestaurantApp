import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import ResultDetail from './ResultDetail'
import { useNavigation } from '@react-navigation/native'
export default function ResultsList({title, results}) {
    const navigation = useNavigation();
    if (!results.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.resultCount}>{results.length} sonuç</Text>
      </View>
      
      <FlatList 
        horizontal={true} 
        showsHorizontalScrollIndicator={false} 
        data={results}
        contentContainerStyle={styles.listContainer}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={()=>navigation.navigate('ResultShow',{id:item.id})}   style={styles.itemContainer}>
              <ResultDetail result={item} />
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  resultCount: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  listContainer: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  itemContainer: {
    marginRight: 15,
  },
})