import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, 
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function EsqueceuSenhaScreen() {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleContinuar = () => {
    if (!email) {
      alert('Por favor, insira seu e-mail');
      return;
    }
    navigation.navigate('CodigoValidacao');
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
            </View>
            <Text style={styles.correction}>
            Digite o seu e-mail para o envio do código de verificação 
            </Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.description}>E-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="Seu e-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            
            <TouchableOpacity style={styles.button} onPress={handleContinuar}>
              <Text style={styles.buttonText}>Continuar</Text>
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
    marginTop: 100,
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
    paddingVertical: 50, 
    borderTopLeftRadius: 25, 
    borderTopRightRadius: 25
  },
  titleContainer: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:-20
  },
  title: { 
    fontSize: 39, 
    color: '#FFFFFF', 
    textAlign: 'center',
    fontWeight: 'ABeeZee',
    marginBottom: 30

  },

  correction: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 50,
    fontFamily: 'Poppins', 
    alignSelf: 'center', 
    fontWeight: 'ABeeZee',
    paddingHorizontal: 12,
    lineHeight: 36 
  },
  

  description: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
    fontFamily: 'Poppins',
    left: 15
  },
  inputContainer: { 
    width: '90%', 
    marginBottom: 30
  },
  input: { 
    width: '100%', 
    backgroundColor: '#FFFFFF', 
    padding: 15, 
    borderRadius: 25, 
    fontSize: 16
  },
  button: { 
    backgroundColor: '#B2BC29',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginTop: 40
  },
  buttonText: { 
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pawIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginBottom: 45
  }
});