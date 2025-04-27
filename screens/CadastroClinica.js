import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Image, Alert, 
  ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard
} from 'react-native';
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
  const [email, setEmail] = useState('');
  const [site, setSite] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Função para formatar o CNPJ com pontuação
  const formatCNPJ = (value) => {
    // Remove qualquer caractere não-numérico
    const numericValue = value.replace(/\D/g, '');
    
    // Limita a 14 dígitos
    const limitedValue = numericValue.slice(0, 14);
    
    // Aplica a formatação do CNPJ: XX.XXX.XXX/XXXX-XX
    if (limitedValue.length <= 2) {
      return limitedValue;
    } else if (limitedValue.length <= 5) {
      return `${limitedValue.slice(0, 2)}.${limitedValue.slice(2)}`;
    } else if (limitedValue.length <= 8) {
      return `${limitedValue.slice(0, 2)}.${limitedValue.slice(2, 5)}.${limitedValue.slice(5)}`;
    } else if (limitedValue.length <= 12) {
      return `${limitedValue.slice(0, 2)}.${limitedValue.slice(2, 5)}.${limitedValue.slice(5, 8)}/${limitedValue.slice(8)}`;
    } else {
      return `${limitedValue.slice(0, 2)}.${limitedValue.slice(2, 5)}.${limitedValue.slice(5, 8)}/${limitedValue.slice(8, 12)}-${limitedValue.slice(12)}`;
    }
  };

  // Função para formatar o telefone (XX)XXXXX-XXXX
  const formatTelefone = (value) => {
    // Remove qualquer caractere não-numérico
    const numericValue = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos
    const limitedValue = numericValue.slice(0, 11);
    
    // Aplica a formatação
    if (limitedValue.length <= 2) {
      return `(${limitedValue}`;
    } else if (limitedValue.length <= 7) {
      return `(${limitedValue.slice(0, 2)})${limitedValue.slice(2)}`;
    } else {
      return `(${limitedValue.slice(0, 2)})${limitedValue.slice(2, 7)}-${limitedValue.slice(7)}`;
    }
  };

  const handleCadastro = async () => {
    // Remove formatação do CNPJ e telefone para validação
    const cnpjLimpo = cnpj.replace(/\D/g, '');
    const telefoneLimpo = telefone.replace(/\D/g, '');

    if (!cnpjLimpo || cnpjLimpo.length !== 14 || !telefoneLimpo || telefoneLimpo.length < 10 || 
        !cidade || !endereco || !razaoSocial || !email || !senha || !confirmarSenha || !nome) {
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
      setIsLoading(true);

      // Prepara o objeto para enviar ao backend conforme a especificação da API
      const dadosClinica = {
        cnpj: cnpjLimpo,
        responsavelNome: nome,
        telefone: telefoneLimpo.length === 11 ? 
          `(${telefoneLimpo.slice(0, 2)})${telefoneLimpo.slice(2, 7)}-${telefoneLimpo.slice(7)}` : 
          `(${telefoneLimpo.slice(0, 2)})${telefoneLimpo.slice(2)}`,
        cidade,
        endereco,
        razaoSocial,
        nomeFantasia,
        email,
        senha,
        site,
        urlInstagram: instagram,
        urlFacebook: facebook,
        isPrestadorServico: ofereceServico
      };

      console.log(dadosClinica)

      // Faz a requisição POST para a API
      const resposta = await fetch('https://pethopeapi.onrender.com/api/users/clinica', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosClinica),
      });

      console.log("=======================================================================")
      // Processa a resposta
      const dadosResposta = await resposta.json();
      console.log(dadosResposta)
      if (!resposta.ok) {
        // Se a resposta não for bem-sucedida (status diferente de 2xx)
        throw new Error(dadosResposta.message || 'Erro ao cadastrar clínica');
      }

      console.log("Cadastro realizado com sucesso:", dadosResposta);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login');
    } catch (erro) {
      const mensagemErro = erro.message || 'Não foi possível realizar o cadastro.';
      Alert.alert('Erro', mensagemErro);
      console.error("Erro ao cadastrar clínica:", erro);
    } finally {
      setIsLoading(false);
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
                <Text style={styles.title}>Cadastro de Clínica</Text>
                <Image source={require("../assets/patinha-login.png")} style={styles.pawIcon}/>
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>CNPJ</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="XX.XXX.XXX/XXXX-XX" 
                  value={cnpj} 
                  onChangeText={(text) => setCnpj(formatCNPJ(text))} 
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nome do Responsável</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Nome do Responsável" 
                  value={nome} 
                  onChangeText={setNome} 
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Telefone</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="(XX)XXXXX-XXXX" 
                  value={telefone} 
                  onChangeText={(text) => setTelefone(formatTelefone(text))} 
                  keyboardType="numeric" 
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Cidade</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Cidade" 
                  value={cidade} 
                  onChangeText={setCidade} 
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Endereço</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Endereço" 
                  value={endereco} 
                  onChangeText={setEndereco} 
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Razão Social</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Razão Social" 
                  value={razaoSocial} 
                  onChangeText={setRazaoSocial} 
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nome Fantasia</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Nome Fantasia" 
                  value={nomeFantasia} 
                  onChangeText={setNomeFantasia} 
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>E-mail</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="E-mail" 
                  value={email} 
                  onChangeText={setEmail} 
                  keyboardType="email-address" 
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Site</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Site" 
                  value={site} 
                  onChangeText={setSite} 
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Instagram</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Instagram" 
                  value={instagram} 
                  onChangeText={setInstagram} 
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Facebook</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Facebook" 
                  value={facebook} 
                  onChangeText={setFacebook} 
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Senha</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Senha" 
                  value={senha} 
                  onChangeText={setSenha} 
                  secureTextEntry={true} 
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirmar Senha</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Confirmar Senha" 
                  value={confirmarSenha} 
                  onChangeText={setConfirmarSenha} 
                  secureTextEntry={true} 
                />
              </View>

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

              <TouchableOpacity 
                style={[styles.button, isLoading && styles.buttonDisabled]} 
                onPress={handleCadastro}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>
                  {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                </Text>
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
