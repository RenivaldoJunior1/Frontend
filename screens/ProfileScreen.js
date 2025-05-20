import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  // Carrega o perfil do usuário
  const loadUserProfile = async () => {
    try {
      setLoading(true);
      
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        throw new Error("ID do usuário não encontrado.");
      }

      const response = await fetch(`https://pethopeapi.onrender.com/api/users/${userId}`);
      const data = await response.json();

      if (response.ok) {
        setUserData(data.data);
      } else {
        console.error("Erro ao buscar usuário:", data);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadUserProfile();
    }
  }, [isFocused]);

  // Atualizar dados do usuário
  const updateUserProfile = async (newData) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await fetch(`https://pethopeapi.onrender.com/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
        loadUserProfile();
      } else {
        console.error("Erro ao atualizar perfil");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  // Excluir usuário
  const deleteUserProfile = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await fetch(`https://pethopeapi.onrender.com/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Conta excluída com sucesso!");
        await AsyncStorage.clear();
        navigation.navigate("Login");
      } else {
        console.error("Erro ao excluir conta");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

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
        <InfoItem label="Endereço" value={userData.logradouro} />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => updateUserProfile({ telefone: "Novo Telefone" })}>
        <Text style={styles.buttonText}>Atualizar Dados</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={deleteUserProfile}>
        <Text style={styles.deleteButtonText}>Excluir Conta</Text>
      </TouchableOpacity>
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
