import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function CadastroAnimal({ navigation }) {
  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');
  const [porte, setPorte] = useState('');
  const [temperamento, setTemperamento] = useState('');
  const [historicoSaude, setHistoricoSaude] = useState('');
  const [vacinas, setVacinas] = useState('');
  const [personalidade, setPersonalidade] = useState('');
  const [necessidades, setNecessidades] = useState('');
  const [midia, setMidia] = useState(null);
  const [cadastroSucesso, setCadastroSucesso] = useState(false);

  const selecionarMidia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 5],
      quality: 1,
    });

    if (!result.canceled) {
      setMidia(result.assets[0].uri);
    }
  };

  
    const handleCadastro = async () => {
      if( !nome || !raca || !idade || !porte || !temperamento || !historicoSaude || !vacinas || !personalidade 
        || !necessidades || !midia ){
          Alert.alert('Preencha todos os campos')
          return
        }
  
        try{
          const animaisJson = await AsyncStorage.getItem('animal');
          const animal = animaisJson ? JSON.parse(animaisJson) : []
  
          const novoanimal = { nome, raca, idade, porte, temperamento, historicoSaude, vacinas, personalidade, 
            necessidades, midia }
          animal.push(novoanimal)
  
          await AsyncStorage.setItem('animal', JSON.stringify(animal))
  
          Alert.alert('Animal cadastrado com sucesso!')
          navigation.navigate('Home')
        } catch(error){
          console.log(error)
          Alert.alert('Não foi possível cadastrar o animal')
        }
    }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollView}>
        <Text style={styles.title}>Cadastro de Animal</Text>
        {cadastroSucesso && <Text style={styles.successMessage}>Cadastro realizado com sucesso!</Text>}
        
        <TouchableOpacity style={styles.midiaButton} onPress={selecionarMidia}>
          <Text style={styles.buttonText}>Selecionar Foto</Text>
        </TouchableOpacity>
        {midia && <Image source={{ uri: midia }} style={styles.midiaPreview} />}
        
        <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
        <TextInput style={styles.input} placeholder="Raça" value={raca} onChangeText={setRaca} />
        <TextInput style={styles.input} placeholder="Idade" value={idade} onChangeText={setIdade} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Porte" value={porte} onChangeText={setPorte} />
        <TextInput style={styles.input} placeholder="Temperamento" value={temperamento} onChangeText={setTemperamento} />
        <TextInput style={styles.input} placeholder="Histórico de Saúde" value={historicoSaude} onChangeText={setHistoricoSaude} multiline />
        <TextInput style={styles.input} placeholder="Vacinação" value={vacinas} onChangeText={setVacinas} multiline />
        <TextInput style={styles.input} placeholder="Personalidade" value={personalidade} onChangeText={setPersonalidade} multiline />
        <TextInput style={styles.input} placeholder="Necessidades Específicas" value={necessidades} onChangeText={setNecessidades} multiline />

        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    padding: 20,
    overflow: 'auto', // Habilita o scroll
    maxHeight: '100vh', // Limita a altura do contêiner para telas grandes
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  midiaButton: {
    backgroundColor: '#6c757d',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  midiaPreview: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successMessage: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
