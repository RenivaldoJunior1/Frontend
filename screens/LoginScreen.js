import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 600;

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    console.log("Iniciando login...");

    if (!email || !senha) {
      alert('Preencha todos os campos!');
      console.log("Campos vazios");
      return;
    }

    if (!validarEmail(email)) {
      alert('Por favor, insira um e-mail válido!');
      return;
    }

    try {
      const usuarios = JSON.parse(await AsyncStorage.getItem('usuarios')) || [];
      console.log("Usuários encontrados:", usuarios);

      
      const usuarioValido = usuarios.find(user => user.email === email && user.senha === senha);

      if (usuarioValido) {
        // Armazene o tipo do usuário no AsyncStorage para ser usado em outras partes do app
        await AsyncStorage.setItem('userType', usuarioValido.tipoCadastro); // Armazenando tipo (usuario/ong)
        
        alert('Login realizado com sucesso!');
        console.log("Login bem-sucedido");

        
        navigation.navigate('Home');
      } else {
        alert('Email ou senha incorretos!');
        console.log("Email ou senha incorretos");
      }
    } catch (error) {
      alert('Não foi possível fazer login.');
      console.error("Erro ao acessar o AsyncStorage:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.content, isLargeScreen && styles.contentLarge]}>
        <Text style={styles.title}>Login</Text>

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

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.linkText}>Ainda não tem conta? Cadastre-se</Text>
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
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
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
