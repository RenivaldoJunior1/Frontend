import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Image, Alert, SafeAreaView, ScrollView, ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { MaskedTextInput } from "react-native-mask-text";
import FooterNav from "../components/FooterNav";

const HeaderContainer = styled(LinearGradient).attrs({
  colors: ['#E13E79', '#9C27B0'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  justify-content: space-between;
`;

const Header = () => {
  const navigation = useNavigation();
  return (
    <HeaderContainer>
      <Image source={require('../assets/PataHome.png')} style={styles.logo} />
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} color="#E13E79" />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar"
          placeholderTextColor="#E13E79"
        />
        <TouchableOpacity>
          <Ionicons name="options-outline" size={20} color="#E13E79" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
        <Image source={require('../assets/profile.png')} style={styles.profileImageSmall} />
      </TouchableOpacity>
    </HeaderContainer>
  );
};

export default function EditProfileScreen() {
  const navigation = useNavigation();
  
  const [originalUser, setOriginalUser] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState('USUARIO');
  const [userData, setUserData] = useState({
    email: '', phone: '', city: '', address: '', photo: null,
    site: '', instagram: '', facebook: '', offersService: false,
  });
  const [isSaving, setIsSaving] = useState(false);

  console.log(`[EditProfileScreen Render] tipoUsuario: ${tipoUsuario}, userData:`, JSON.stringify(userData));

  useEffect(() => {
    const loadUserData = async () => {
      console.log('[EditProfileScreen loadUserData] Iniciando carregamento...');
      const userJson = await AsyncStorage.getItem('usuarioAtual');
      if (userJson) {
        const user = JSON.parse(userJson);
        console.log('[EditProfileScreen loadUserData] Usuário carregado do AsyncStorage:', user);
        setOriginalUser(user);
        setTipoUsuario(user.tipo || 'USUARIO');
        setUserData({
          email: user.email || '',
          phone: (user.telefone || '').replace(/\D/g, ''), 
          city: user.cidade || '',
          address: user.logradouro || user.endereco || '',
          photo: user.photoUrl || user.photo || null,
          site: user.site || '',
          instagram: user.urlInstagram || '',
          facebook: user.urlFacebook || '',
          offersService: user.prestadorServico || false,
        });
        console.log('[EditProfileScreen loadUserData] Estados definidos após carregamento.');
      } else {
        console.log('[EditProfileScreen loadUserData] Nenhum usuário encontrado no AsyncStorage.');
      }
    };
    loadUserData();
  }, []);

  const handleChangePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à sua galeria para alterar a foto.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      updateUserDataField('photo', result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!originalUser || !originalUser.id) {
      Alert.alert('Erro', 'Não foi possível identificar o usuário para salvar.');
      return;
    }

    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      Alert.alert('Erro', 'Sessão expirada. Por favor, faça login novamente.');
      navigation.navigate('Login');
      return;
    }

    setIsSaving(true);

    const apiPayload = {
      telefone: userData.phone, 
      cidade: userData.city,
      endereco: userData.address,
      site: userData.site,
      urlInstagram: userData.instagram,
      urlFacebook: userData.facebook,
      prestadorServico: userData.offersService,
    };
    
    const cleanPayload = {};
    for (const key in apiPayload) {
      if (apiPayload[key] !== undefined && 
          apiPayload[key] !== null && 
          (typeof apiPayload[key] === 'boolean' || apiPayload[key] !== '')
      ) {
        cleanPayload[key] = apiPayload[key];
      } else if (key in apiPayload && originalUser && (originalUser[key] !== null && originalUser[key] !== undefined && originalUser[key] !== '')) {
         if (key === 'telefone' || key === 'cidade' || key === 'endereco' || key === 'site' || key === 'urlInstagram' || key === 'urlFacebook') {
            cleanPayload[key] = apiPayload[key]; 
         }
      }
    }
    if (typeof apiPayload.prestadorServico === 'boolean') {
        cleanPayload.prestadorServico = apiPayload.prestadorServico;
    }

    try {
      console.log('Enviando para API PATCH:', `https://pethopeapi.onrender.com/api/users/${originalUser.id}`, JSON.stringify(cleanPayload));
      const response = await fetch(`https://pethopeapi.onrender.com/api/users/${originalUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(cleanPayload),
      });

      const responseData = await response.json();

      if (response.ok) {
        const updatedUserFromApi = responseData.data || {};
        const updatedUserForStorage = {
          ...originalUser,
          ...updatedUserFromApi,
          photo: userData.photo, 
          telefone: updatedUserFromApi.telefone || userData.phone,
          cidade: updatedUserFromApi.cidade || userData.city,
          logradouro: updatedUserFromApi.logradouro || updatedUserFromApi.endereco || userData.address,
          site: updatedUserFromApi.site || userData.site,
          urlInstagram: updatedUserFromApi.urlInstagram || userData.instagram,
          urlFacebook: updatedUserFromApi.urlFacebook || userData.facebook,
          prestadorServico: (typeof updatedUserFromApi.prestadorServico === 'boolean') ? updatedUserFromApi.prestadorServico : userData.offersService,
        };
        
        await AsyncStorage.setItem('usuarioAtual', JSON.stringify(updatedUserForStorage));
        setOriginalUser(updatedUserForStorage); 
        
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
        navigation.goBack();
      } else {
        Alert.alert('Erro ao salvar', responseData.message || 'Não foi possível atualizar o perfil na API.');
        console.error('Erro da API ao salvar:', responseData);
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro de conexão ao salvar as alterações.');
      console.error('Erro de rede ao salvar perfil:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const fixedPhoneMask = "(99) 99999-9999";
  
  const updateUserDataField = (field, value) => {
    console.log(`[updateUserDataField] Tentando atualizar campo: ${field}, Novo valor:`, value);
    setUserData(prevUserData => {
      console.log(`[updateUserDataField] Estado anterior para ${field}:`, prevUserData[field]);
      if (prevUserData[field] !== value) {
        console.log(`[updateUserDataField] VALOR DIFERENTE! ATUALIZANDO ESTADO para o campo: ${field} com valor:`, value);
        return { ...prevUserData, [field]: value };
      }
      console.log(`[updateUserDataField] Valor é o mesmo. Nenhuma atualização de estado para o campo: ${field}.`);
      return prevUserData;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.blueBox}>
          <TouchableOpacity onPress={handleChangePhoto} style={styles.photoContainer}>
            {userData.photo ? (
              <Image source={{ uri: userData.photo }} style={styles.profilePhoto} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Ionicons name="person-circle-outline" size={80} color="#FFF" />
              </View>
            )}
            <Text style={styles.changePhotoText}>Editar Foto</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.blueBox}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Telefone</Text>
            <MaskedTextInput
              mask={fixedPhoneMask}
              value={userData.phone}
              onChangeText={(maskedText, rawText) => {
                console.log(`[Telefone onChangeText] masked: ${maskedText}, raw: ${rawText}`);
                updateUserDataField('phone', rawText);
              }}
              style={styles.input}
              keyboardType="numeric"
              placeholder="(xx) xxxxx-xxxx"
              placeholderTextColor="#777"
              editable={!isSaving}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Cidade</Text>
            <TextInput
              style={styles.input}
              value={userData.city}
              onChangeText={(text) => {
                console.log(`[Cidade onChangeText] texto: ${text}`);
                updateUserDataField('city', text);
              }}
              editable={!isSaving}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Endereço</Text>
            <TextInput
              style={styles.input}
              value={userData.address}
              onChangeText={(text) => updateUserDataField('address', text)}
              editable={!isSaving}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, styles.disabledInput]}
              value={userData.email}
              editable={false}
            />
          </View>

          {(tipoUsuario === 'ONG' || tipoUsuario === 'CLINICA') && (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Site</Text>
                <TextInput
                  style={styles.input}
                  value={userData.site}
                  onChangeText={(text) => updateUserDataField('site', text)}
                  keyboardType="url"
                  editable={!isSaving}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Instagram (URL)</Text>
                <TextInput
                  style={styles.input}
                  value={userData.instagram}
                  onChangeText={(text) => updateUserDataField('instagram', text)}
                  keyboardType="url"
                  editable={!isSaving}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Facebook (URL)</Text>
                <TextInput
                  style={styles.input}
                  value={userData.facebook}
                  onChangeText={(text) => updateUserDataField('facebook', text)}
                  keyboardType="url"
                  editable={!isSaving}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Oferece serviço?</Text>
                <View style={{ flexDirection: 'row', gap: 20, marginTop: 10, justifyContent:'center' }}>
                  <TouchableOpacity
                    onPress={() => updateUserDataField('offersService', true)}
                    style={[
                      styles.toggleButton,
                      userData.offersService && styles.selectedToggle,
                    ]}
                    disabled={isSaving}
                  >
                    <Text style={{ color: userData.offersService ? '#FFF' : '#000' }}>Sim</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => updateUserDataField('offersService', false)}
                    style={[
                      styles.toggleButton,
                      !userData.offersService && styles.selectedToggle,
                    ]}
                    disabled={isSaving}
                  >
                    <Text style={{ color: !userData.offersService ? '#FFF' : '#000' }}>Não</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}

          <TouchableOpacity style={[styles.saveButton, isSaving && styles.saveButtonDisabled]} onPress={handleSave} disabled={isSaving}>
            {isSaving ? (
                <ActivityIndicator size="small" color="#FFF" />
            ) : (
                <Text style={styles.saveButtonText}>Salvar</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
      <FooterNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#C73578',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  changePhotoText: {
    marginTop: 10,
    color: '#2B2B52',
    textDecorationLine: 'underline',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#2B2B52',
    marginBottom: 5,
    fontWeight: 'bold',
    left: 8,
  },
  input: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 30,
    fontSize: 16,
    marginTop: 2,
  },
  disabledInput: {
    backgroundColor: '#FFF',
  },
  saveButton: {
    backgroundColor: '#F45B74',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  blueBox: {
    backgroundColor: '#E6E6FA',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 5,
    color: '#E13E79',
  },
  profileImageSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#999',
  },
  selectedToggle: {
    backgroundColor: '#F45B74',
    borderColor: '#F45B74',
  },
});
