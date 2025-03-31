import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import AnimalListScreen from '../screens/AnimalListScreen';
import AnimalDetailScreen from '../screens/AnimalDetailScreen';
import CadastroAnimal from '../screens/CadastroAnimal';
import Cadastro from '../screens/CadastroInicial';
import CadastroOng from '../screens/CadastroOng';
import CadastroUser from '../screens/Usuariocadastro';
import CadastroClinica from '../screens/CadastroClinica';


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login"component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AnimalList" component={AnimalListScreen} />
        <Stack.Screen name="AnimalDetail" component={AnimalDetailScreen} />
        <Stack.Screen name="CadastroAnimal" component={CadastroAnimal} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="CadastroOng" component={CadastroOng} />
        <Stack.Screen name="CadastroUser" component={CadastroUser} />
        <Stack.Screen name="CadastroClinica" component={CadastroClinica} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
