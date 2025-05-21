import React from 'react';
import { View, Text, Image, StyleSheet, Linking, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function AnimalDetailScreen() {
  const navigation = useNavigation();
  
  // Dados fictícios fixos
  const animal = {
    nome: "Bob",
    midia: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    sexo: "Macho",
    idade: 3,
    raca: "SRD",
    porte: "Médio",
    temperamento: "Dócil e brincalhão",
    necessidades: "Passeios diários",
    vacinado: true,
    abrigo: "Abrigo Amigos dos Animais",
    endereco: "Rua das Flores, 123 - São Paulo, SP"
  };

  const entrarEmContato = () => {
    const url = `https://wa.me/5511999999999?text=Olá, tenho interesse em adotar o ${animal.nome}!`;
    Linking.openURL(url).catch(err => console.error('Erro ao abrir WhatsApp:', err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: animal.midia }} style={styles.animalImage} />
        
        {/* Ícones de navegação */}
        <TouchableOpacity 
          style={[styles.iconButton, styles.backButton]} 
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.iconButton, styles.editButton]} 
          onPress={() => console.log('Editar animal')}
        >
          <Ionicons name="pencil" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.animalName}>{animal.nome}</Text>
          <View style={styles.vacinaStatus}>
            <Text style={styles.vacinaText}>Vacinado</Text>
            <View style={[styles.vacinaIndicator, animal.vacinado ? styles.vacinaTrue : styles.vacinaFalse]} />
          </View>
        </View>

        <View style={styles.infoBoxesContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.infoBoxLabel}>Sexo</Text>
            <Text style={styles.infoBoxValue}>{animal.sexo}</Text>
          </View>
          
          <View style={styles.infoBox}>
            <Text style={styles.infoBoxLabel}>Idade</Text>
            <Text style={styles.infoBoxValue}>{animal.idade} anos</Text>
          </View>
          
          <View style={styles.infoBox}>
            <Text style={styles.infoBoxLabel}>Raça</Text>
            <Text style={styles.infoBoxValue}>{animal.raca}</Text>
          </View>
        </View>

        <View style={styles.fullWidthBox}>
          <Text style={styles.fullWidthBoxLabel}>Local</Text>
          <Text style={styles.fullWidthBoxValue}>{animal.abrigo}</Text>
          <Text style={styles.fullWidthBoxSubValue}>{animal.endereco}</Text>
        </View>

        <View style={styles.fullWidthBox}>
          <Text style={styles.fullWidthBoxLabel}>Informações</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Porte:</Text>
            <Text style={styles.infoValue}>{animal.porte}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Temperamento:</Text>
            <Text style={styles.infoValue}>{animal.temperamento}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Necessidades:</Text>
            <Text style={styles.infoValue}>{animal.necessidades}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={entrarEmContato}>
          <Text style={styles.buttonText}>Entrar em Contato</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4EC',
  },
  imageContainer: {
    height: height * 0.4, 
    width: '100%',
    position: 'relative',
  },
  animalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  iconButton: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
    marginTop: 40
  },
  backButton: {
    top: 0,
    left: 0,
  },
  editButton: {
    top: 0,
    right: 0,
  },
  infoContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E6E4F8',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 10,
  },
  animalName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6E76CC',
  },
  vacinaStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  vacinaText: {
    fontSize: 14,
    marginRight: 8,
    color: '#333',
  },
  vacinaIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  vacinaTrue: {
    backgroundColor: '#31A72E',
  },
  vacinaFalse: {
    backgroundColor: '#FF5252',
  },
  infoBoxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  infoBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    width: '30%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoBoxLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  infoBoxValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  fullWidthBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 15,
  },
  fullWidthBoxLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6E76CC',
    marginBottom: 10,
  },
  fullWidthBoxValue: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  fullWidthBoxSubValue: {
    fontSize: 14,
    color: '#666',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#555',
    width: '35%',
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    width: '65%',
  },
  button: {
    backgroundColor: '#F25C84',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
    alignSelf: 'center',
    elevation: 3,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});