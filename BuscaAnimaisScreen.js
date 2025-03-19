import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Picker, Button, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function BuscaAnimaisScreen() {
  const [animais, setAnimais] = useState([]);
  const [filtros, setFiltros] = useState({
    cidade: '',
    especie: '',
    raca: '',
    idadeMin: '',
    idadeMax: '',
    porte: '',
  });
  const [animaisFiltrados, setAnimaisFiltrados] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAnimais = async () => {
      const animaisJson = await AsyncStorage.getItem('animal');
      const animais = animaisJson ? JSON.parse(animaisJson) : [];
      setAnimais(animais);
      setAnimaisFiltrados(animais);
    };
    fetchAnimais();
  }, []);

  const aplicarFiltros = () => {
    const filtrados = animais.filter(animal => {
      return (
        (!filtros.cidade || animal.cidade === filtros.cidade) &&
        (!filtros.especie || animal.especie === filtros.especie) &&
        (!filtros.raca || animal.raca === filtros.raca) &&
        (!filtros.idadeMin || animal.idade >= parseInt(filtros.idadeMin)) &&
        (!filtros.idadeMax || animal.idade <= parseInt(filtros.idadeMax)) &&
        (!filtros.porte || animal.porte === filtros.porte)
      );
    });
    setAnimaisFiltrados(filtrados);
  };

  const verDetalhes = (animal) => {
    navigation.navigate('AnimalDetail', { animal });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Animais</Text>

      {/* Filtros */}
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={filtros.cidade}
        onChangeText={(text) => setFiltros({ ...filtros, cidade: text })}
      />
      <Picker
        selectedValue={filtros.especie}
        onValueChange={(itemValue) => setFiltros({ ...filtros, especie: itemValue })}
      >
        <Picker.Item label="Selecione a espécie" value="" />
        <Picker.Item label="Cachorro" value="Cachorro" />
        <Picker.Item label="Gato" value="Gato" />
        <Picker.Item label="Outros" value="Outros" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Raça"
        value={filtros.raca}
        onChangeText={(text) => setFiltros({ ...filtros, raca: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Idade mínima"
        keyboardType="numeric"
        value={filtros.idadeMin}
        onChangeText={(text) => setFiltros({ ...filtros, idadeMin: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Idade máxima"
        keyboardType="numeric"
        value={filtros.idadeMax}
        onChangeText={(text) => setFiltros({ ...filtros, idadeMax: text })}
      />
      <Picker
        selectedValue={filtros.porte}
        onValueChange={(itemValue) => setFiltros({ ...filtros, porte: itemValue })}
      >
        <Picker.Item label="Selecione o porte" value="" />
        <Picker.Item label="Pequeno" value="Pequeno" />
        <Picker.Item label="Médio" value="Médio" />
        <Picker.Item label="Grande" value="Grande" />
      </Picker>

      <Button title="Aplicar Filtros" onPress={aplicarFiltros} />

      {/* Lista de Animais Filtrados */}
      <FlatList
        data={animaisFiltrados}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.animalItem} onPress={() => verDetalhes(item)}>
            <Image source={{ uri: item.midia }} style={styles.animalImage} />
            <Text style={styles.animalName}>{item.nome}</Text>
            <Text>{item.idade} anos - {item.porte}</Text>
            <Text>{item.cidade}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  animalItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  animalImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  animalName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});