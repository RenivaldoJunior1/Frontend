import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import AnimalListScreen from '../screens/AnimalListScreen';
import AnimalDetailScreen from '../screens/AnimalDetailScreen';
import CadastroAnimal from '../screens/CadastroAnimal';
import Cadastro from '../screens/TelaCadastro';
import ValidacaoConta from '../screens/ValidacaoContas';
import CadastroInicial from '../screens/CadastroInicial';
import Usuariocadastro from '../screens/Usuariocadastro';
import CadastroOngsScreen from '../screens/CadastroOng';
import CadastroClinicaScreen from '../screens/CadastroClinica';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login"component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="AnimalList" component={AnimalListScreen} />
        <Stack.Screen name="AnimalDetail" component={AnimalDetailScreen} />
        <Stack.Screen name="CadastroAnimal" component={CadastroAnimal} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Validacao" component={ValidacaoConta}/>
        <Stack.Screen name="Inicial" component={CadastroInicial}/>
        <Stack.Screen name="Usuario" component={Usuariocadastro}/>
        <Stack.Screen name="Ongs" component={CadastroOngsScreen}/>
        <Stack.Screen name="Clinica" component={CadastroClinicaScreen}/>
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}
