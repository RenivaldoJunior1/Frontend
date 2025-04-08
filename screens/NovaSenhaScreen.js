import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Alert,
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';

export default function NovaSenhaScreen() {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const navigation = useNavigation();

  const handleConfirmar = () => {
    if (!novaSenha || !confirmarSenha) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos');
      return;
    }
    
    if (novaSenha !== confirmarSenha) {
      Alert.alert('Atenção', 'As senhas não coincidem');
      return;
    }
    
    // Validar requisitos da senha
    if (novaSenha.length < 8 || novaSenha.length > 12) {
      Alert.alert('Atenção', 'A senha deve ter entre 8 e 12 caracteres');
      return;
    }
    
    if (!/[A-Za-z]/.test(novaSenha) || !/[0-9]/.test(novaSenha) || !/[!@#$%^&*(),.?":{}|<>]/.test(novaSenha)) {
      Alert.alert('Atenção', 'A senha deve conter letras, números e caracteres especiais');
      return;
    }
    
    if (/(\d)\1/.test(novaSenha)) {
      Alert.alert('Atenção', 'A senha não pode conter números sequenciais');
      return;
    }
    
    Alert.alert('Sucesso', 'Senha alterada com sucesso!');
    navigation.navigate('Login');
  };

  const handleVoltar = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <TouchableOpacity style={styles.voltarButton} onPress={handleVoltar}>
            <Image source={require('../assets/Voltar.png')} style={styles.voltarImagem} />
          </TouchableOpacity>
          
          <View style={styles.header}>
            <Image source={require('../assets/Logo 1 2.png')} style={styles.logo} />
            <Text style={styles.subtitle}>Entre para continuar</Text>
          </View>
          
          <LinearGradient colors={['#EB5375', '#E34D76', '#D84477', '#C73578']} style={styles.gradient}>
            
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Recuperação de Senha</Text>
                <Image source={require("../assets/patinha-login.png")} style={styles.pawIcon}/>
              </View>
              
              <View style={styles.section}>
                              
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Insira sua nova senha:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Nova senha"
                    secureTextEntry
                    value={novaSenha}
                    onChangeText={setNovaSenha}
                  />
                </View>
                
                <View style={styles.requirements}>
                  <Text style={styles.requirementText}>Dicas de segurança:</Text>
                  <Text style={styles.requirementItem}>- A senha deve ter de 8 – 12 dígitos</Text>
                  <Text style={styles.requirementItem}>- A senha deve possuir letras, números e caractere especial</Text>
                  <Text style={styles.requirementItem}>- A nova senha não pode ser igual a anterior</Text>
                  <Text style={styles.requirementItem}>- Não adicione números seguidos. Ex. 1234</Text>
                  <Text style={styles.requirementItem}>- Não use números de CPF, RG e Telefone</Text>
                </View>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Repita a senha:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Confirme a nova senha"
                    secureTextEntry
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                  />
                </View>
              </View>
              
              <TouchableOpacity style={styles.button} onPress={handleConfirmar}>
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
         
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
  voltarButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    marginTop: 30
  },
  voltarImagem: {
    marginTop: 25
  },
  header: { 
    marginTop: 80,
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
    fontFamily: 'Poppins',
    marginTop: -40
  },
  gradient: { 
    flex: 1, 
    width: '100%', 
    alignItems: 'center', 
    paddingVertical: 30, 
    borderTopLeftRadius: 25, 
    borderTopRightRadius: 25
  },
  titleContainer: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: { 
    fontSize: 25, 
    color: '#FFFFFF', 
    textAlign: 'center',
    fontFamily: 'ABeeZee',
    marginBottom: 10,
    
  },
  section: {
    width: '90%',
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 15,
    fontFamily: 'ABeeZee'
  },
  inputContainer: {
    marginBottom: 12,
    
  },
  label: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
    fontFamily: 'Poppins'
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 25,
    fontSize: 15
  },
  requirements: {
    
    borderRadius: 15,
    padding: 8,
    marginBottom: 10,
    fontSize: 8
  },
  requirementText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Poppins',
    fontSize: 12
  },
  requirementItem: {
    color: '#FFFFFF',
    marginLeft: 10,
    marginBottom: 5,
    fontFamily: 'Poppins',
    fontSize: 10
  },
  button: { 
    backgroundColor: '#B2BC29', 
    paddingVertical: 15, 
    paddingHorizontal: 40, 
    borderRadius: 25, 
    
  },
  buttonText: { 
    color: '#FFFFFF', 
    fontSize: 18, 
    fontFamily: 'Poppins'
  },
  pawIcon: {
    marginLeft: 1,
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginBottom: 25
  }
});