import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function ListaPetsAdocao({ navigation }) {
  const [animaisDisponiveis, setAnimaisDisponiveis] = useState([]);

  useEffect(() => {
    const fetchAnimaisDisponiveis = async () => {
      const animaisJson = await AsyncStorage.getItem('animal');
      const animais = animaisJson ? JSON.parse(animaisJson) : [];
      
      // Filtrando apenas os animais disponíveis para adoção
      const disponiveis = animais.filter(animal => animal.disponivelParaAdocao);
      setAnimaisDisponiveis(disponiveis);
    };

    fetchAnimaisDisponiveis();
  }, []);

  return (
    <View style={styles.container}>
   
      {animaisDisponiveis.length > 0 ? (
        <FlatList
          data={animaisDisponiveis}
          renderItem={({ item }) => (
            <View style={styles.animalItem}>
              <Text style={styles.animalNome}>{item.nome}</Text>
              {item.midia && (
                <Image
                  source={{ uri: item.midia }}
                  style={styles.animalImagem}
                />
              )}
              <Button
                title="Detalhes"
                onPress={() => navigation.navigate('DetalheAnimal', { animal: item })}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text>Nenhum animal disponível para adoção no momento.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
  animalItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  animalNome: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  animalImagem: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
});