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
      
        // Verificação de senha com no mínimo 6 caracteres
        if (senha.length < 6) {
          Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres!');
          return;
        }

    try {
      const novaOng = { 
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
        tipoCadastro: 'ong'
      };

      console.log("Dados a serem salvos", novaOng);
      
      const ongsSalvas = await AsyncStorage.getItem( 'ongs' );
      const listaOngs = ongsSalvas ? JSON.parse(ongsSalvas) : [];

      // Adiciona a nova clínica ao array
      listaOngs.push(novaOng);

      // Salva o array atualizado
      await AsyncStorage.setItem('ongs', JSON.stringify(listaOngs));

      console.log("Dados Salvos", listaOngs);

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
                              <View style={styles.row}>
                                <Text style={styles.title}>Cadastro de</Text>
                                <Image source={require("../assets/patinha.png")} style={styles.pawIcon} />
                              </View>
                              <Text style={styles.continueTitle}>ONGs</Text>
                            </View>
              {[{ label: 'CNPJ', value: cnpj, setValue: setCnpj, keyboardType: 'numeric', maxLength: 14 },
                { label: 'Nome do Responsável', value: nome, setValue: setNome },
                { label: 'Telefone', value: telefone, setValue: setTelefone, keyboardType: 'numeric', maxLength: 11 },
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
                  <Text style={styles.label}>Oferece Serviço?</Text>
                  <View style={styles.checkboxRow}>
                    <TouchableOpacity style={styles.checkboxItem} onPress={() => setOfereceServico(true)}>
                      <View style={[styles.checkboxBox, ofereceServico === true && styles.checkboxSelected]} />
                      <Text style={styles.checkboxLabel}>Sim</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.checkboxItem} onPress={() => setOfereceServico(false)}>
                      <View style={[styles.checkboxBox, ofereceServico === false && styles.checkboxSelected]} />
                      <Text style={styles.checkboxLabel}>Não</Text>
                    </TouchableOpacity>
                  </View>

                </View>

{ofereceServico === true && (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>Qual serviço?</Text>
    <TextInput 
      style={styles.input} 
      placeholder='Digite o serviço oferecido' 
      value={tipoServico} 
      onChangeText={setTipoServico}
    />
  </View>
)}

              

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
    borderTopLeftRadius: 50, 
    borderTopRightRadius: 50 
  },

  scrollContent: { 
    paddingBottom: 30 
  },

  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  title: { 
    fontSize: 30, 
    fontWeight: 'ABeeZee', 
    color: '#FFFFFF', 
    marginTop: 30,
    left: 30
  },

  inputContainer: { 
    width: '100%', 
    marginBottom: 10 
  },

  label: { 
    fontSize: 20, 
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
    marginBottom: 40,
    left: 50
  },

  checkboxRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
    marginTop: 10,
  },
  
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 8,
    backgroundColor: '#fff',
    left: 18
  },
  
  checkboxSelected: {
    backgroundColor: '#3C55D2',
    borderColor: '#3C55D2',
    left: 18
  },
  
  checkboxLabel: {
    fontSize: 14,
    color: '#fff',
    left: 18
  },

  continueTitle: {
    fontSize: 30,
    fontWeight: 'ABeeZee',
    color: '#FFFFFF',
    marginTop: -2,
    left: 10
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
