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
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    const userEmail = email.trim();
    const userPassword = senha.trim();

    if (!userEmail || !userPassword) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }
  
    setLoading(true);
    try {
      const loginResponse = await fetch('https://pethopeapi.onrender.com/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, password: userPassword }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok || !loginData.data || !loginData.data.token) {
        Alert.alert('Erro', loginData.message || 'Credenciais inválidas.');
        setLoading(false);
        return;
      }

      const { token } = loginData.data;
      await AsyncStorage.setItem('userToken', token);
      console.log("Token recebido e salvo com sucesso.");

      const usersResponse = await fetch('https://pethopeapi.onrender.com/api/users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
      });

      if (!usersResponse.ok) {
        throw new Error('Não foi possível buscar os dados do usuário.');
      }
      
      const allUsersResponse = await usersResponse.json(); 
      
      console.log("Estrutura COMPLETA da resposta de /users:", JSON.stringify(allUsersResponse, null, 2));

      const userList = allUsersResponse.data; 

      if (!Array.isArray(userList)) {
        throw new Error("A resposta da API para a lista de usuários não é um array válido.");
      }
      
      const currentUser = userList.find(user => user.email === userEmail);
      
      if (!currentUser) {
        throw new Error('Usuário autenticado, mas não encontrado na lista de dados.');
      }

      console.log("Dados do usuário encontrados:", currentUser);

      await AsyncStorage.setItem('usuarioAtual', JSON.stringify(currentUser));
      const tipoCadastro = currentUser.tipo || 'default';
      await AsyncStorage.setItem('tipoCadastro', tipoCadastro);

      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      navigation.navigate('Home', { tipoCadastro });

    } catch (error) {
      console.error("Erro no processo de login:", error);
      Alert.alert('Erro', error.message || 'Não foi possível fazer login. Verifique sua conexão.');
    } finally {
      setLoading(false);
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
                  editable={!loading}
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
                  editable={!loading}
                />
              </View>
              <TouchableOpacity 
                style={[styles.button, loading && styles.buttonDisabled]} 
                onPress={handleLogin}
                disabled={loading}
              >
                <Text style={styles.buttonText}>{loading ? 'Carregando...' : 'Login'}</Text>
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
  buttonDisabled: {
    backgroundColor: '#8a9022',
    opacity: 0.7
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