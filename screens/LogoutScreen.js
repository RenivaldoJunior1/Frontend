import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    SafeAreaView, 
    Dimensions,
    ActivityIndicator,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const { width } = Dimensions.get('window');

const LogoutScreen = ({ navigation }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true); 
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('usuarioAtual');
      await AsyncStorage.removeItem('tipoCadastro');
      
      console.log('Logout bem-sucedido: Dados locais limpos.');

      navigation.replace('Login');

    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      Alert.alert('Erro', 'Não foi possível realizar o logout. Tente novamente.');
      setIsLoggingOut(false);
    }
  };

  const handleCancel = () => {
    if (isLoggingOut) return;
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Icon name="logout-variant" size={60} color="#F45B74" style={styles.icon} />
          
          <Text style={styles.title}>Sair da Conta</Text>
          <Text style={styles.message}>
            Você tem certeza que deseja encerrar a sessão?
          </Text>

          {isLoggingOut ? (
            <ActivityIndicator size="large" color="#F45B74" style={{ marginVertical: 15 }}/>
          ) : (
            <>
              <TouchableOpacity
                style={[styles.button, styles.logoutButton]}
                onPress={handleLogout}
                activeOpacity={0.7}
                disabled={isLoggingOut}
              >
                <Text style={[styles.buttonText, styles.logoutButtonText]}>Sim, Sair</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
                activeOpacity={0.7}
                disabled={isLoggingOut}
              >
                <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancelar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LogoutScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f2f5', 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    width: width * 0.9, 
    maxWidth: 400, 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#F45B74',
  },
  logoutButtonText: {
    color: '#fff',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6c757d',
  },
  cancelButtonText: {
    color: '#495057',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});