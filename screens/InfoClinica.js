import { StatusBar } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import LogoNav from '../assets/LogoNav.png';
import cli1 from '../assets/cli1.png';
import ultrassomImg from '../assets/petultrassom.png';
import cirurgiaImg from '../assets/petcirurgia.png';
import consultaImg from '../assets/petconsulta.png';
import raioxImg from '../assets/petraiox.png';
import FooterNav from '../components/FooterNav';

export default function App() {
  const [fontsLoaded] = useFonts({
    'ABeeZee': require('../assets/fonts/Chewy-Regular.ttf'),
    'Poppins': require('../assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <LinearGradient
        colors={['#EC5475', '#9C127C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.statusBarGradient}
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

            <View style={styles.profileCircle}>
              <Image 
                source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} 
                style={styles.profileImage}
              />
            </View>
          </View>
        </LinearGradient>

        <ScrollView style={styles.mainContent}>

          <View style={styles.clinicInfo}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/350x150?text=Fachada+O+BICHO' }} 
              style={styles.clinicImage}
            />

            <View style={styles.logoAndInfoContainer}>
              <Image 
                source={cli1} 
                style={styles.clinicLogo}
              />

              <View style={styles.infoContainer}>
                <Text style={styles.clinicName}>O BICHO</Text>
                <Text style={styles.clinicSubtitle}>
                  Clínica Veterinária.{"\n"}
                  Atendimento 24 horas.{"\n"}
                  Emergências e Consultas.
                </Text>

                <View style={styles.ratingContainer}>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <FontAwesome 
                      key={item} 
                      name={item <= 4 ? "star" : "star-o"} 
                      size={20} 
                      color={item <= 4 ? "#FF5252" : "#888"} 
                      style={styles.starIcon}
                    />
                  ))}
                </View>
              </View> 
            </View>
          </View>

          <Text style={styles.sectionTitle}>SERVIÇOS</Text>

          <View style={styles.servicesContainer}>
            {[
              {name: 'ULTRASSOM', image: ultrassomImg, desc: 'Ultrassom anual e preventiva'},
              {name: 'CIRURGIA', image: cirurgiaImg, desc: 'Com veterinários especializados'},
              {name: 'CONSULTAS', image: consultaImg, desc: 'Consultas variadas'},
              {name: 'RAIO-X', image: raioxImg, desc: 'Raio-x específicos'}
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
