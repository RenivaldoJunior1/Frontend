import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Image, Alert, 
  ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function CadastroUsuarioScreen() {
  const navigation = useNavigation();
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cidade, setCidade] = useState('');
  const [endereco, setEndereco] = useState('');
  const [email, setEmail] = useState('');

  const handleCadastro = () => {
    if (!cpf || !nome || !telefone || !cidade || !endereco || !email) {
      Alert.alert('Atenção', 'Todos os campos são obrigatórios!');
      return;
    }
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
  };

  return (
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
          <KeyboardAwareScrollView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            style={{ flex: 1 }}
          >
            <ScrollView 
              contentContainerStyle={styles.scrollContent} 
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.title}>Cadastro Usuário {" "} 
                <Image source={require("../assets/patinha-login.png")} style={styles.pawIcon}/>
              </Text>

              {[
                { label: 'CPF', value: cpf, setValue: setCpf, keyboardType: 'numeric' },
                { label: 'Nome', value: nome, setValue: setNome, keyboardType: 'default' },
                { label: 'Telefone', value: telefone, setValue: setTelefone, keyboardType: 'numeric' },
                { label: 'Cidade', value: cidade, setValue: setCidade, keyboardType: 'default' },
                { label: 'Endereço', value: endereco, setValue: setEndereco, keyboardType: 'default' },
                { label: 'E-mail', value: email, setValue: setEmail, keyboardType: 'email-address' }
              ].map((input, index) => (
                <View key={index} style={styles.inputContainer}>
                  <Text style={styles.label}>{input.label}</Text>
                  <TextInput 
                    style={styles.input} 
                    placeholder={input.label} 
                    value={input.value} 
                    onChangeText={input.setValue} 
                    keyboardType={input.keyboardType} 
                  />
                </View>
              ))}

              <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                <Text style={styles.buttonText}>Cadastrar</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAwareScrollView>
        </LinearGradient>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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

  backText: { 
    fontSize: 24, 
    color: '#000' 
  },

  header: { 
    marginTop: 100, 
    alignItems: 'center', 
    marginBottom: 20 
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

  card: { 
    flex: 1,
    width: '100%', 
    padding: 20, 
    borderTopLeftRadius: 25, 
    borderTopRightRadius: 25, 
  },

  scrollContent: { 
    paddingBottom: 30 
  },

  title: { 
    fontSize: 22, 
    fontWeight: 'ABeeZee', 
    color: '#FFFFFF', 
    marginBottom: 15, 
    textAlign: 'center' 
  },

  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },

  label: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 5,
    marginLeft: 5, 
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
    borderRadius: 25, 
    alignItems: 'center', 
    width: '100%',
    borderWidth: 2, 
    borderColor: '#8A9A23',
    position: 'relative',
    marginTop: 12
  },

  buttonText: { 
    color: '#ffffff', 
    fontSize: 18, 
    fontWeight: 'Poppins' 
  },

  voltarImagem: {
    marginTop: 25
  }
});
