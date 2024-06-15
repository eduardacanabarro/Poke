
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from "react-native";
import React, { useEffect, useState } from "react";
import { RootStackParamList } from '../App';
import pokemonNames from '../data/pokemonNames.json';
import pokemonUrls from '../data/pokemonUrls.json';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

type Pokemon = {
  name: string;
  url: string;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [data, setData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const pokemonData = pokemonNames.map((name: string, index: number) => ({
      name,
      url: pokemonUrls[index],
    }));
    setData(pokemonData);
    setLoading(false);
  }, []);

  const renderItem = ({ item }: { item: Pokemon }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { item })}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
  },
});

export default HomeScreen;
