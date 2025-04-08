import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function ProfileScreen() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      
      // Opção 1: Buscar diretamente o usuário atual salvo
      const usuarioAtual = await AsyncStorage.getItem('usuarioAtual');
      
      if (usuarioAtual) {
        setUserData(JSON.parse(usuarioAtual));
      } else {
        // Opção 2: Buscar por email (método alternativo)
        const email = await AsyncStorage.getItem('loggedInUserEmail');
        const usuarios = JSON.parse(await AsyncStorage.getItem('usuarios')) || [];
        const usuarioEncontrado = usuarios.find(u => u.email === email);
        
        if (usuarioEncontrado) {
          setUserData(usuarioEncontrado);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadUserProfile();
    }
  }, [isFocused]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E34D76" />
        <Text>Carregando perfil...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Não foi possível carregar os dados do perfil</Text>
        <TouchableOpacity onPress={loadUserProfile}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        {userData.photo ? (
          <Image source={{ uri: userData.photo }} style={styles.profileImage} />
        ) : (
          <View style={styles.profileImagePlaceholder}>
            <Text style={styles.initials}>
              {userData.nome ? userData.nome.charAt(0) : 'U'}
            </Text>
          </View>
        )}
        <Text style={styles.userName}>{userData.nome || 'Usuário'}</Text>
      </View>

      <View style={styles.infoContainer}>
        <InfoItem label="Email" value={userData.email} />
        <InfoItem label="Telefone" value={userData.telefone} />
        <InfoItem label="Cidade" value={userData.cidade} />
        <InfoItem label="Endereço" value={userData.endereco} />
      </View>
    </ScrollView>
  );
}

const InfoItem = ({ label, value }) => (
  <View style={styles.infoItem}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value || 'Não informado'}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#E34D76',
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E34D76',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontSize: 40,
    color: '#FFF',
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  infoContainer: {
    padding: 20,
  },
  infoItem: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
    marginTop: 5,
  },
  errorText: {
    fontSize: 18,
    color: '#E34D76',
    textAlign: 'center',
    marginTop: 50,
  },
  retryText: {
    fontSize: 16,
    color: '#E34D76',
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});