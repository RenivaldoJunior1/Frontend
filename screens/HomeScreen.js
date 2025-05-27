import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import SearchBar from '../components/SearchBar';
import SearchResultsList from '../components/SearchResultsList';
import CarrosselDicas from '../components/CarrosselDicas';
import CarrosselPets from '../components/CarrosselPets';
import FooterNav from '../components/FooterNav';
import Filtro from '../components/Filtro';

export const HeaderContainer = styled(LinearGradient).attrs({
  colors: ['#E13E79', '#9C27B0'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const HomeScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [filters, setFilters] = useState({ city: '', category: 'Todos' });

  const safeResponseToJson = (response) => {
    const clone = response.clone();
    return new Promise((resolve, reject) => {
      response.json()
        .then(resolve)
        .catch(() => {
          clone.text()
            .then(text => {
              console.log("Resposta não era JSON, corpo recebido:", text);
              resolve({});
            })
            .catch(reject);
        });
    });
  };

  const performSearch = async (query) => {
    const lowercasedQuery = query.toLowerCase();

    if (!lowercasedQuery) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    try {
        const url = `https://pethopeapi.onrender.com/api/users?q=${lowercasedQuery}`;
        console.log("Buscando na URL:", url);
        
        const response = await fetch(url).then(safeResponseToJson);

        let apiResults = [];
        if (Array.isArray(response?.data)) {
            apiResults = response.data;
        }

        const specificResults = apiResults.filter(item => {
            const nomePrincipal = (item.razaoSocial || item.responsavelNome || '').toLowerCase();
            return nomePrincipal.startsWith(lowercasedQuery);
        });

        console.log(`API retornou ${apiResults.length} itens. Após filtro de especificidade, restaram ${specificResults.length}.`);

        const finalResults = specificResults.map(item => ({
            ...item,
            resultType: item.tipo 
        }));
        setSearchResults(finalResults);

    } catch (error) {
        console.error("Erro ao realizar a busca:", error);
        setSearchResults([]);
    } finally {
        setIsSearching(false);
    }
  };  
  useEffect(() => {
    const handler = setTimeout(() => {
      performSearch(searchText);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setModalVisible(false);
  };

  const clearSearch = () => {
    setSearchText('');
    setSearchResults([]);
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <HeaderContainer>
        <Image source={require('../assets/PataHome.png')} style={styles.logo} />
        <SearchBar 
          searchText={searchText}
          onSearchTextChange={setSearchText}
          onFilterPress={() => setModalVisible(true)}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
          <Image source={require('../assets/profile.png')} style={styles.profileImage} />
        </TouchableOpacity>
      </HeaderContainer>

      <Filtro
        visible={modalVisible}
        onClose={() => {
            setModalVisible(false);
            clearSearch();
        }}
        onApply={(filters) => {
            handleApplyFilters(filters);
            clearSearch();
        }}
      />
      
      {searchText.length > 0 ? (
        <SearchResultsList results={searchResults} isLoading={isSearching} />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>O que você procura?</Text>
            <View style={styles.box}>
                <View style={styles.row}>
                    <TouchableOpacity 
                        style={styles.iconContainer}
                        onPress={() => navigation.navigate('OngsScreen')}
                    >
                        <Image 
                        source={require('../assets/ong.png')} 
                        style={styles.iconImage} 
                        />
                        <Text style={styles.iconText}>ONGs</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.iconContainer}
                        onPress={() => navigation.navigate('Cuidados')}
                    >
                        <Image 
                        source={require('../assets/CUIDADOS_home.png')} 
                        style={styles.iconImage} 
                        />
                        <Text style={styles.iconText}>Cuidados</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.iconContainer}
                        onPress={() => navigation.navigate('Dicas')}
                    >
                        <Image 
                        source={require('../assets/Dicas_home.png')} 
                        style={styles.iconImage} 
                        />
                        <Text style={styles.iconText}>Dicas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.iconContainer}
                        onPress={() => navigation.navigate('ClinicaScreen')}
                    >
                        <Image 
                        source={require('../assets/clinicas.png')} 
                        style={styles.iconImage} 
                        />
                        <Text style={styles.iconText}>Clínicas</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.title}>Conheça Nossos Pets</Text>
            <CarrosselPets filters={filters} />

            <Text style={styles.title}>Dicas e Cuidados</Text>
            <CarrosselDicas />
        </ScrollView>
      )}

      <FooterNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FFF7EE',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginLeft: 10,
  },
  container: {
    paddingBottom: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3C55D2',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 22,
  },
  box: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconContainer: {
    alignItems: 'center',
    width: 80,
  },
  iconImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  iconText: {
    fontSize: 14,
    color: '#4b0082',
    textAlign: 'center',
  },
});

export default HomeScreen;