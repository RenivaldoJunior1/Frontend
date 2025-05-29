import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  Keyboard,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import SearchBar from '../components/SearchBar';
import SearchResultsList from '../components/SearchResultsList';
import CarrosselDicas from '../components/CarrosselDicas';
import CarrosselPets from '../components/CarrosselPets';
import FooterNav from '../components/FooterNav';

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

const categoryOptions = [
  { display: 'Todos', value: 'Todos' },
  { display: 'ONGs', value: 'ONG' },
  { display: 'Clínicas', value: 'CLINICA' }
];

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const [appliedFilters, setAppliedFilters] = useState({ city: '', category: categoryOptions[0].value });
  const [draftFilters, setDraftFilters] = useState(appliedFilters);
  const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false);

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

  const performSearch = async (query, currentAppliedFilters) => {
    const lowercasedQuery = query.toLowerCase();

    console.log('[HomeScreen performSearch] Query:', query, 'Filtros Aplicados:', currentAppliedFilters);
    setIsSearching(true);
    try {
      let url = `https://pethopeapi.onrender.com/api/users`;
      const queryParams = [];
      if (lowercasedQuery) {
        queryParams.push(`q=${lowercasedQuery}`);
      }

      if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
      }

      console.log("Buscando na URL:", url);
      const response = await fetch(url).then(safeResponseToJson);

      let apiResults = [];
      if (Array.isArray(response?.data)) {
        apiResults = response.data;
      }

      let nameFilteredResults = apiResults;
      if (lowercasedQuery) {
        nameFilteredResults = apiResults.filter(item => {
          const nomePrincipal = (item.razaoSocial || item.responsavelNome || '').toLowerCase();
          return nomePrincipal.startsWith(lowercasedQuery);
        });
      }

      const finalFilteredResults = nameFilteredResults.filter(item => {
        const cityFilter = currentAppliedFilters.city.toLowerCase();
        const cityMatch = !cityFilter
          ? true
          : (item.cidade || '').toLowerCase().includes(cityFilter);

        let categoryMatch = true;
        if (currentAppliedFilters.category && currentAppliedFilters.category !== 'Todos') {
          categoryMatch = item.tipo === currentAppliedFilters.category;
        }

        return cityMatch && categoryMatch;
      });

      console.log(
        `API: ${apiResults.length}, Nome: ${nameFilteredResults.length}, Final com Filtros: ${finalFilteredResults.length}`
      );

      const resultsWithTypes = finalFilteredResults.map(item => ({
        ...item,
        resultType: item.tipo
      }));

      setSearchResults(resultsWithTypes);

    } catch (error) {
      console.error("Erro ao realizar a busca:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    console.log('[HomeScreen useEffect] Check: searchText:', searchText, 'AppliedFilters:', appliedFilters, 'PanelVisible:', isFilterPanelVisible);
    if (!isFilterPanelVisible && (searchText || (appliedFilters.city || appliedFilters.category !== 'Todos'))) {
      console.log('[HomeScreen useEffect] Condição para buscar ATENDIDA.');
      const handler = setTimeout(() => {
        performSearch(searchText, appliedFilters);
      }, 300);
      return () => clearTimeout(handler);
    } else if (!isFilterPanelVisible) {
      console.log('[HomeScreen useEffect] Sem critério de busca ou painel aberto. Limpando resultados.');
      setSearchResults([]);
    } else {
      console.log('[HomeScreen useEffect] Painel de filtro está visível, busca principal pausada.');
    }
  }, [searchText, appliedFilters, isFilterPanelVisible]);

  const handleToggleFilterPanel = () => {
    if (!isFilterPanelVisible) {
      setDraftFilters(appliedFilters);
    }
    setIsFilterPanelVisible(!isFilterPanelVisible);
  };

  const handleDraftFilterChange = (type, value) => {
    setDraftFilters(prev => ({ ...prev, [type]: value }));
  };

  const handleApplyPanelFilters = () => {
    setAppliedFilters(draftFilters);
    setIsFilterPanelVisible(false);
    Keyboard.dismiss();
  };

  const handleClearPanelFilters = () => {
    const cleared = { city: '', category: categoryOptions[0].value };
    setDraftFilters(cleared);
    setAppliedFilters(cleared);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <HeaderContainer>
        <Image source={require('../assets/PataHome.png')} style={styles.logo} />
        <SearchBar
          searchText={searchText}
          onSearchTextChange={setSearchText}
          onFilterPress={handleToggleFilterPanel}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
          <Image source={require('../assets/profile.png')} style={styles.profileImage} />
        </TouchableOpacity>
      </HeaderContainer>

      {isFilterPanelVisible && (
        <View style={styles.filterPanelContainer}>
          <TextInput
            style={styles.filterInput}
            placeholder="Digite a cidade"
            placeholderTextColor="#999"
            value={draftFilters.city}
            onChangeText={(text) => handleDraftFilterChange('city', text)}
            onSubmitEditing={Keyboard.dismiss}
          />
          <Text style={styles.sectionTitle}>Categoria</Text>
          <View style={styles.categoryContainer}>
            {categoryOptions.map((categoryOpt) => (
              <TouchableOpacity
                key={categoryOpt.value}
                style={[
                  styles.categoryButton,
                  draftFilters.category === categoryOpt.value && styles.categoryButtonActive,
                ]}
                onPress={() => handleDraftFilterChange('category', categoryOpt.value)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.categoryButtonText,
                  draftFilters.category === categoryOpt.value && styles.categoryButtonTextActive,
                ]}>
                  {categoryOpt.display}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.clearButton]}
              onPress={handleClearPanelFilters}
              activeOpacity={0.7}
            >
              <Text style={styles.actionButtonText}>Limpar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.applyButton]}
              onPress={handleApplyPanelFilters}
              activeOpacity={0.7}
            >
              <Text style={styles.actionButtonText}>Aplicar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {(!isFilterPanelVisible && (searchText.length > 0 || appliedFilters.city || appliedFilters.category !== 'Todos')) ? (
        <SearchResultsList results={searchResults} isLoading={isSearching} />
      ) : !isFilterPanelVisible ? (
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
          <CarrosselPets filters={appliedFilters} />
          <Text style={styles.title}>Dicas e Cuidados</Text>
          <CarrosselDicas />
        </ScrollView>
      ) : null}
      <FooterNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1, 
    backgroundColor: '#f0f0f0'
  },
  logo: {
    width: 30,
    height: 30, 
    marginRight: 10
  },
  profileImage: {
    width: 40, 
    height: 40, 
    borderRadius: 10, 
    marginLeft: 10
  },
  container: {
    paddingBottom: 80, 
    paddingHorizontal: 16
  },
  title: {
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#3C55D2', 
    marginTop: 20, 
    marginBottom: 10, 
    marginLeft: 6
  },
  box: {
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center', 
    backgroundColor: 'white', 
    elevation: 2, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowOffset: { width: 0, height: 1 }, 
    shadowRadius: 2
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 10, 
    width: '100%' 
  },
  iconContainer: { 
    alignItems: 'center',
    flex: 1 
  },
  iconImage: { 
    width: 50, 
    height: 50, 
    marginBottom: 5 
  },
  iconText: { 
    fontSize: 14, 
    color: '#4b0082', 
    textAlign: 'center' 
  },

  filterPanelContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  filterInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  categoryButton: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  categoryButtonActive: {
    backgroundColor: '#E13E79',
  },
  categoryButtonText: {
    color: '#555',
    fontSize: 14,
  },
  categoryButtonTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButton: {
    backgroundColor: '#B4C400',
    marginRight: 10,
  },
  applyButton: {
    backgroundColor: '#F45B74',
    marginLeft: 10,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;