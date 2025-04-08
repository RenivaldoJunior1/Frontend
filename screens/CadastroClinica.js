import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Image, Alert, 
  ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Switch
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CadastroClinicascreen() {
  const navigation = useNavigation();
  const [cnpj, setCnpj] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cidade, setCidade] = useState('');
  const [endereco, setEndereco] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [ofereceServico, setOfereceServico] = useState(false);
  const [tipoServico, setTipoServico] = useState('');
  const [email, setEmail] = useState('');
  const [site, setSite] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');


  const handleCadastro = async () => {
  if (!cnpj || cnpj.length !== 14 || !telefone || telefone.length !== 11 || !cidade || !endereco || !razaoSocial || !email || !senha || !confirmarSenha) {
    Alert.alert('Atenção', 'Preencha todos os campos obrigatórios corretamente!');
    return;
  }

  if (senha !== confirmarSenha) {
    Alert.alert('Erro', 'As senhas não coincidem!');
    return;
  }
  
  if (senha.length < 6) {
    Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres!');
    return;
  }

  try {
    const novaClinica = { 
      cnpj, 
      nome, 
      telefone, 
      cidade, 
      endereco, 
      razaoSocial, 
      nomeFantasia, 
      ofereceServico, 
      tipoServico: ofereceServico ? tipoServico : '',
      email, 
      site, 
      instagram, 
      facebook,
      senha,
      tipoCadastro: 'clinica' 
    };

    // Corrigido: Busca o array existente ou cria um novo
    const clinicasSalvas = JSON.parse(await AsyncStorage.getItem('clinicas')) || [];
    
    // Verifica se o email já está cadastrado
    const clinicaExistente = clinicasSalvas.find(c => c.email === email);
    if (clinicaExistente) {
      Alert.alert('Erro', 'Este email já está cadastrado!');
      return;
    }

    // Adiciona a nova clínica ao array
    clinicasSalvas.push(novaClinica);
    
    // Salva o array atualizado
    await AsyncStorage.setItem('clinicas', JSON.stringify(clinicasSalvas));

    console.log("Dados salvos:", novaClinica);
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    navigation.navigate('Login');
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível realizar o cadastro.');
    console.error("Erro ao salvar no AsyncStorage:", error);
  }
};

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
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
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Cadastro de Clinica</Text>
                <Image source={require("../assets/patinha-login.png")} style={styles.pawIcon}/>
              </View>
              {[{ label: 'CNPJ', value: cnpj, setValue: setCnpj, keyboardType: 'numeric' },
                { label: 'Nome do Responsável', value: nome, setValue: setNome },
                { label: 'Telefone', value: telefone, setValue: setTelefone, keyboardType: 'numeric' },
                { label: 'Cidade', value: cidade, setValue: setCidade },
                { label: 'Endereço', value: endereco, setValue: setEndereco },
                { label: 'Razão Social', value: razaoSocial, setValue: setRazaoSocial },
                { label: 'Nome Fantasia', value: nomeFantasia, setValue: setNomeFantasia },
                { label: 'E-mail', value: email, setValue: setEmail, keyboardType: 'email-address' },
                { label: 'Site', value: site, setValue: setSite },
                { label: 'Instagram', value: instagram, setValue: setInstagram },
                { label: 'Facebook', value: facebook, setValue: setFacebook },
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
                    }
                  } 
                    />
                  </View>
              ))}

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Oferece serviço?</Text>
                <View style={styles.checkboxContainer}>
                  <TouchableOpacity 
                    style={styles.checkboxItem} 
                    onPress={() => setOfereceServico(true)}
                  >
                    <View style={[styles.checkboxSquare, ofereceServico && styles.checkboxSquareSelected]} />
                    <Text style={styles.checkboxLabel}>Sim</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.checkboxItem} 
                    onPress={() => setOfereceServico(false)}
                  >
                    <View style={[styles.checkboxSquare, !ofereceServico && styles.checkboxSquareSelected]} />
                    <Text style={styles.checkboxLabel}>Não</Text>
                  </TouchableOpacity>
                </View>
              </View>


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
    top: 20, left: 20, 
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

  titleContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },

  title: { 
    fontSize: 30, 
    fontWeight: 'ABeeZee', 
    color: '#FFFFFF', 
    marginBottom: 25,
    marginTop: 30
  },

  inputContainer: { 
    width: '100%', 
    marginBottom: 10 
  },

  label: { 
    fontSize: 14, 
    color: '#FFFFFF', 
    marginBottom: 5, 
    marginLeft: 15 
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
    alignSelf: 'center'
  },

  buttonText: { 
    color: '#ffffff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },

  voltarImagem: {
    marginTop: 25 
  },

  pawIcon: {
    marginLeft: 1,
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginBottom: 10,
  },

  checkboxContainer: {
    flexDirection: 'row',
    left:20,
    alignItems: 'center',
    marginTop: 5,
  },
  
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  
  checkboxSquare: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'transparent',
    marginRight: 8,
  },
  
  checkboxSquareSelected: {
    backgroundColor: '#fff',
  },
  
  checkboxLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
  
});
