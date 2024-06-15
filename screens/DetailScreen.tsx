import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import axios from "axios";

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
  route: DetailsScreenRouteProp;
};

type PokemonDetails = {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
};

const DetailsScreen: React.FC<Props> = ({ route }) => {
  const { item } = route.params;
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(item.url)
      .then(response => {
        setPokemon(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [item]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {pokemon && (
        <>
          <Text style={styles.text}>{pokemon.name}</Text>
          <Image style={styles.image} source={{ uri: pokemon.sprites.front_default }} />
          <Text style={styles.text}>Height: {pokemon.height}</Text>
          <Text style={styles.text}>Weight: {pokemon.weight}</Text>
        </>
      )}
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00FFFF", // Fundo verde água
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 2,
    margin: 10,
    resizeMode: "contain",
  },
  text: {
    color: "#FFFFFF",
    margin: 10,
  },
});