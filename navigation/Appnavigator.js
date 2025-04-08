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
import EsqueceuSenhaScreen from '../screens/EsqueceuSenhaScreen';
import NovaSenhaScreen from '../screens/NovaSenhaScreen';
import CodigoValidacaoScreen from '../screens/CodigoValidacaoScreen';
import InfoClinica from '../screens/InfoClinica';
import AdocaoScreen from '../screens/AdocaoScreen';
import OngsScreen from '../screens/OngsScreen';
import ClinicaScreen from '../screens/ClinicaScreen';

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
        <Stack.Screen name="Validacao" component={ValidacaoConta}/>
        <Stack.Screen name="Inicial" component={CadastroInicial}/>
        <Stack.Screen name="Usuario" component={Usuariocadastro}/>
        <Stack.Screen name="Ongs" component={CadastroOngsScreen}/>
        <Stack.Screen name="Clinica" component={CadastroClinicaScreen}/>
        <Stack.Screen name="Perfil" component={ProfileScreen}/>
        <Stack.Screen name="EditProfile" component={EditProfileScreen}/>
        <Stack.Screen name="EsqueceuSenha" component={EsqueceuSenhaScreen}/>
        <Stack.Screen name="NovaSenha" component={NovaSenhaScreen}/>
        <Stack.Screen name="CodigoValidacao" component={CodigoValidacaoScreen}/>
        <Stack.Screen name="InfoClinica" component={InfoClinica}/>
        <Stack.Screen name="Adocao" component={AdocaoScreen}/>
        <Stack.Screen name="OngScreen" component={OngsScreen}/>
        <Stack.Screen name="ClinicaScreen" component={ClinicaScreen}/>
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}
