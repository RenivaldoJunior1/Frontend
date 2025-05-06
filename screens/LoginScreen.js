import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, 
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }
  
    try {
      // Busca todos os usuários
      const usuarios = JSON.parse(await AsyncStorage.getItem('usuarios')) || [];
      const ongs = JSON.parse(await AsyncStorage.getItem('ongs')) || [];
      const clinicas = JSON.parse(await AsyncStorage.getItem('clinicas')) || [];
  
      // Verifica o tipo de usuário
      let usuario = usuarios.find(u => u.email === email && u.senha === senha);
      let tipoUsuario = 'usuario';
  
      if (!usuario) {
        usuario = ongs.find(o => o.email === email && o.senha === senha);
        tipoUsuario = 'ong';
      }
  
      if (!usuario) {
        usuario = clinicas.find(c => c.email === email && c.senha === senha);
        tipoUsuario = 'clinica';
      }
  
      if (usuario) {
        // Salva os dados da sessão
        await AsyncStorage.multiSet([
          ['tipoUsuario', tipoUsuario],
          ['userEmail', email],
          ['userNome', usuario.nome || ''],
          ['userTelefone', usuario.telefone || ''],
          ['userCidade', usuario.cidade || ''],
          ['userEndereco', usuario.endereco || ''],
          ['userCnpjOuCpf', usuario.cnpj || usuario.cpf || '']
        ]);
  
        // Redireciona para a Home com o tipo de usuário
        navigation.navigate('Home', { tipoUsuario });
      } else {
        Alert.alert('Erro', 'Credenciais inválidas!');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha no login');
      console.error(error);
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
              <TouchableOpacity onPress={() => navigation.navigate('Inicial')}>
                <Text style={styles.registerText}>Não possui uma conta? <Text style={styles.bold}>Cadastre-se</Text></Text>
              </TouchableOpacity>
            </LinearGradient>
          </SafeAreaView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

// Seus estilos permanecem os mesmos...

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
    fontSize: 20, 
    color: '#f45b74', 
    fontWeight: 'Poppins', 
    resizeMode: 'contain',
    marginTop: -38,
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
    fontSize: 35, 
    fontWeight: 'ABeeZee', 
    color: '#FFFFFF', 
    marginBottom: 12,
    left: 15
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
    fontWeight: 'ABeeZee',
    marginLeft:15,
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
    left:15
  },

  bold:{
    fontWeight: 'bold',
  }
});
