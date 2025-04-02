import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [petsData, setPetsData] = useState([]);
  const [stats, setStats] = useState({
    totalPets: 0,
    adoptedPets: 0,
    availablePets: 0
  });

  const filters = ['Todos', 'Disponíveis', 'Adotados', 'Cachorros', 'Gatos'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obter dados do usuário
        const userJson = await AsyncStorage.getItem('currentUser');
        if (userJson) {
          const user = JSON.parse(userJson);
          setUserData(user);
        }

        // Obter pets
        const petsJson = await AsyncStorage.getItem('pets');
        const allPets = petsJson ? JSON.parse(petsJson) : [];
        
        // Filtrar pets do usuário atual (se for ONG/Clínica)
        const userPets = allPets.filter(pet => pet.ownerId === userData?.id);
        setPetsData(userPets);
        
        // Calcular estatísticas
        setStats({
          totalPets: userPets.length,
          adoptedPets: userPets.filter(pet => pet.status === 'adopted').length,
          availablePets: userPets.filter(pet => pet.status === 'available').length
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

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
      const newPhoto = result.assets[0].uri;
      try {
        // Atualizar no AsyncStorage
        const userJson = await AsyncStorage.getItem('currentUser');
        if (userJson) {
          const user = JSON.parse(userJson);
          user.photo = newPhoto;
          await AsyncStorage.setItem('currentUser', JSON.stringify(user));
          setUserData(user);
        }
      } catch (error) {
        console.error('Error updating photo:', error);
      }
    }
  };

  const applyFilter = async (filter) => {
    const petsJson = await AsyncStorage.getItem('pets');
    const allPets = petsJson ? JSON.parse(petsJson) : [];
    let filteredPets = allPets;

    switch(filter) {
      case 'Disponíveis':
        filteredPets = filteredPets.filter(pet => pet.status === 'available');
        break;
      case 'Adotados':
        filteredPets = filteredPets.filter(pet => pet.status === 'adopted');
        break;
      case 'Cachorros':
        filteredPets = filteredPets.filter(pet => pet.type === 'dog');
        break;
      case 'Gatos':
        filteredPets = filteredPets.filter(pet => pet.type === 'cat');
        break;
    }

    setPetsData(filteredPets);
    setStats({
      totalPets: filteredPets.length,
      adoptedPets: filteredPets.filter(pet => pet.status === 'adopted').length,
      availablePets: filteredPets.filter(pet => pet.status === 'available').length
    });
  };

  return (
    <LinearGradient colors={['#EB5375', '#E34D76', '#D84477', '#C73578']} style={styles.container}>
      <View style={styles.content}>
        {/* Header com foto e informações do usuário */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleChangePhoto}>
            {userData?.photo ? (
              <Image source={{ uri: userData.photo }} style={styles.profileImage} />
            ) : (
              <View style={styles.profilePlaceholder}>
                <Ionicons name="person" size={40} color="#FFF" />
              </View>
            )}
          </TouchableOpacity>
          
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userData?.name || 'Usuário'}</Text>
            <Text style={styles.userEmail}>{userData?.email || 'email@exemplo.com'}</Text>
            <Text style={styles.userType}>{userData?.type === 'ong' ? 'ONG/Clínica' : 'Usuário'}</Text>
            
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Text style={styles.editButtonText}>Editar Perfil</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Estatísticas */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.totalPets}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.availablePets}</Text>
            <Text style={styles.statLabel}>Disponíveis</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.adoptedPets}</Text>
            <Text style={styles.statLabel}>Adotados</Text>
          </View>
        </View>

        <Text style={styles.title}>Pets Cadastrados</Text>
        
        {/* Lista de Pets */}
        {petsData.length > 0 ? (
          <FlatList
            data={petsData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.petItem}
                onPress={() => navigation.navigate('AnimalDetail', { animal: item })}
              >
                {item.images?.[0] && (
                  <Image source={{ uri: item.images[0] }} style={styles.petImage} />
                )}
                <View style={styles.petInfo}>
                  <Text style={styles.petName}>{item.name}</Text>
                  <Text style={styles.petBreed}>{item.breed}</Text>
                  <View style={[
                    styles.statusBadge,
                    item.status === 'available' ? styles.availableBadge : styles.adoptedBadge
                  ]}>
                    <Text style={styles.statusText}>
                      {item.status === 'available' ? 'Disponível' : 'Adotado'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            style={styles.petsList}
          />
        ) : (
          <Text style={styles.noPetsText}>Nenhum pet cadastrado</Text>
        )}

        {/* Filtros */}
        <View style={styles.filterContainer}>
          <Text style={styles.filterTitle}>FILTROS</Text>
          <View style={styles.filterButtons}>
            {filters.map((filter, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.filterButton}
                onPress={() => applyFilter(filter)}
              >
                <Text style={styles.filterText}>{filter}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  profilePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#C73578',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  userInfo: {
    marginLeft: 15,
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  userType: {
    fontSize: 14,
    color: '#B2BC29',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#B2BC29',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C73578',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  petItem: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  petImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  petInfo: {
    flex: 1,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  petBreed: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  availableBadge: {
    backgroundColor: '#E8F5E9',
  },
  adoptedBadge: {
    backgroundColor: '#FFEBEE',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  petsList: {
    marginBottom: 20,
  },
  noPetsText: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 20,
    fontSize: 16,
  },
  filterContainer: {
    marginTop: 'auto',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E6E6E6',
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  filterButton: {
    backgroundColor: '#B2BC29',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  filterText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});