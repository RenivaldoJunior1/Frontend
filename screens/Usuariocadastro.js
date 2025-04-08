import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Image, Alert, 
  ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CadastroUsuarioScreen() {
  const navigation = useNavigation();
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cidade, setCidade] = useState('');
  const [endereco, setEndereco] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleCadastro = async () => {
    if (!cpf || !nome || !telefone || !cidade || !endereco || !email || !senha || !confirmarSenha) {
      Alert.alert('Atenção', 'Todos os campos são obrigatórios!');
      return;
    }
  
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }
  
    // Verificação de senha com no mínimo 6 caracteres
    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres!');
      return;
    }
  
    try {
      const novoUsuario = { cpf, nome, telefone, cidade, endereco, email, senha, tipoCadastro: 'usuario'};
      
      let usuarios = JSON.parse(await AsyncStorage.getItem('usuarios')) || [];
      usuarios.push(novoUsuario);

      await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));

      console.log('Cadastro Salvo', novoUsuario);

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login');

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível realizar o cadastro.');
      console.error("Erro ao salvar no AsyncStorage:", error);
    }
  };
  
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={require('../assets/Voltar.png')} style={styles.voltarImagem} />
          </TouchableOpacity>
  
          <View style={styles.header}>
            <Image source={require('../assets/Logo 1 2.png')} style={styles.logo} />
            <Text style={styles.subtitle}>Cadastre-se</Text>
          </View>
  
          <LinearGradient colors={['#EB5375', '#E34D76', '#D84477', '#C73578']} style={styles.card}>
            <ScrollView 
              contentContainerStyle={styles.scrollContent} 
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Cadastro de Usuário</Text>
                <Image source={require("../assets/patinha-login.png")} style={styles.pawIcon}/>
              </View>
              
              {[{ label: 'CPF', value: cpf, setValue: setCpf, keyboardType: 'numeric', maxLength: 11 },
                { label: 'Nome', value: nome, setValue: setNome },
                { label: 'Telefone', value: telefone, setValue: setTelefone, keyboardType: 'numeric', maxLength: 11 },
                { label: 'Cidade', value: cidade, setValue: setCidade },
                { label: 'Endereço', value: endereco, setValue: setEndereco },
                { label: 'E-mail', value: email, setValue: setEmail, keyboardType: 'email-address' },
                { label: 'Senha', value: senha, setValue: setSenha, secureTextEntry: true, minLength: 6 },
                { label: 'Confirmar Senha', value: confirmarSenha, setValue: setConfirmarSenha, secureTextEntry: true }].map((input, index) => (
                  <View key={index} style={styles.inputContainer}>
                    <Text style={styles.label}>{input.label}</Text>
                    <TextInput 
                      style={styles.input} 
                      placeholder={input.label} 
                      value={input.value} 
                      onChangeText={input.setValue} 
                      keyboardType={input.keyboardType || 'default'}
                      secureTextEntry={input.secureTextEntry || false}
                      maxLength={input.maxLength}  // Limita o número de caracteres
                      onBlur={() => {
                        // Garantir que a senha tem no mínimo 6 caracteres
                        if (input.label === 'Senha' && senha.length < 6) {
                          Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres!');
                        }
                      }}
                    />
                  </View>
              ))}
  
              <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                <Text style={styles.buttonText}>Cadastrar</Text>
              </TouchableOpacity>
            </ScrollView>
          </LinearGradient>
        </SafeAreaView>
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

  backButton: { 
    position: 'absolute', 
    top: 20, 
    left: 20, 
    zIndex: 10, 
    marginTop: 30 
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
    marginTop: -40
  },

  card: { 
    flex: 1, 
    width: '100%', 
    padding: 20, 
    borderTopLeftRadius: 25, 
    borderTopRightRadius: 25 
  },

  scrollContent: { 
    paddingBottom: 30 
  },

  title: { 
    fontSize: 30, 
    fontWeight: 'ABeeZee', 
    color: '#FFFFFF', 
    marginBottom: 25,
    marginTop: 30
  },

  pawIcon: {
    marginLeft: 1,
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginBottom: 10,
  },

  inputContainer: { 
    width: '100%', 
    marginBottom: 10 
  },

  label: { 
    fontSize: 14, 
    color: '#FFFFFF', 
    marginBottom: 5, 
    marginLeft: 20 
  },

  input: { 
    width: '100%', 
    backgroundColor: '#FFFFFF', 
    padding: 12, 
    borderRadius: 25, 
    fontSize: 16, 
    color: '#000' 
  },

  button: { 
    backgroundColor: '#B2BC29', 
    paddingVertical: 15, 
    paddingHorizontal: 40, 
    borderRadius: 25, 
    marginTop: 20, 
    alignItems: 'center',
    width: '60%',
    alignSelf: 'center',
    elevation: 5
  },

  buttonText: { 
    color: '#ffffff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },

  voltarImagem: { 
    marginTop: 25 
  },

  titleContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
});
