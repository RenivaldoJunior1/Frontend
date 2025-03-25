import React from 'react';
import { View, Text, Image, StyleSheet, Linking, TouchableOpacity } from 'react-native';

export default function AnimalDetailScreen({ route }) {
  const { animal } = route.params;

  const entrarEmContato = () => {
    const url = `https://wa.me/SEU_NUMERO_AQUI?text=Olá, tenho interesse em adotar o ${animal.nome}!`;
    Linking.openURL(url).catch(err => console.error('Erro ao abrir WhatsApp:', err));
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: animal.midia }} style={styles.animalImage} />
      <Text style={styles.animalName}>{animal.nome}</Text>
      <Text>Raça: {animal.raca}</Text>
      <Text>Idade: {animal.idade} anos</Text>
      <Text>Porte: {animal.porte}</Text>
      <Text>Temperamento: {animal.temperamento}</Text>
      <Text>Necessidades Específicas: {animal.necessidades}</Text>

      <TouchableOpacity style={styles.button} onPress={entrarEmContato}>
        <Text style={styles.buttonText}>Entrar em Contato</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  animalImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  animalName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#25D366',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});