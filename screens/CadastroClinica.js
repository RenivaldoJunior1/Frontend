import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Alert, 
  Keyboard, TouchableWithoutFeedback 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



export default function CadastroClinicaScreen() {
  const navigation = useNavigation();
  const [cpf, setCpf] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [nome, setNome] = useState('');
  const [nomeProprietario, setNomeProprietario] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cidade, setCidade] = useState('');
  const [endereco, setEndereco] = useState('');
  const [email, setEmail] = useState('');
  const [ofereceServico, setOfereceServico] = useState('');
  const [site, setSite] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');

  const handleCadastro = () => {
    if (!cpf || !cnpj || !nome || !nomeProprietario || !razaoSocial || !telefone || !cidade || !endereco || !email || !ofereceServico || !site || !instagram || !facebook) {
      Alert.alert('Atenção', 'Todos os campos são obrigatórios!');
      return;
    }
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../assets/Voltar.png')} style={styles.voltarImagem}/>
        </TouchableOpacity>
        
        <View style={styles.header}>
          <Image source={require('../assets/Logo 1 2.png')} style={styles.logo} />
          <Text style={styles.subtitle}>Cadastre-se</Text>
        </View>
        
        <LinearGradient colors={['#EB5375', '#E34D76', '#D84477', '#C73578']} style={styles.card}>
          <KeyboardAwareScrollView 
            contentContainerStyle={styles.scrollContent} 
            extraScrollHeight={100} 
            enableOnAndroid={true} 
            showsVerticalScrollIndicator={false} 
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Cadastro de Clinica</Text>
              <Image source={require("../assets/patinha-login.png")} style={styles.pawIcon}/>
            </View>

            {[
              { label: 'CPF', value: cpf, setValue: setCpf, keyboardType: 'numeric' },
              { label: 'CNPJ', value: cnpj, setValue: setCnpj, keyboardType: 'numeric' },
              { label: 'Nome', value: nome, setValue: setNome, keyboardType: 'default' },
              { label: 'Nome do Proprietário', value: nomeProprietario, setValue: setNomeProprietario, keyboardType: 'default' },
              { label: 'Razão Social', value: razaoSocial, setValue: setRazaoSocial, keyboardType: 'default' },
              { label: 'Telefone', value: telefone, setValue: setTelefone, keyboardType: 'numeric' },
              { label: 'Cidade', value: cidade, setValue: setCidade, keyboardType: 'default' },
              { label: 'Endereço', value: endereco, setValue: setEndereco, keyboardType: 'default' },
              { label: 'E-mail', value: email, setValue: setEmail, keyboardType: 'email-address' },
              { label: 'Oferece Serviço (Sim/Não)', value: ofereceServico, setValue: setOfereceServico, keyboardType: 'default' },
              { label: 'Site', value: site, setValue: setSite, keyboardType: 'default' },
              { label: 'Instagram', value: instagram, setValue: setInstagram, keyboardType: 'default' },
              { label: 'Facebook', value: facebook, setValue: setFacebook, keyboardType: 'default' }
            ].map((input, index) => (
              <View key={index} style={styles.inputContainer}>
                <Text style={styles.label}>{input.label}</Text>
                <TextInput 
                  style={styles.input} 
                  value={input.value} 
                  onChangeText={input.setValue} 
                  keyboardType={input.keyboardType} 
                />
              </View>
            ))}

            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
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
    zIndex: 10 
  },

  header: { 
    marginTop: 100,
    alignItems: 'center',
    marginBottom: 30
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
    paddingBottom: 20
  },

  titleContainer: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },

  title: { 
    fontSize: 25, 
    fontWeight: 'ABeeZee', 
    color: '#FFFFFF', 
    marginBottom: 12,
  },

  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },

  label: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 5,
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
    paddingVertical: 20, 
    borderRadius: 25, 
    alignItems: 'center',
    marginTop: 20
  },

  buttonText: { 
    color: '#ffffff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },

  voltarImagem: {
    marginTop: 30
  },

  pawIcon: {
    marginTop: 10,
    marginBottom: 25,
  },
});
