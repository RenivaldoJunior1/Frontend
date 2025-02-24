import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import logoImg from '../assets/snack-icon.png';
import profileImg from '../assets/snack-icon.png';
import bellIcon from '../assets/snack-icon.png';
import categoryImg from '../assets/snack-icon.png';
import recommendationImg from '../assets/snack-icon.png';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();  


  return (
    <Container>
      <Header>
        <HeaderImage source={logoImg} />
        <SearchBar placeholder="O que está procurando..." />
        <ProfileContainer>
          <ProfileImage source={profileImg} />
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Olá, Fulana!</Text>
          <BellIcon source={bellIcon} />
        </ProfileContainer>
      </Header>

      <Banner>
        <TextBanner>Encontre um amigo!</TextBanner>
        <AdoptButton>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Adote agora!</Text>
        </AdoptButton>
      </Banner>

      <ScrollView>
        <CategorySection>
          <CategoryTitle>Categorias</CategoryTitle>
          <CategoryRow>
            <CategoryButton onPress={() => navigation.navigate('CadastroAnimal')}> {/* Navegação ao clicar */}
              <CategoryImage source={categoryImg} />
              <CategoryText>Cadastrar</CategoryText>
            </CategoryButton>
            <CategoryButton onPress={() => navigation.navigate('')}>
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
              <Text style={{ fontWeight: 'bold', color: '#008000' }}>Benefícios de passear!</Text>
              <Text>Opiniões de especialistas.</Text>
            </View>
          </RecommendationCard>

          <RecommendationCard>
            <RecommendationImage source={recommendationImg} />
            <View>
              <Text style={{ fontWeight: 'bold', color: '#008000' }}>Entenda o comportamento!</Text>
              <Text>Opiniões de especialistas.</Text>
            </View>
          </RecommendationCard>
        </RecommendationSection>
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #f8f1eb;
`;

const Header = styled.View`
  background-color: #c2185b;
  padding: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HeaderImage = styled.Image`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const SearchBar = styled.TextInput`
  background-color: white;
  width: 70%;
  padding: 10px;
  border-radius: 20px;
  margin-bottom: 10px;
  margin-top: 20px;
`;

const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
`;

const ProfileImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
`;

const BellIcon = styled.Image`
  width: 30px;
  height: 30px;
  margin-left: 30px;
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
`;

const CategoryButton = styled.TouchableOpacity`
  align-items: center;
  flex: 1;
`;

const CategoryImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

const CategoryText = styled.Text`
  margin-top: 5px;
`;

const RecommendationSection = styled.View`
  padding: 20px;
`;

const RecommendationCard = styled.View`
  flex-direction: row;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  align-items: center;
  width: ${width - 40}px;
  align-self: center;
`;

const RecommendationImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  margin-right: 10px;
`;

export default HomeScreen;
