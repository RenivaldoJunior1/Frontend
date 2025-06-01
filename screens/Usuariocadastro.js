import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Image, Alert, 
  ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard 
} from 'react-native';
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
  const [isLoading, setIsLoading] = useState(false);

  const formatarCPF = (cpf) => {
    const cpfSemFormatacao = cpf.replace(/\D/g, '');
    
    if (cpfSemFormatacao.length <= 3) {
      return cpfSemFormatacao;
    } else if (cpfSemFormatacao.length <= 6) {
      return `${cpfSemFormatacao.slice(0, 3)}.${cpfSemFormatacao.slice(3)}`;
    } else if (cpfSemFormatacao.length <= 9) {
      return `${cpfSemFormatacao.slice(0, 3)}.${cpfSemFormatacao.slice(3, 6)}.${cpfSemFormatacao.slice(6)}`;
    } else {
      return `${cpfSemFormatacao.slice(0, 3)}.${cpfSemFormatacao.slice(3, 6)}.${cpfSemFormatacao.slice(6, 9)}-${cpfSemFormatacao.slice(9, 11)}`;
    }
  };

  const formatarTelefone = (telefone) => {
    const telefoneSemFormatacao = telefone.replace(/\D/g, '');
    
    if (telefoneSemFormatacao.length <= 2) {
      return telefoneSemFormatacao;
    } else if (telefoneSemFormatacao.length <= 7) {
      return `(${telefoneSemFormatacao.slice(0, 2)})${telefoneSemFormatacao.slice(2)}`;
    } else {
      return `(${telefoneSemFormatacao.slice(0, 2)})${telefoneSemFormatacao.slice(2, 7)}-${telefoneSemFormatacao.slice(7, 11)}`;
    }
  };

  const handleCPFChange = (text) => {
    setCpf(formatarCPF(text));
  };

  const handleTelefoneChange = (text) => {
    setTelefone(formatarTelefone(text));
  };

  const validarEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCadastro = async () => {
    if (!cpf || !nome || !telefone || !cidade || !endereco || !email || !senha || !confirmarSenha) {
      Alert.alert('Atenção', 'Todos os campos são obrigatórios!');
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

    if (cpf.length !== 14) {
      Alert.alert('Erro', 'O CPF deve estar no formato xxx.xxx.xxx-xx');
      return;
    }

    if (telefone.length !== 14) {
      Alert.alert('Erro', 'O telefone deve estar no formato (xx)xxxxx-xxxx');
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert('Erro', 'Formato de e-mail inválido!');
      return;
    }
  
    try {
      setIsLoading(true);
      
      const userData = {
        cpf: cpf,
        responsavelNome: nome,
        telefone: telefone, 
        cidade: cidade,
        endereco: endereco,
        email: email,
        password: senha
      };
      
      const response = await fetch('https://pethopeapi.onrender.com/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao cadastrar usuário');
      }

      console.log('Cadastro realizado com sucesso:', data);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login');

    } catch (error) {
      const errorMessage = error.message || 'Não foi possível realizar o cadastro.';
      Alert.alert('Erro', errorMessage);
      console.error("Erro ao cadastrar usuário:", error);
    } finally {
      setIsLoading(false);
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
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>CPF</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="000.000.000-00"
                  value={cpf} 
                  onChangeText={handleCPFChange}
                  keyboardType="numeric"
                  maxLength={14}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nome</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Nome completo"
                  value={nome} 
                  onChangeText={setNome}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Telefone</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="(00)00000-0000"
                  value={telefone} 
                  onChangeText={handleTelefoneChange}
                  keyboardType="numeric"
                  maxLength={14}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Cidade</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Sua cidade"
                  value={cidade} 
                  onChangeText={setCidade}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Endereço</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Rua, número, bairro"
                  value={endereco} 
                  onChangeText={setEndereco}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>E-mail</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="seu-email@exemplo.com"
                  value={email} 
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Senha</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Mínimo 6 caracteres"
                  value={senha} 
                  onChangeText={setSenha}
                  secureTextEntry={true}
                  minLength={6}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirmar Senha</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Repita sua senha"
                  value={confirmarSenha} 
                  onChangeText={setConfirmarSenha}
                  secureTextEntry={true}
                />
              </View>
  
              <TouchableOpacity 
                style={[styles.button, isLoading && styles.buttonDisabled]} 
                onPress={handleCadastro}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>
                  {isLoading ? "Cadastrando..." : "Cadastrar"}
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

  buttonDisabled: {
    backgroundColor: '#888888',
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