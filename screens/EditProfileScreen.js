import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    photo: null
  });

  useEffect(() => {
    const loadUserData = async () => {
      const userJson = await AsyncStorage.getItem('currentUser');
      if (userJson) {
        const user = JSON.parse(userJson);
        setUserData({
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
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
          name: userData.name,
          phone: userData.phone,
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
    <LinearGradient colors={['#EB5375', '#E34D76', '#D84477', '#C73578']} style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={handleChangePhoto} style={styles.photoContainer}>
          {userData.photo ? (
            <Image source={{ uri: userData.photo }} style={styles.profilePhoto} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Ionicons name="person" size={50} color="#FFF" />
            </View>
          )}
          <Text style={styles.changePhotoText}>Alterar Foto</Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={userData.name}
            onChangeText={(text) => setUserData({ ...userData, name: text })}
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

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            value={userData.phone}
            onChangeText={(text) => setUserData({ ...userData, phone: text })}
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  content: {
    flex: 1,
    backgroundColor: '#FFF4EC',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
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
    color: '#C73578',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  disabledInput: {
    backgroundColor: '#EEE',
    color: '#666',
  },
  saveButton: {
    backgroundColor: '#B2BC29',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});