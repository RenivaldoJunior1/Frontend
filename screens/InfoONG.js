import React, { useState, useEffect } from "react";
import { StatusBar } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { useRoute, useNavigation } from '@react-navigation/native';

import LogoNav from '../assets/LogoNav.png';
import ongLogoFallback from '../assets/cli1.png';
import resgateImg from '../assets/petultrassom.png';
import cuidadosImg from '../assets/petcirurgia.png';
import doacaoImg from '../assets/petconsulta.png';
import parceriasImg from '../assets/petraiox.png';

import FooterNav from '../components/FooterNav';

export default function InfoOng() {
  const [fontsLoaded] = useFonts({
    'ABeeZee': require('../assets/fonts/Chewy-Regular.ttf'),
    'Poppins': require('../assets/fonts/Poppins-Regular.ttf'),
  });

  const route = useRoute();
  const navigation = useNavigation();
  
  const ongItem = route.params?.ong; 
  const ongId = ongItem?.id;        

  const [ongDetails, setOngDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Tentando carregar InfoOng com ID:", ongId, "e ongItem:", ongItem); 
    
    if (!ongId) {
      setError("ID da ONG não fornecido.");
      setLoading(false);
      return;
    }

    console.log("Buscando detalhes para ONG com ID:", ongId);

    const fetchOngDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `https://pethopeapi.onrender.com/api/users/ong/${ongId}`;
        console.log("URL da API chamada AGORA É:", url); 
        
        const response = await fetch(url);
        
        if (!response.ok) {
          const errorData = await response.text();
          console.error("Erro da API (texto):", errorData);
          try {
            const jsonData = JSON.parse(errorData);
            throw new Error(jsonData.message || `Erro ao buscar dados da ONG: ${response.status}`);
          } catch (parseError) {
            throw new Error(errorData || `Erro ao buscar dados da ONG: ${response.status}`);
          }
        }
        
        const data = await response.json();
        
        if (data && data.data) {
          setOngDetails(data.data);
        } else {
          console.warn("Resposta da API OK, mas 'data.data' está faltando ou é inválido:", data);
          throw new Error("Formato de dados da ONG inválido recebido da API.");
        }
      } catch (e) {
        setError(e.message);
        console.error("Erro ao buscar detalhes da ONG:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchOngDetails();
  }, [ongId]);

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

  if (!ongDetails) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#FFF4EC" }}>
        <Text>ONG não encontrada.</Text>
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
                source={{ uri: ongDetails.profileImageUrl || 'https://randomuser.me/api/portraits/women/45.jpg' }}
                style={styles.profileImage}
                />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <ScrollView style={styles.mainContent}>
          <View style={styles.clinicInfo}>
            <Image 
              source={{ uri: ongDetails.imagemBannerUrl || 'https://via.placeholder.com/350x150?text=' + (ongDetails.razaoSocial || 'ONG') }} 
              style={styles.clinicImage}
            />
            <View style={styles.logoAndInfoContainer}>
              <Image 
                source={ongDetails.logoUrl ? { uri: ongDetails.logoUrl } : ongLogoFallback} 
                style={styles.clinicLogo}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.clinicName}>{ongDetails.razaoSocial || ongDetails.responsavelNome || 'Nome da ONG Indisponível'}</Text>
                <Text style={styles.clinicSubtitle}>
                  {ongDetails.descricao || `Protegendo vidas.\nResgates, Adoções e Amor sem Limites.\nJunte-se a nós!`}
                </Text>
                {ongDetails.rating && (
                    <View style={styles.ratingContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FontAwesome 
                        key={star} 
                        name={star <= ongDetails.rating ? "star" : "star-o"} 
                        size={20} 
                        color={"#FF5252"} 
                        style={styles.starIcon}
                        />
                    ))}
                    </View>
                )}
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>INFORMAÇÕES</Text>
          <View style={styles.detailsCard}>
            {ongDetails.telefone && <Text style={styles.detailText}><FontAwesome name="phone" size={16} color="#C73578" /> {ongDetails.telefone}</Text>}
            {ongDetails.email && <Text style={styles.detailText}><FontAwesome name="envelope" size={16} color="#C73578" /> {ongDetails.email}</Text>}
            {ongDetails.logradouro && <Text style={styles.detailText}><FontAwesome name="map-marker" size={16} color="#C73578" /> {`${ongDetails.logradouro}, ${ongDetails.cidade || ''}`}</Text>}
            {ongDetails.site && <Text style={styles.detailText}><FontAwesome name="globe" size={16} color="#C73578" /> {ongDetails.site}</Text>}
            {ongDetails.urlInstagram && <Text style={styles.detailText}><FontAwesome name="instagram" size={16} color="#C73578" /> {ongDetails.urlInstagram}</Text>}
            {ongDetails.urlFacebook && <Text style={styles.detailText}><FontAwesome name="facebook" size={16} color="#C73578" /> {ongDetails.urlFacebook}</Text>}
          </View>

          <Text style={styles.sectionTitle}>SERVIÇOS</Text>
          <View style={styles.servicesContainer}>
            {[
              {name: 'RESGATE DE ANIMAIS', image: resgateImg, desc: 'Atendimento emergencial a animais em risco.'},
              {name: 'CUIDADOS', image: cuidadosImg, desc: 'Tratamento, vacinas e reabilitação.'},
              {name: 'DOAÇÃO', image: doacaoImg, desc: 'Encaminhamento responsável para novas famílias.'},
              {name: 'PARCERIAS', image: parceriasImg, desc: 'Empresas e voluntários que apoiam nossa missão.'},
            ].map((service, index) => (
              <View key={index} style={styles.serviceCard}>
                <View style={styles.serviceImageContainer}>
                  <Image 
                    source={service.image} 
                    style={styles.serviceImage}
                  />
                </View>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDescriptionText}>{service.desc}</Text>
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
  },
  
  topBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  searchContainer: {
    height: '78%',
    width:'70%',
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
    padding: 15,
  },
  
  clinicInfo: {
    marginBottom: 10,
    marginTop: -170,
  },
  
  clinicImage: {
    width: '100%',
    height: 180,
    borderRadius: 15,
    marginBottom: 15,
  },
  
  logoAndInfoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  
  clinicLogo: {
    width: 170,
    height: 170,
    marginTop: -35,
    borderRadius: 18,
    marginBottom: 20,
  },
  
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    marginTop: -15,
  },
  
  clinicName: {
    fontSize: 30,
    fontFamily: 'ABeeZee',
    color: '#3C55D3',
    marginLeft: 15,
    marginBottom: 8,
    marginTop: -10,
    textTransform: 'uppercase',
  },
  
  clinicSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#666',
    textAlign: 'left',
    lineHeight: 18,
    marginTop: 5,
    marginBottom: 10,
  },
  
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  
  sectionTitle: {
    fontSize: 28,
    fontFamily: 'ABeeZee',
    color: '#3C55D3',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
  },
  
  serviceCard: {
    width: '48%',
    backgroundColor: '#E7E3F9',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  
  serviceImageContainer: {
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    margin: -25,
  },
  
  serviceImage: {
    width: 170,
    height: 150,
    borderRadius: 80,
  },
  
  serviceName: {
    fontSize: 18,
    fontFamily: 'ABeeZee',
    fontWeight: '600',
    color: '#458ADA',
    textAlign: 'left',
    marginBottom: 5,
    marginTop: 10,
    alignSelf: 'flex-start',
    width: '100%',
  },
  
  serviceDescriptionText: {
    fontSize: 12,
    fontFamily: 'Poppins',
    color: '#666',
    textAlign: 'left',
    marginBottom: 5,
    alignSelf: 'flex-start',
    width: '100%',
  },
  
  cardFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 10,
    backgroundColor: '#e6e6fa',
  },
  
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F45B74',
    marginBottom: 3,
    paddingVertical: 12,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginHorizontal: 5,
  },

  footerIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
    tintColor: '#F9EFDB',
    marginBottom: 4, 
  },
  
  footerItem: {
    alignItems: 'center',
  },
  
  footerText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins',
    marginTop: 5,
  },
});