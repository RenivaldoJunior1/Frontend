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
        <Text style={styles.backText}>{'←'}</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Image source={require('../assets/Logo 1 2.png')} style={styles.logo} />
        <Text style={styles.subtitle}>Escolha o tipo de conta</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Cadastrar {" "} <Image source={require("../assets/patinha-login.png")} 
                style={styles.pawIcon}/>
                </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Usuario')}>
          <LinearGradient colors={['#F66B89', '#9C127C']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Usuário</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Ongs')}>
          <LinearGradient colors={['#F66B89', '#9C127C']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>ONG</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Clinica')}>
          <LinearGradient colors={['#F66B89', '#9C127C']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Clínica</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
    fontSize: 15, 
    color: '#f45b74', 
    fontWeight: 'Poppins' 
  },

  gradient: { 
    flex: 1, 
    width: '100%', 
    alignItems: 'center', 
    paddingVertical: 50, 
    borderTopLeftRadius: 25, 
    borderTopRightRadius: 25
  },

  backButton: { 
    position: 'absolute', 
    top: 50, 
    left: 20 
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
    fontSize: 30, 
    fontWeight: 'ABeeZee', 
    color: '#FFFFFF', 
    marginBottom: 12,
  },

  button: {
    backgroundColor: '#F45B74',
    width: '80%', 
    marginBottom: 20,
    marginTop: 25,
    borderWidth: 4,
    borderColor: '#B2BC29',
    borderRadius: 50,
    width: '80%'
  },

  buttonGradient: { 
    paddingVertical: 15, 
    borderRadius: 25, 
    alignItems: 'center' ,
    marginTop: 10,

  },

  buttonText: { 
    color: '#ffffff', 
    fontSize: 18, 
    fontWeight: 'Poppins' }
});
