import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Alert, 
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validarSenha = (senha) => senha.length >= 6;

  const handleLogin = async () => {
    if (!email || !senha) {
      alert('Preencha todos os campos!');
      return;
    }
    if (!validarEmail(email)) {
      alert('Por favor, insira um e-mail válido!');
      return;
    }
    if (!validarSenha(senha)) {
      alert('A senha deve ter pelo menos 6 caracteres!');
      return;
    }

    try {
      // Simulação de autenticação - substitua por sua lógica real
      const usuarios = JSON.parse(await AsyncStorage.getItem('usuarios')) || [];
      const usuarioValido = usuarios.find(user => user.email === email && user.senha === senha);

      if (usuarioValido) {
        // Salvar dados do usuário no AsyncStorage
        const userData = {
          id: usuarioValido.id,
          name: usuarioValido.nome,
          email: usuarioValido.email,
          phone: usuarioValido.telefone || '',
          photo: usuarioValido.photo || null,
          type: usuarioValido.tipoCadastro || 'user' // 'user', 'ong' ou 'clinic'
        };
        
        await AsyncStorage.setItem('currentUser', JSON.stringify(userData));
        await AsyncStorage.setItem('userType', usuarioValido.tipoCadastro);

        alert('Aguardando código de validação!');
        navigation.navigate('Validacao');
      } else {
        alert('Email ou senha incorretos!');
      }
    } catch (error) {
      alert('Não foi possível fazer login.');
      console.error("Erro ao acessar o AsyncStorage:", error);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <SafeAreaView style={styles.container}>
            <View style={styles.header}>
              <Image source={require('../assets/Logo 1 2.png')} style={styles.logo} />
              <Text style={styles.subtitle}>Entre para continuar</Text>
            </View>
            <LinearGradient colors={['#EB5375', '#E34D76', '#D84477', '#C73578' ]} style={styles.gradient}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Login</Text>
                <Image source={require("../assets/patinha-login.png")} style={styles.pawIcon}/>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>E-mail</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Digite seu e-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Senha</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Digite sua senha"
                  secureTextEntry
                  value={senha}
                  onChangeText={setSenha}
                />
              </View>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('EsqueceuSenha')}>
                <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                <Text style={styles.registerText}>Não possui uma conta? <Text style={styles.bold}>Cadastre-se</Text></Text>
              </TouchableOpacity>
            </LinearGradient>
          </SafeAreaView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#FFF4EC',
    alignItems: 'center'
  },
  header: { 
    marginTop: 90,
    alignItems: 'center',
    marginBottom: 50
  },
  logo: { 
    width: 300,
    height: 150, 
    resizeMode: 'contain'
  },
  subtitle: { 
    fontSize: 15, 
    color: '#f45b74', 
    fontWeight: 'Poppins'
  },
  gradient: { 
    flex: 1, 
    width: '100%', 
    alignItems: 'center', 
    paddingVertical: 50, 
    borderTopLeftRadius: 25, 
    borderTopRightRadius: 25
  },
  titleContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  title: { 
    fontSize: 30, 
    fontWeight: 'ABeeZee', 
    color: '#FFFFFF', 
    marginBottom: 12,
  },
  inputContainer: { 
    width: '90%', 
    marginBottom: 15, 
    alignItems: 'flex-start'
  },
  label: { 
    fontSize: 16, 
    color: '#FFFFFF', 
    marginBottom: 10, 
    fontWeight: 'ABeeZee'
  },
  input: { 
    width: '100%', 
    backgroundColor: '#FFFFFF', 
    padding: 12, 
    borderRadius: 25, 
    fontSize: 16,
    marginBottom: 5,
  },
  button: { 
    backgroundColor: '#B2BC29', 
    paddingVertical: 15, 
    paddingHorizontal: 40, 
    borderRadius: 25, 
    marginTop: 20, 
    alignItems: 'center'
  },
  buttonText: { 
    color: '#ffffff', 
    fontSize: 18, 
    fontWeight: 'Poppins'
  },
  forgotPassword: { 
    marginTop: 15, 
    color: '#FFFFFF', 
    fontSize: 14, 
    textAlign: 'center'
  },
  registerText: { 
    marginTop: 10, 
    color: '#FFFFFF', 
    fontSize: 14, 
    textAlign: 'center'
  },
  pawIcon: {
    marginLeft: 1,
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginBottom: 25,
  },
  bold:{
    fontWeight: 'bold',
  }
});