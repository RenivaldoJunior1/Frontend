import React from 'react';
import { 
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CadastroScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../assets/Voltar.png')} style={styles.voltarImagem} />
      </TouchableOpacity>
      <View style={styles.header}>
        <Image source={require('../assets/Logo 1 2.png')} style={styles.logo} />
        <Text style={styles.subtitle}>Escolha o tipo de conta</Text>
      </View>
      <LinearGradient colors={['#EB5375', '#E34D76', '#D84477', '#C73578' ]} style={styles.gradient}>
        
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Cadastrar</Text>
            <Image source={require("../assets/patinha-login.png")} style={styles.pawIcon}/>
          </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Usuario')}>
              <LinearGradient colors={['#F45B74', '#F45B74']} style={styles.buttonGradient}>
                <Text style={styles.buttonText}>Usuário</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Ongs')}>
              <LinearGradient colors={['#F45B74', '#F45B74']} style={styles.buttonGradient}>
                <Text style={styles.buttonText}>ONG</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Clinica')}>
              <LinearGradient colors={['#F45B74', '#F45B74']} style={styles.buttonGradient}>
                <Text style={styles.buttonText}>Clínica</Text>
              </LinearGradient>
            </TouchableOpacity>
          
          </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: { 
    flex: 1, 
    backgroundColor: '#FFF4EC', 
    alignItems: 'center'
   },

  header: { 
    marginTop: 90, 
    alignItems: 'center', 
    marginBottom: 50 
  },

  logo: { 
    width: 300, 
    height: 150, 
    resizeMode: 'contain' 
  },

  subtitle: { 
    fontSize: 20, 
    color: '#f45b74', 
    fontWeight: 'Poppins', 
    resizeMode: 'contain',
    marginTop: -40,
  },

  gradient: { 
    flex: 1, 
    width: '100%', 
    alignItems: 'center', 
    paddingVertical: 30, 
    borderTopLeftRadius: 50, 
    borderTopRightRadius: 50,
  },

  backButton: { 
    position: 'absolute', 
    top: 20, 
    left: 20, 
    zIndex: 10, 
    marginTop: 30 
  },

  backText: { 
    fontSize: 24, 
    color: '#C73578' 
  },

  card: { 
    backgroundColor: '#E34D76', 
    width: '100%', 
    borderTopLeftRadius: 25, 
    borderTopRightRadius: 25, 
    alignItems: 'center', 
    paddingVertical: 25, 
    flex: 1 
  
  },

  title: { 
    fontSize: 40, 
    fontWeight: 'ABeeZee', 
    color: '#FFFFFF', 
    marginBottom: 15,
    marginLeft: 30,
  },

  titleContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },

  button: {
    backgroundColor: '#F45B74',
    width: '60%', 
    marginBottom: 25,
    marginTop: 25,
    borderWidth: 2,
    borderColor: '#B2BC29',
    borderRadius: 50,
    overflow: 'hidden',
    
  },

  buttonGradient: { 
    paddingVertical: 15,  
    alignItems: 'center', 
  
  },

  buttonText: { 
    color: '#ffffff', 
    fontSize: 18, 
    fontWeight: 'Poppins' 
  },

  pawIcon: {
    marginLeft: -5,
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginBottom: 80,
  },

  voltarImagem: { 
    marginTop: 25 
  },

});
