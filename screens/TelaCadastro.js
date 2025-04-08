import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, useWindowDimensions, SafeAreaView, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export default function CadastroScreen() {
  const [tipoCadastro, setTipoCadastro] = useState('usuario');
  const [cpf, setCpf] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cidade, setCidade] = useState('');
  const [endereco, setEndereco] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [ofereceServico, setOfereceServico] = useState(false);
  const [email, setEmail] = useState('');
  const [site, setSite] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const isLargeScreen = width > 600;

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validarCPF = (cpf) => {
    return cpf.length === 11 && !isNaN(cpf);
  };

  const validarCNPJ = (cnpj) => {
    return cnpj.length === 14 && !isNaN(cnpj);
  };

  const handleCadastro = async () => {
    if (!cpf || !nome || !telefone || !cidade || !endereco || !email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Todos os campos obrigatórios devem ser preenchidos!');
      return;
    }

    if (!validarCPF(cpf)) {
      Alert.alert('Erro', 'CPF inválido!');
      return;
    }

    if (tipoCadastro === 'ong' && cnpj && !validarCNPJ(cnpj)) {
      Alert.alert('Erro', 'CNPJ inválido!');
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert('Erro', 'E-mail inválido!');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    try {
      const usuariosJSON = await AsyncStorage.getItem('usuarios');
      const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];

      const usuarioExistente = usuarios.find(user => user.cpf === cpf);
      if (usuarioExistente) {
        // Verificando se o CPF já foi cadastrado como "Usuario" ou "ONG"
        if (usuarioExistente.tipoCadastro === 'usuario' && tipoCadastro === 'ong') {
          Alert.alert('Erro', 'Este CPF já foi cadastrado como Usuário!');
          return;
        }
        if (usuarioExistente.tipoCadastro === 'ong' && tipoCadastro === 'usuario') {
          Alert.alert('Erro', 'Este CPF já foi cadastrado como ONG!');
          return;
        }
      }

      const novoUsuario = { tipoCadastro, cpf, cnpj, nome, telefone, cidade, endereco, razaoSocial, ofereceServico, email, site, instagram, facebook, senha };
      usuarios.push(novoUsuario);

      await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível cadastrar o usuário.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={[styles.content, isLargeScreen && styles.contentLarge]} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Cadastro</Text>

        <View style={[styles.pickerContainer, isLargeScreen && styles.pickerContainerLarge]}>
          <Picker
            selectedValue={tipoCadastro}
            onValueChange={setTipoCadastro}
            style={[styles.input, isLargeScreen && styles.inputLarge]}
          >
            <Picker.Item label="Usuário" value="usuario" />
            <Picker.Item label="ONG/Clínica" value="ong" />
          </Picker>
        </View>

        <TextInput style={styles.input} placeholder="CPF" keyboardType="numeric" value={cpf} onChangeText={setCpf} />

        {tipoCadastro === 'ong' && (
          <TextInput style={styles.input} placeholder="CNPJ (opcional)" keyboardType="numeric" value={cnpj} onChangeText={setCnpj} />
        )}

        <TextInput style={styles.input} placeholder="Nome Completo" value={nome} onChangeText={setNome} />
        <TextInput style={styles.input} placeholder="Telefone" keyboardType="phone-pad" value={telefone} onChangeText={setTelefone} />
        <TextInput style={styles.input} placeholder="Cidade" value={cidade} onChangeText={setCidade} />
        <TextInput style={styles.input} placeholder="Endereço" value={endereco} onChangeText={setEndereco} />
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} />
        <TextInput style={styles.input} placeholder="Confirmar Senha" secureTextEntry value={confirmarSenha} onChangeText={setConfirmarSenha} />

        {tipoCadastro === 'ong' && (
          <>
            <TextInput style={styles.input} placeholder="Razão Social/Nome Fantasia" value={razaoSocial} onChangeText={setRazaoSocial} />
            <TextInput style={styles.input} placeholder="Site (opcional)" value={site} onChangeText={setSite} />
            <TextInput style={styles.input} placeholder="Instagram (opcional)" value={instagram} onChangeText={setInstagram} />
            <TextInput style={styles.input} placeholder="Facebook (opcional)" value={facebook} onChangeText={setFacebook} />
          </>
        )}

        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Já tem conta? Faça login</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
    paddingBottom: 20,
  },
  contentLarge: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  pickerContainer: {
    marginBottom: 15,
    width: '100%',
  },
  pickerContainerLarge: {
    marginTop: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  inputLarge: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  linkText: {
    textAlign: 'center',
    color: '#007BFF',
    marginTop: 20,
  },
});
