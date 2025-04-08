import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import logoImg from '../assets/patinha +.png';
import profileImg from '../assets/patinha +.png';
import bellIcon from '../assets/patinha +.png';
import categoryImg from '../assets/patinha +.png';
import recommendationImg from '../assets/patinha +.png';
import homeIcon from '../assets/Home.png';
import adoptionIcon from '../assets/patinha.png';
import alertIcon from '../assets/Flag.png';
import messagesIcon from '../assets/Mail.png';
import menuIcon from '../assets/patinha +.png';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const [userType, setUserType] = useState('');
  const [userData, setUserData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const loadUserData = async () => {
    try {
      const storedUserType = await AsyncStorage.getItem('userType');
      const userJson = await AsyncStorage.getItem('currentUser');
      
      if (storedUserType) setUserType(storedUserType);
      if (userJson) setUserData(JSON.parse(userJson));
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserType = await AsyncStorage.getItem('tipoCadastro');
        const userJson = await AsyncStorage.getItem('currentUser');

        console.log('UserType carregado', storedUserType);
  
        if (storedUserType) {
          const trimmedUserType = storedUserType.trim().toLowerCase();
          setUserType(trimmedUserType); // Garantindo que esteja sempre em minúsculas e sem espaços
        }
  
        if (userJson) setUserData(JSON.parse(userJson));
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };
  
    loadUserData();
  }, []);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <HeaderImage source={logoImg} resizeMode="contain" />
          
          <SearchContainer>
            <Ionicons name="search" size={18} color="#666" style={styles.searchIcon} />
            <SearchInput
              placeholder="Buscar pets..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
          </SearchContainer>
          
          <ProfileButton onPress={() => navigation.navigate('Perfil')}>
            {userData?.photo ? (
              <ProfileImage source={{ uri: userData.photo }} />
            ) : (
              <Ionicons name="person-circle" size={32} color="#FFF" />
            )}
          </ProfileButton>
        </HeaderContent>
        
        <WelcomeContainer>
          <UserText>Olá, {userData?.name || 'Usuário'} ({userType})!</UserText>
          <BellIcon source={bellIcon} resizeMode="contain" />
        </WelcomeContainer>
      </Header>

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <Banner>
          <TextBanner>Encontre um amigo!</TextBanner>
          <AdoptButton>
            <ButtonText>Adote agora!</ButtonText>
          </AdoptButton>
        </Banner>
        
        <CategorySection>
          <CategoryTitle>Categorias</CategoryTitle>
          <CategoryRow>
            {userType.trim().toLowerCase() === 'ong' && (
              <CategoryButton onPress={() => navigation.navigate('CadastroAnimal')}>
                <CategoryImage source={categoryImg} />
                <CategoryText>Cadastrar</CategoryText>
              </CategoryButton>
            )}
            <CategoryButton onPress={() => navigation.navigate('Adotar')}>
              <CategoryImage source={categoryImg} />
              <CategoryText>Adotar</CategoryText>
            </CategoryButton>
            <CategoryButton onPress={() => navigation.navigate('AnimalList')}>
              <CategoryImage source={categoryImg} />
              <CategoryText>Explorar</CategoryText>
            </CategoryButton>
          </CategoryRow>
        </CategorySection>
      </ScrollView>

      <NavBar>
        <NavButton onPress={() => navigation.navigate('HomeScreen')}>
          <NavIcon source={homeIcon} />
          <NavText>Início</NavText>
        </NavButton>
        <NavButton onPress={() => navigation.navigate('Adotar')}>
          <NavIcon source={adoptionIcon} />
          <NavText>Adoção</NavText>
        </NavButton>
        <NavButton onPress={() => navigation.navigate('Alerta')}>
          <NavIcon source={alertIcon} />
          <NavText>Alerta</NavText>
        </NavButton>
        <NavButton onPress={() => navigation.navigate('Mensagens')}>
          <NavIcon source={messagesIcon} />
          <NavText>Mensagens</NavText>
        </NavButton>
        <NavButton onPress={() => navigation.navigate('Mais')}>
          <NavIcon source={menuIcon} />
          <NavText>Mais</NavText>
        </NavButton>
      </NavBar>
    </Container>
  );
};


// Novos componentes estilizados adicionados
const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const SearchContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  background-color: #FFF;
  border-radius: 20px;
  padding: 8px 15px;
  margin: 0 15px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 14px;
  color: #333;
`;

const ProfileButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  justify-content: center;
  align-items: center;
`;

const WelcomeContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  align-self: flex-start;
  margin-left: 20px;
`;

// Estilos existentes permanecem iguais
const Container = styled.View`
  flex: 1;
  background-color: #f8f1eb;
`;

const Header = styled.View`
  background-color: rgb(196, 28, 95);
  padding: 20px;
  padding-top: 50px;
`;

const HeaderImage = styled.Image`
  width: 40px;
  height: 40px;
`;

const ProfileImage = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

const UserText = styled.Text`
  color: white;
  font-weight: bold;
  margin-right: 10px;
  font-size: 16px;
`;

const BellIcon = styled.Image`
  width: 25px;
  height: 25px;
`;

const Banner = styled.View`
  background-color: #1e40af;
  padding: 20px;
  align-items: center;
  border-radius: 10px;
  margin: 20px;
  width: ${width - 40}px;
  align-self: center;
`;

const TextBanner = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const AdoptButton = styled.TouchableOpacity`
  background-color: #10b981;
  padding: 10px 20px;
  border-radius: 10px;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

const NavBar = styled.View`
  flex-direction: row;
  justify-content: space-around;
  background-color: #c2185b;
  padding: 15px;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const NavButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
`;

const NavIcon = styled.Image`
  width: 25px;
  height: 25px;
  margin-bottom: 5px;
`;

const NavText = styled.Text`
  color: white;
  font-weight: bold;
`;

const CategorySection = styled.View`
  padding: 20px;
`;

const CategoryTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const CategoryRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10px;
`;

const CategoryButton = styled.TouchableOpacity`
  align-items: center;
  flex: 1;
  margin: 5px;
`;

const CategoryImage = styled.Image`
  width: 50px;
  height: 50px;
`;

const CategoryText = styled.Text`
  margin-top: 5px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;

const RecommendationSection = styled.View`
  padding: 20px;
`;

const RecommendationCard = styled.View`
  flex-direction: row;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
  align-items: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const RecommendationImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  margin-right: 15px;
`;

const RecommendationTitle = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

// Estilos adicionais
const styles = {
  searchIcon: {
    marginRight: 8,
  },
};

export default HomeScreen;