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

  // Função para formatar o CNPJ no padrão XX.XXX.XXX/XXXX-XX
  const formatarCNPJ = (cnpj) => {
    const cnpjSemFormatacao = cnpj.replace(/\D/g, '');
    if (cnpjSemFormatacao.length <= 14) {
      return cnpjSemFormatacao;
    }
    return cnpjSemFormatacao.slice(0, 14);
  };

  // Função para formatar o telefone no padrão (xx)xxxxx-xxxx sem espaços
  const formatarTelefone = (telefone) => {
    const telefoneSemFormatacao = telefone.replace(/\D/g, '');
    
    if (telefoneSemFormatacao.length <= 2) {
      return `(${telefoneSemFormatacao}`;
    } else if (telefoneSemFormatacao.length <= 7) {
      return `(${telefoneSemFormatacao.slice(0, 2)})${telefoneSemFormatacao.slice(2)}`;
    } else {
      return `(${telefoneSemFormatacao.slice(0, 2)})${telefoneSemFormatacao.slice(2, 7)}-${telefoneSemFormatacao.slice(7, 11)}`;
    }
  };

  const handleCNPJChange = (text) => {
    setCnpj(formatarCNPJ(text));
  };

  const handleTelefoneChange = (text) => {
    setTelefone(formatarTelefone(text));
  };

  const validarEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCadastro = async () => {
    // Validação dos campos obrigatórios
    if (!cnpj || !nome || !telefone || !cidade || !endereco || !razaoSocial || !email || !senha || !confirmarSenha) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios!');
      return;
    }
  
    // Validação do CNPJ (apenas números e 14 dígitos)
    if (cnpj.length !== 14) {
      Alert.alert('Erro', 'O CNPJ deve ter 14 dígitos!');
      return;
    }
  
    // Validação do telefone (exatamente 14 caracteres incluindo formatação)
    const telefoneFormatado = telefone.replace(/\s/g, ''); // Remove espaços
    if (telefoneFormatado.length !== 14) {
      Alert.alert('Erro', 'O telefone deve estar no formato (xx)xxxxx-xxxx');
      return;
    }
  
    // Validação das senhas
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }
      
    // Verificação de senha com no mínimo 6 caracteres
    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres!');
      return;
    }
  
    // Validação do email
    if (!validarEmail(email)) {
      Alert.alert('Erro', 'Formato de e-mail inválido!');
      return;
    }
  
    // Preparar URLs com protocolo HTTPS se não estiver presente
    function prepararURL(url) {
      if (!url) return undefined;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return `https://${url}`;
      }
      return url;
    }
  
    try {
      setIsLoading(true);
  
      const dadosONG = {
        cnpj: cnpj, 
        responsavelNome: nome,
        telefone: telefoneFormatado,
        cidade: cidade,
        endereco: endereco,
        razaoSocial: razaoSocial,
        email: email,
        senha: senha,
        site: prepararURL(site),
        urlFacebook: prepararURL(facebook),
        urlInstagram: prepararURL(instagram),
        isPrestadorServico: ofereceServico
      };
  
      if (nomeFantasia && nomeFantasia.trim() !== '') {
        dadosONG.nomeFantasia = nomeFantasia;
      }
  
      // Remover o campo tipoServico, já que não parece estar na especificação
      // Se quiser manter, descomente a linha abaixo
      // if (ofereceServico && tipoServico && tipoServico.trim() !== '') {
      //   dadosONG.tipoServico = tipoServico;
      // }
    
      const response = await fetch('https://pethopeapi.onrender.com/api/users/ong', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(dadosONG),
      });
      
      const responseText = await response.text();      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("Erro ao parsear resposta JSON:", e);
        data = { message: 'Erro ao processar resposta do servidor' };
      }
      
      if (!response.ok) {
        throw new Error(data.message || `Erro ${response.status}: ${responseText}`);
      }
  
      console.log("Resposta da API:", data);
      Alert.alert('Sucesso', 'Cadastro da ONG realizado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      const errorMessage = error.message || 'Não foi possível realizar o cadastro.';
      Alert.alert('Erro', errorMessage);
      console.error("Erro ao cadastrar ONG:", error);
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
                <Text style={styles.title}>Cadastro de ONG</Text>
                <Image source={require("../assets/patinha-login.png")} style={styles.pawIcon}/>
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>CNPJ</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Apenas números" 
                  value={cnpj} 
                  onChangeText={handleCNPJChange} 
                  keyboardType="numeric"
                  maxLength={14}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nome do Responsável</Text>
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
                  placeholder="(xx)xxxxx-xxxx" 
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
                <Text style={styles.label}>Razão Social</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Nome oficial da ONG" 
                  value={razaoSocial} 
                  onChangeText={setRazaoSocial} 
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nome Fantasia</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Nome comercial (opcional)" 
                  value={nomeFantasia} 
                  onChangeText={setNomeFantasia} 
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
                <Text style={styles.label}>Site</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="https://www.seusite.com (opcional)" 
                  value={site} 
                  onChangeText={setSite}
                  autoCapitalize="none"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Instagram</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="https://www.instagram.com/perfil (opcional)" 
                  value={instagram} 
                  onChangeText={setInstagram}
                  autoCapitalize="none"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Facebook</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="https://www.facebook.com/perfil (opcional)" 
                  value={facebook} 
                  onChangeText={setFacebook}
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

  pawIcon: {
    marginLeft: 1,
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginBottom: 10,
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
  },
  
  checkboxSelected: {
    backgroundColor: '#3C55D2',
    borderColor: '#3C55D2',
  },
  
  checkboxLabel: {
    fontSize: 14,
    color: '#fff',
  }
});