import React, { useState, useEffect } from "react";
import { StatusBar } from 'react-native';
import { 
    StyleSheet, 
    Text, 
    View, 
    SafeAreaView, 
    Image, 
    TextInput, 
    ScrollView, 
    TouchableOpacity,
    ActivityIndicator 
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { useRoute, useNavigation } from '@react-navigation/native';

import LogoNav from '../assets/LogoNav.png';
import ultrassomImg from '../assets/petultrassom.png';
import cirurgiaImg from '../assets/petcirurgia.png';
import consultaImg from '../assets/petconsulta.png';
import raioxImg from '../assets/petraiox.png';
import FooterNav from '../components/FooterNav';

export default function InfoClinica() {
  const [fontsLoaded] = useFonts({
    'ABeeZee': require('../assets/fonts/Chewy-Regular.ttf'),
    'Poppins': require('../assets/fonts/Poppins-Regular.ttf'),
  });

  const route = useRoute();
  const navigation = useNavigation();

  console.log('[InfoClinica] route.params recebidos:', JSON.stringify(route.params, null, 2));

  const clinicaItemFromRoute = route.params?.clinica; 
  const clinicaId = clinicaItemFromRoute?.id; 

  console.log('[InfoClinica] route.params recebidos:', JSON.stringify(route.params, null, 2));
  console.log('[InfoClinica] clinicaItemFromRoute:', JSON.stringify(clinicaItemFromRoute, null, 2));
  console.log('[InfoClinica] clinicaId extraído:', clinicaId);

  const [clinicaDetails, setClinicaDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!clinicaId) {
      setError("ID da Clínica não fornecido.");
      setLoading(false);
      return;
    }
    console.log("Buscando detalhes para Clínica com ID:", clinicaId);

    const fetchClinicaDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `https://pethopeapi.onrender.com/api/v1/users/clinica/${clinicaId}`;
        console.log("URL da API chamada:", url); 
        
        const response = await fetch(url);
        
        if (!response.ok) {
          const errorData = await response.text();
          console.error("Erro da API (texto):", errorData);
          try {
            const jsonData = JSON.parse(errorData);
            throw new Error(jsonData.message || `Erro ao buscar dados da Clínica: ${response.status}`);
          } catch (parseError) {
            throw new Error(errorData || `Erro ao buscar dados da Clínica: ${response.status}`);
          }
        }
        
        const data = await response.json();
        
        if (data && data.data) {
          setClinicaDetails(data.data);
        } else {
          console.warn("Resposta da API OK, mas 'data.data' está faltando ou é inválido:", data);
          throw new Error("Formato de dados da Clínica inválido recebido da API.");
        }
      } catch (e) {
        setError(e.message);
        console.error("Erro ao buscar detalhes da Clínica:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchClinicaDetails();
  }, [clinicaId]);

  const formatCnpj = (cnpj) => {
    if (!cnpj) return '';
    const cleanCnpj = String(cnpj).replace(/\D/g, '');
    if (cleanCnpj.length === 14) {
      return cleanCnpj.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        '$1.$2.$3/$4-$5'
      );
    }
    return cleanCnpj; 
  };

  const getFirstLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  if (!fontsLoaded || loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#FFF4EC" }}>
        <ActivityIndicator size="large" color="#EC5475" />
      </View>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#FFF4EC" }}>
        <Text>Erro ao carregar dados: {error}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20, padding: 10, backgroundColor: '#EC5475', borderRadius: 5}}>
            <Text style={{color: 'white'}}>Voltar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (!clinicaDetails) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#FFF4EC" }}>
        <Text>Clínica não encontrada.</Text>
         <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20, padding: 10, backgroundColor: '#EC5475', borderRadius: 5}}>
            <Text style={{color: 'white'}}>Voltar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <>
      <LinearGradient
        colors={['#EC5475', '#9C127C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      </LinearGradient>

      <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
        <LinearGradient
          colors={['#EC5475', '#9C127C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.topBar}
        >
          <View style={styles.topBarContent}>
            <Image 
              source={LogoNav} 
              style={styles.logoNav} 
              resizeMode="contain"
            />
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={18} color="#F45B74" style={styles.searchIcon} />
              <TextInput 
                placeholder="Pesquisar" 
                placeholderTextColor="#F45B74"
                style={styles.searchInput}
                clearButtonMode="while-editing"
              />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
                <Image 
                source={{ uri: clinicaDetails.profileImageUrl || 'https://randomuser.me/api/portraits/women/44.jpg' }}
                style={styles.profileImage}
                />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <ScrollView 
          style={styles.mainContent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentContainer}
        >
          <View style={styles.clinicInfo}>
            <View style={styles.logoAndInfoContainer}>
              {clinicaDetails.logoUrl ? (
                <Image
                  source={{uri: clinicaDetails.logoUrl}}
                  style={styles.clinicLogo}
                />
              ) : (
                <View style={styles.clinicAvatar}>
                  <Text style={styles.avatarText}>
                    {getFirstLetter(clinicaDetails.razaoSocial || clinicaDetails.responsavelNome)}
                  </Text>
                </View>
              )}
              <View style={styles.infoContainer}>
                <Text style={styles.clinicName}>{clinicaDetails.razaoSocial || clinicaDetails.responsavelNome}</Text>
                <Text style={styles.clinicSubtitle}>
                  {clinicaDetails.responsavelNome && `Responsável: ${clinicaDetails.responsavelNome}.\n`}
                  {clinicaDetails.email && `Email: ${clinicaDetails.email}.\n`}
                  {clinicaDetails.cpfCnpj && `CNPJ: ${formatCnpj(clinicaDetails.cpfCnpj)}.\n`}
                  {clinicaDetails.cidade && `Cidade: ${clinicaDetails.cidade}.`}
                  {clinicaDetails.logradouro && `\nEndereço: ${clinicaDetails.logradouro}.`}
                  {clinicaDetails.telefone && `\nTelefone: ${clinicaDetails.telefone}.`}
                </Text>
                {typeof clinicaDetails.rating === 'number' && (
                    <View style={styles.ratingContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FontAwesome 
                        key={star} 
                        name={star <= Math.round(clinicaDetails.rating) ? "star" : "star-o"} 
                        size={20} 
                        color={star <= Math.round(clinicaDetails.rating) ? "#FF5252" : "#D3D3D3"}
                        style={styles.starIcon}
                        />
                    ))}
                    </View>
                )}
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>SERVIÇOS</Text>
          <View style={styles.servicesContainer}>
            {[
              { name: 'ULTRASSOM', image: ultrassomImg, desc: 'Ultrassom anual e preventiva' },
              { name: 'CIRURGIA', image: cirurgiaImg, desc: 'Com veterinários especializados' },
              { name: 'CONSULTAS', image: consultaImg, desc: 'Consultas variadas' },
              { name: 'RAIO-X', image: raioxImg, desc: 'Raio-x específicos' }
            ].map((service, index) => (
              <View key={index} style={styles.serviceCard}>
                <View style={styles.serviceImageContainer}>
                  <Image 
                    source={service.image} 
                    style={styles.serviceImage}
                  />
                </View>
                <View style={styles.serviceContent}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceDescriptionText}>{service.desc}</Text>
                </View>
                <View style={styles.cardFooter}></View>
              </View>
            ))}
          </View>
        </ScrollView>
        <FooterNav />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9efdb',
  },
  statusBarGradient: {
    height: StatusBar.currentHeight,
    backgroundColor: 'transparent',
  },
  topBar: {
    backgroundColor: '#ff8a98',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1000,
  },
  topBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchContainer: {
    height: '78%',
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins',
    color: '#333',
    paddingVertical: 8,
    minHeight: 50,
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#ff8a98',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  mainContent: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: 15,
    paddingTop: 25,
    paddingBottom: 100,
  },
  clinicInfo: {
    marginBottom: 25,
    marginTop: 10,
  },
  logoAndInfoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 0,
  },
  clinicLogo: {
    width: 120,
    height: 120,
    borderRadius: 15,
    marginRight: 15,
  },
  clinicAvatar: {
    width: 120,
    height: 120,
    borderRadius: 15,
    marginRight: 15,
    backgroundColor: '#808080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 48,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'ABeeZee',
  },
  infoContainer: {
    flex: 1,
    paddingTop: 5,
  },
  clinicName: {
    fontSize: 24,
    fontFamily: 'ABeeZee',
    color: '#3C55D3',
    marginBottom: 8,
    textTransform: 'uppercase',
    lineHeight: 28,
  },
  clinicSubtitle: {
    fontSize: 12,
    fontFamily: 'Poppins',
    color: '#666',
    textAlign: 'left',
    lineHeight: 20,
    marginBottom: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  starIcon: {
    marginRight: 2,
  },
  sectionTitle: {
    fontSize: 28,
    fontFamily: 'ABeeZee',
    color: '#3C55D3',
    textAlign: 'center',
    marginBottom: 25,
    marginTop: 15,
    textTransform: 'uppercase',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  serviceCard: {
    width: '48%',
    backgroundColor: '#E7E3F9',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
    minHeight: 220,
  },
  serviceImageContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  serviceImage: {
    width: 140,
    height: 140,
    borderRadius: 80,
  },
  serviceContent: {
    padding: 15,
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontFamily: 'ABeeZee',
    fontWeight: '600',
    color: '#458ADA',
    textAlign: 'left',
    marginBottom: 8,
  },
  serviceDescriptionText: {
    fontSize: 12,
    fontFamily: 'Poppins',
    color: '#666',
    textAlign: 'left',
    lineHeight: 16,
  },
  cardFooter: {
    height: 8,
    backgroundColor: '#e6e6fa',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F45B74',
    marginBottom: 3,
    paddingVertical: 12,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  footerItem: {
    alignItems: 'center',
  },
  footerIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
    tintColor: '#F9EFDB',
    marginBottom: 4,
  },
  footerText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins',
    marginTop: 5,
  },
});