import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';

export default function CadastroAnimalScreen() {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [genero, setGenero] = useState('');
  const [raca, setRaca] = useState('');
  const [descricao, setDescricao] = useState('');
  const [endereco, setEndereco] = useState('');
  const [imagem, setImagem] = useState(null);
  const [mostrarGenero, setMostrarGenero] = useState(false);
  const [mostrarIdade, setMostrarIdade] = useState(false);
  const [mostrarRaca, setMostrarRaca] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const verificarPermissao = async () => {
      const permissao = await AsyncStorage.getItem('podeCadastrarPet');
      if (permissao !== 'true') {
        Alert.alert('Acesso Negado', 'Apenas ONGs podem cadastrar animais.');
        navigation.goBack();
      }
    };
    verificarPermissao();
  }, []);

  const escolherImagem = async () => {
    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
    }
  };

  const postarAnimal = () => {
    if (!nome || !idade || !genero || !raca || !descricao || !endereco) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos antes de postar.');
      return;
    }
    if (!imagem) {
      Alert.alert('Erro', 'É necessário anexar uma foto do animal.');
      return;
    }
    Alert.alert('Sucesso', 'Animal cadastrado com sucesso!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.imageContainer} onPress={escolherImagem}>
          {imagem ? (
            <Image source={{ uri: imagem }} style={styles.image} />
          ) : (
            <View style={styles.placeholderContainer}>
              <MaterialIcons name="image" size={100} color="#aaa" />
              <Text style={styles.imageText}>SEM IMAGEM{"\n"}CLIQUE AQUI PARA ENVIAR</Text>
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.formContainer}>
          <Text style={styles.label1}>Nome ✏️</Text>
          <TextInput style={styles.input} value={nome} onChangeText={setNome} />
          <View style={styles.pickerRow}>
            <View style={styles.pickerContainer}>
              <TouchableOpacity onPress={() => setMostrarGenero(!mostrarGenero)}>
                <Text style={styles.label}>Gênero</Text>
                {genero ? <Text style={styles.selectedText}>{genero}</Text> : null}
              </TouchableOpacity>
              {mostrarGenero && (
                <Picker selectedValue={genero} onValueChange={(item) => { setGenero(item); setMostrarGenero(false); }} style={styles.picker}>
                  <Picker.Item label="Macho" value="Macho" />
                  <Picker.Item label="Fêmea" value="Fêmea" />
                </Picker>
              )}
            </View>
            <View style={styles.pickerContainer}>
              <TouchableOpacity onPress={() => setMostrarIdade(!mostrarIdade)}>
                <Text style={styles.label}>Idade</Text>
                {idade ? <Text style={styles.selectedText}>{idade}</Text> : null}
              </TouchableOpacity>
              {mostrarIdade && (
                <Picker selectedValue={idade} onValueChange={(item) => { setIdade(item); setMostrarIdade(false); }} style={styles.picker}>
                  <Picker.Item label="0-2 anos" value="0-2" />
                  <Picker.Item label="2-4 anos" value="2-4" />
                  <Picker.Item label="4-6 anos" value="4-6" />
                </Picker>
              )}
            </View>
            <View style={styles.pickerContainer}>
              <TouchableOpacity onPress={() => setMostrarRaca(!mostrarRaca)}>
                <Text style={styles.label}>Raça</Text>
                {raca ? <Text style={styles.selectedText}>{raca}</Text> : null}
              </TouchableOpacity>
              {mostrarRaca && (
                <Picker selectedValue={raca} onValueChange={(item) => { setRaca(item); setMostrarRaca(false); }} style={styles.picker}>
                  <Picker.Item label="Vira-lata" value="Vira-lata" />
                  <Picker.Item label="Outra" value="Outra" />
                </Picker>
              )}
            </View>
          </View>
          <Text style={styles.label}>Abrigado 📍</Text>
          <TextInput style={styles.input} placeholder="Endereço..." value={endereco} onChangeText={setEndereco} />
          <Text style={styles.label}>Informações</Text>
          <TextInput style={styles.textArea} placeholder="Descrição..." value={descricao} onChangeText={setDescricao} multiline />
          <TouchableOpacity style={styles.button} onPress={postarAnimal}>
            <Text style={styles.buttonText}>Postar!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F5F5FF' 
  },

  content: { 
    flexGrow: 1, 
    alignItems: 'center', 
    padding: 0 
  },

  pickerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%' 
  },

  pickerContainer: { 
    backgroundColor: '#FFF5F0', 
    padding: 10, 
    borderRadius: 8, 
    width: '30%', 
    alignItems: 'center', 
    marginTop: 15 
  },

  picker: { 
    width: '80%',
    fontSize: 100,
  },

  selectedText: { 
    fontSize: 15, 
    color: '#4A3F92', 
    textAlign: 'center', 
    marginTop: 5,
    fontStyle: 'Poppins' 
  },

  imageContainer: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#D3D3D3', 
    height: 150, 
    width: '100%', 
    flex: 1 
  },

  placeholderContainer: { 
    alignItems: 'center', 
    width: '90%', 
    height: '90%', 
    justifyContent: 'center' 
  },

  image: { 
    width: '100%', 
    height: '100%'
  },

  formContainer: { 
    backgroundColor: '#E7E3F9', 
    padding: 20, 
    width: '100%' 
  },

  label: { 
    fontSize: 15, 
    fontWeight: 'Poppins', 
    marginBottom: 10, 
    color: '#3C55D2', 
    marginTop: 10 
  },

  input: { 
    backgroundColor: '#FFF', 
    padding: 10, 
    borderRadius: 8, 
    marginBottom: 10, 
    width: '100%' 
  },

  textArea: { 
    backgroundColor: '#FFF', 
    padding: 10, 
    borderRadius: 8, 
    height: 80, 
    textAlignVertical: 'top', 
    width: '100%' 
  },

  button: { 
    backgroundColor: '#FF5C8A', 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginTop: 15, 
    width: '60%', 
    alignSelf: 'center' 
  },

  buttonText: { 
    color: '#FFF', 
    fontSize: 16, 
    fontWeight: 'Poppins' 
  },
  label1:{ 
    fontWeight: 'Chewy', 
    color: '#3C55D2', 
    marginBottom: 15, 
    fontSize: 20 
  }
});