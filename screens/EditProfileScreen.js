import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Image, Alert, SafeAreaView, ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components/native';
import FooterNav from "../components/FooterNav";

// Header com gradiente
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
  const [userData, setUserData] = useState({
    email: '',
    phone: '',
    city: '',
    address: '',
    photo: null
  });

  useEffect(() => {
    const loadUserData = async () => {
      const userJson = await AsyncStorage.getItem('currentUser');
      if (userJson) {
        const user = JSON.parse(userJson);
        setUserData({
          email: user.email || '',
          phone: user.phone || '',
          city: user.city || '',
          address: user.address || '',
          photo: user.photo || null
        });
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUserData({ ...userData, photo: result.assets[0].uri });
    }
  };

  const handleSave = async () => {
    try {
      const userJson = await AsyncStorage.getItem('currentUser');
      if (userJson) {
        const user = JSON.parse(userJson);
        const updatedUser = {
          ...user,
          phone: userData.phone,
          city: userData.city,
          address: userData.address,
          photo: userData.photo
        };
        await AsyncStorage.setItem('currentUser', JSON.stringify(updatedUser));
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar as alterações.');
      console.error('Error saving profile:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header fixo */}
      <Header />

      {/* Conteúdo rolável */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.blueBox}>
          <TouchableOpacity onPress={handleChangePhoto} style={styles.photoContainer}>
            {userData.photo ? (
              <Image source={{ uri: userData.photo }} style={styles.profilePhoto} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Ionicons name="person" size={50} color="#FFF" />
              </View>
            )}
            <Text style={styles.changePhotoText}>Editar Foto</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.blueBox}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Telefone</Text>
            <TextInput
              style={styles.input}
              value={userData.phone}
              onChangeText={(text) => setUserData({ ...userData, phone: text })}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Cidade</Text>
            <TextInput
              style={styles.input}
              value={userData.city}
              onChangeText={(text) => setUserData({ ...userData, city: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Endereço</Text>
            <TextInput
              style={styles.input}
              value={userData.address}
              onChangeText={(text) => setUserData({ ...userData, address: text })}
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

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer fixo */}
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
    paddingBottom: 100, // Espaço para não cobrir o conteúdo com o Footer
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
});
