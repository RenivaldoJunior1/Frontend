import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, useWindowDimensions, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 600;

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleCadastro = async () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      alert('Todos os campos são obrigatórios!');
      return;
    }
    
    if (!validarEmail(email)) {
      alert('Por favor, insira um e-mail válido!');
      return;
    }
    
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    
    try {
      const usuariosJSON = await AsyncStorage.getItem('usuarios');
      const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
    
      const usuarioExistente = usuarios.find(user => user.email === email);
      if (usuarioExistente) {
        alert('Este e-mail já está cadastrado!');
        return;
      }
    
      const novoUsuario = { nome, email, senha };
      usuarios.push(novoUsuario);
    
      await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));
    
      alert('Usuário cadastrado com sucesso!');
      navigation.navigate('Login'); 
    } catch (error) {
      console.error(error);
      alert('Não foi possível cadastrar o usuário.');
    }
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.content, isLargeScreen && styles.contentLarge]}>
        <Text style={styles.title}>Cadastro</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Nome"
          autoCapitalize="words"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          secureTextEntry
          value={confirmarSenha} // Corrigido
          onChangeText={setConfirmarSenha}
        />

        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Já tem conta? Faça login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  contentLarge: {
    width: '50%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  linkText: {
    marginTop: 15,
    color: '#007bff',
    fontSize: 16,
  },
});
