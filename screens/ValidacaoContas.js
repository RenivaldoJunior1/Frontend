import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ValidacaoContaScreen() {
  const [codigo, setCodigo] = useState(['', '', '', '']);
  const navigation = useNavigation();

  // Função para lidar com a entrada do código
  const handleChangeText = (text, index) => {
    if (text.length <= 1) {
      let newCodigo = [...codigo];
      newCodigo[index] = text;
      setCodigo(newCodigo);
    }
  };

  const handleVoltar = () =>{
    navigation.goBack();
  };

  return (
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
                                      <View style={styles.row}>
                                        <Text style={styles.title}>Validação da</Text>
                                      </View>
                                      <Text style={styles.continueTitle}>Conta</Text>
                                    </View>
        <Text style={styles.description}>
          Por favor insira o código de 4 dígitos enviado no seu email
        </Text>
        
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
        
        <TouchableOpacity>
          <Text style={styles.resendText}>Reenviar o código</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Home")}>
          <Text style={styles.buttonText}>Validar</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  voltarButton:{
    position:'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    marginTop: 30,
  },   
  
  voltarImage:{
    width:30,
    height:30,
    resizeMode: 'contain',
  },

  container: { 
    flex: 1,
    backgroundColor: '#FFF4EC',
    alignItems: 'center'
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
    fontSize: 20, 
    color: '#f45b74', 
    fontWeight: 'Poppins', 
    resizeMode: 'contain',
    marginTop: -40,
  },

  gradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 50,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  title: {
    fontSize: 30,
    fontWeight: 'ABeeZee',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop:-10
  },
  description: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: 'Poppins',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  codeInput: {
    width: 70,
    height: 70,
    backgroundColor: '#FFF',
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  resendText: {
    color: '#FFFFFF',
    fontSize: 16,
    textDecorationLine: 'Poppins',
    marginBottom: 35,
    marginTop:-5
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
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  voltarImagem: {
    marginTop: 25
  },

  continueTitle: {
    fontSize: 30,
    fontWeight: 'ABeeZee',
    color: '#FFFFFF',
    marginTop: -2,
    left: 50,
    marginBottom:70
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

});