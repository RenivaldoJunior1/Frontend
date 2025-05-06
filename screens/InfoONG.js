import { StatusBar } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, ScrollView } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

// Importação de imagens
import LogoNav from '../assets/LogoNav.png';
import homeIcon from '../assets/Home.png';
import adoptionIcon from '../assets/patinha +.png';
import alertIcon from '../assets/Flag.png';
import messagesIcon from '../assets/Mail.png';
import menuIcon from '../assets/Menu.png';
import ongLogo from '../assets/cli1.png'; // Você pode trocar para o logo real da ONG depois
import resgateImg from '../assets/petultrassom.png';
import cuidadosImg from '../assets/petcirurgia.png';
import doacaoImg from '../assets/petconsulta.png';
import parceriasImg from '../assets/petraiox.png';

import FooterNav from '../components/FooterNav';

export default function InfoOng() {
  // Carregar fontes personalizadas
  const [fontsLoaded] = useFonts({
    'ABeeZee': require('../assets/fonts/Chewy-Regular.ttf'),
    'Poppins': require('../assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      {/* Gradiente do StatusBar */}
      <LinearGradient
        colors={['#EC5475', '#9C127C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.statusBarGradient}
      >
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      </LinearGradient>

      {/* Container principal */}
      <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>

        {/* Barra superior */}
        <LinearGradient
          colors={['#EC5475', '#9C127C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.topBar}
        >
          <View style={styles.topBarContent}>
            {/* Logo no topo */}
            <Image 
              source={LogoNav} 
              style={styles.logoNav} 
              resizeMode="contain"
            />

            {/* Barra de pesquisa */}
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={18} color="#F45B74" style={styles.searchIcon} />
              <TextInput 
                placeholder="Pesquisar" 
                placeholderTextColor="#F45B74"
                style={styles.searchInput}
                clearButtonMode="while-editing"
              />
            </View>

            {/* Imagem do perfil */}
            <View style={styles.profileCircle}>
              <Image 
                source={{ uri: 'https://randomuser.me/api/portraits/women/45.jpg' }}
                style={styles.profileImage}
              />
            </View>
          </View>
        </LinearGradient>

        {/* Conteúdo principal rolável */}
        <ScrollView style={styles.mainContent}>
          
          {/* Informações da ONG */}
          <View style={styles.clinicInfo}>
            {/* Imagem da fachada da ONG */}
            <Image 
              source={{ uri: 'https://via.placeholder.com/350x150?text=ONG+Esperança' }} 
              style={styles.clinicImage}
            />

            {/* Logo e informações da ONG */}
            <View style={styles.logoAndInfoContainer}>
              <Image 
                source={ongLogo} 
                style={styles.clinicLogo}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.clinicName}>ONG ESPERANÇA</Text>
                <Text style={styles.clinicSubtitle}>
                  Protegendo vidas.{"\n"}
                  Resgates, Adoções e Amor sem Limites.{"\n"}
                  Junte-se a nós!
                </Text>

                {/* Avaliação fictícia */}
                <View style={styles.ratingContainer}>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <FontAwesome 
                      key={item} 
                      name={"star"} 
                      size={20} 
                      color={"#FF5252"} 
                      style={styles.starIcon}
                    />
                  ))}
                </View>
              </View>
            </View>
          </View>

          {/* Seção de Serviços da ONG */}
          <Text style={styles.sectionTitle}>SERVIÇOS</Text>

          {/* Cards de Serviços */}
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

        {/* Menu inferior */}
        <FooterNav />
      </SafeAreaView>
    </>
  );
}

// Estilos da aplicação
const styles = StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    backgroundColor: '#f9efdb',
  },
  
  // Gradiente da StatusBar
  statusBarGradient: {
    height: StatusBar.currentHeight,
    backgroundColor: 'transparent',
  },

  // Barra Superior
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
  
  // Conteúdo da barra superior
  topBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  // Barra de pesquisa
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
  
  // Ícone de pesquisa
  searchIcon: {
    marginRight: 8,
  },
  
  // Input de pesquisa
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins',
    color: '#333',
    paddingVertical: 8,
    minHeight: 50,
  },
  
  // Círculo do perfil
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
  
  // Imagem do perfil
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  // Container principal de conteúdo
  mainContent: {
    flex: 1,
    padding: 15,
  },
  
  // Seção de informações da clínica
  clinicInfo: {
    marginBottom: 10,
    marginTop: -170,
  },
  
  // Imagem da clínica
  clinicImage: {
    width: '100%',
    height: 180,
    borderRadius: 15,
    marginBottom: 15,
  },
  
  // Container para logo e informações
  logoAndInfoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  
  // Logo da clínica
  clinicLogo: {
    width: 170,
    height: 170,
    marginTop: -35,
    borderRadius: 18,
    marginBottom: 20,
  },
  
  // Container de informações textuais
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    marginTop: -15,
  },
  
  // Nome da clínica
  clinicName: {
    fontSize: 30,
    fontFamily: 'ABeeZee',
    color: '#3C55D3',
    marginLeft: 15,
    marginBottom: 8,
    marginTop: -10,
    textTransform: 'uppercase',
  },
  
  // Subtítulo da clínica
  clinicSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#666',
    textAlign: 'left',
    lineHeight: 18,
    marginTop: 5,
    marginBottom: 10,
  },
  
  // Container de avaliação
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  
  // Título da seção de serviços
  sectionTitle: {
    fontSize: 28,
    fontFamily: 'ABeeZee',
    color: '#3C55D3',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  
  // Container dos serviços
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
  },
  
  // Card de serviço individual
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
  
  // Container da imagem do serviço
  serviceImageContainer: {
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    margin: -25,
  },
  
  // Imagem do serviço
  serviceImage: {
    width: 170,
    height: 150,
    borderRadius: 80,
  },
  
  // Nome do serviço
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
  
  // Descrição do serviço
  serviceDescriptionText: {
    fontSize: 12,
    fontFamily: 'Poppins',
    color: '#666',
    textAlign: 'left',
    marginBottom: 5,
    alignSelf: 'flex-start',
    width: '100%',
  },
  
  // Footer decorativo do card
  cardFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 10,
    backgroundColor: '#e6e6fa',
  },
  
  // Rodapé da aplicação
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

  // Ícones no rodapé
  footerIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
    tintColor: '#F9EFDB', // Remove se quiser manter as cores originais das imagens
    marginBottom: 4, // Espaço entre ícone e texto
  },
  
  // Item do rodapé
  footerItem: {
    alignItems: 'center',
  },
  
  // Texto do rodapé
  footerText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins',
    marginTop: 5,
  },
});