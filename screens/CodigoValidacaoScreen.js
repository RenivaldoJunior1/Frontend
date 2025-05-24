import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, SafeAreaView, TouchableWithoutFeedback, Keyboard, ScrollView, Platform, Image 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CodigoValidacaoScreen() {
  const [codigo, setCodigo] = useState(['1', '2', '3', '4', '5', '6']);
  const navigation = useNavigation();

  const handleChangeText = (text, index) => {
    if (text.length <= 1) {
      const newCodigo = [...codigo];
      newCodigo[index] = text;
      setCodigo(newCodigo);
      
      if (text && index < 5) {
      }
    }
  };

  const handleValidar = () => {
    if (codigo.some(digit => !digit)) {
      alert('Por favor, preencha todos os dígitos do código');
      return;
    }
    navigation.navigate('NovaSenha');
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
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
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
              
              <Text style={styles.description}>Insira o código de 6 dígitos enviado para seu e-mail</Text>
              
              <View style={styles.codeContainer}>
                {codigo.map((digit, index) => (
                  <TextInput
                    key={index}
                    style={styles.codeInput}
                    keyboardType="numeric"
                    maxLength={1}
                    value={digit}
                    onChangeText={(text) => handleChangeText(text, index)}
                  />
                ))}
              </View>
              
              <TouchableOpacity style={styles.button} onPress={handleValidar}>
                <Text style={styles.buttonText}>Validar</Text>
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
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'center'
  },
  title: { 
    fontSize: 30, 
    color: '#FFFFFF', 
    textAlign: 'center',
    fontFamily: 'ABeeZee',
    marginBottom: 12
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'Poppins'
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 30
  },
  codeInput: {
    width: 45,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  button: { 
    backgroundColor: '#B2BC29', 
    paddingVertical: 15, 
    paddingHorizontal: 40, 
    borderRadius: 25, 
    marginTop: 30
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