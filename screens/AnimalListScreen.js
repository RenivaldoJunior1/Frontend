import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useNavigation } from '@react-navigation/native';

export default function AnimalListScreen({ route, navigation }) {
  const [animais, setAnimais] = useState([]);

  useEffect(() => {
    const fetchAnimais = async () => {
      const animaisJson = await AsyncStorage.getItem('animal');
      const animais = animaisJson ? JSON.parse(animaisJson) : [];
      setAnimais(animais);
    };

    fetchAnimais();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Animais Disponíveis</Text>

      {/* Exibindo os animais cadastrados */}
      {animais && animais.length > 0 ? (
        <FlatList
          data={animais}
          renderItem={({ item }) => (
            <View style={styles.animalItem}>
              <Text style={styles.animalName}>{item.nome}</Text>
              {item.midia && (
                <Image
                  source={{ uri: item.midia }}
                  style={styles.animalImage}
                />
              )}
              <Button
                title="Detalhes"
                onPress={() => navigation.navigate('AnimalDetail', { animal: item })}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text>Nenhum animal cadastrado.</Text>
      )}

      <Button
        title="Cadastrar Novo Animal"
        onPress={() => navigation.navigate('CadastroAnimal')}
      />
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  animalItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  animalName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  animalImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
});
