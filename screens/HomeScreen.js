import React, { useEffect, useState } from 'react'; // Importando hooks necessários
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando o AsyncStorage

import logoImg from '../assets/icon.png';
import profileImg from '../assets/icon.png';
import bellIcon from '../assets/icon.png';
import categoryImg from '../assets/icon.png';
import recommendationImg from '../assets/icon.png';
import homeIcon from '../assets/Home.png';
import adoptionIcon from '../assets/patinha.png';
import alertIcon from '../assets/Flag.png';
import messagesIcon from '../assets/Mail.png';
import menuIcon from '../assets/icon.png';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const [userType, setUserType] = useState(''); // Inicialize o estado com uma string vazia

  // Função para carregar o tipo de usuário armazenado no AsyncStorage
  const loadUserType = async () => {
    try {
      const storedUserType = await AsyncStorage.getItem('userType');
      console.log('Tipo de usuário armazenado:', storedUserType); // Verifique se o tipo de usuário é "ong"
      if (storedUserType) {
        setUserType(storedUserType); // Atualiza o estado com o tipo de usuário
      }
    } catch (error) {
      console.error('Erro ao carregar o tipo de usuário:', error);
    }
  };

  // Carrega o tipo de usuário quando a tela for montada
  useEffect(() => {
    loadUserType();
  }, []);

  console.log('userType:', userType); 

  return (
    <Container>
      <Header>
        <HeaderImage source={logoImg} resizeMode="contain" />
        <ProfileContainer>
          <ProfileImage source={profileImg} resizeMode="cover" />
          <UserText>Olá, Fulana!</UserText>
          <BellIcon source={bellIcon} resizeMode="contain" />
        </ProfileContainer>
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
            {/* O botão de Cadastrar só será visível se o tipo de usuário for "ong" */}
            {userType === 'ong' && (
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

        <RecommendationSection>
          <CategoryTitle>Recomendado</CategoryTitle>
          <RecommendationCard>
            <RecommendationImage source={recommendationImg} />
            <View>
              <RecommendationTitle>Benefícios de passear!</RecommendationTitle>
              <Text>Opiniões de especialistas.</Text>
            </View>
          </RecommendationCard>
          <RecommendationCard>
            <RecommendationImage source={recommendationImg} />
            <View>
              <RecommendationTitle>Entenda o comportamento!</RecommendationTitle>
              <Text>Opiniões de especialistas.</Text>
            </View>
          </RecommendationCard>
        </RecommendationSection>
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

const Container = styled.View`
  flex: 1;
  background-color: #f8f1eb;
`;

const Header = styled.View`
  background-color: rgb(196, 28, 95);
  padding: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
`;

const HeaderImage = styled.Image`
  width: 40px;
  height: 40px;
`;

const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProfileImage = styled.Image`
  width: 35px;
  height: 35px;
  border-radius: 10px;
  margin-right: 10px;
`;

const UserText = styled.Text`
  color: white;
  font-weight: bold;
  margin-right: 10px;
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

export default HomeScreen;
