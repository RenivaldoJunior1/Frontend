import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, SafeAreaView, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import FooterNav from "../components/FooterNav";

const { width } = Dimensions.get("window");

const cuidados = [
  {
    titulo: 'Por que é importante levar o pet a consultas veterinárias regulares?',
    texto: 'Manter o pet limpo evita doenças e melhora a qualidade de vida. Banhos regulares e escovação são essenciais.',
  },
  {
    titulo: 'Como garantir segurança e conforto ao transportar o pet?',
    texto: 'Ofereça uma alimentação balanceada e adequada para a idade, porte e necessidades do seu pet.',
  },
  {
    titulo: 'Por que é importante levar o pet a consultas veterinárias regulares?',
    texto: 'Passeios diários e brincadeiras estimulam a saúde física e mental do animal.',
  },
  {
    titulo: 'Como o enriquecimento ambiental contribui para a saúde mental do pet?',
    texto: 'Consultas regulares garantem prevenção e diagnóstico precoce de doenças.',
  },
  {
   titulo: 'Como os tapetinhos higiênicos e a caixinha de areia ajudam na rotina do pet?',
   texto: 'Consultas regulares garantem prevenção e diagnóstico precoce de doenças.',
 },
];

export default function CuidadosScreen() {
  const [aberto, setAberto] = useState(null);

  const alternar = (index) => {
    setAberto(aberto === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.container}>
   <LinearGradient
      colors={["#E13E79", "#9C27B0"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.headerGradient}>
   <Image source={require("../assets/PataHome.png")} style={styles.logo} />
   <View style={styles.searchBox}>
      <FontAwesome name="search" size={18} color="#E13E79" />
      <TextInput
         style={styles.searchInput}
         placeholder="Pesquisar"
         placeholderTextColor="#E13E79"
      />
      <TouchableOpacity>
         <Ionicons name="options-outline" size={20} color="#E13E79" />
      </TouchableOpacity>
   </View>
   <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
      <Image source={require("../assets/profile.png")} style={styles.avatar} />
   </TouchableOpacity>
   </LinearGradient>

      <Text style={styles.titulo}>Como cuidar do seu pet</Text>
      {cuidados.map((item, index) => (
        <View key={index} style={styles.card}>
          <TouchableOpacity style={styles.header} onPress={() => alternar(index)}>
            <Text style={styles.headerTexto}>{item.titulo}</Text>
            <AntDesign name={aberto === index ? 'up' : 'down'} size={20} color="#3C55D2" />
          </TouchableOpacity>
          {aberto === index && (
            <Text style={styles.texto}>{item.texto}</Text>
          )}
        </View>
      ))}

      <FooterNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

   headerGradient: {
      flexDirection: "row",
      alignItems: "center",
      padding: 22,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      margin: -5,
    },
    
     logo: { width: 30, height: 30 },

     searchBox: {
       flexDirection: "row",
       backgroundColor: "#FFF4EC",
       borderRadius: 30,
       paddingHorizontal: 10,
       alignItems: "center",
       flex: 1,
       marginHorizontal: 10,
       height: 36,
     },
     searchInput: {
       marginLeft: 8,
       color: "#E13E79",
       flex: 1,
       fontSize: 14,
     },
     avatar: { width: 36, height: 36, borderRadius: 18 },
   
  container: {
    backgroundColor: '#FFF7EE',
    padding: 4,
    flex: 1,
  },
  titulo: {
    fontSize: 24,
    color: '#3C55D2',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
    marginTop: 12,
    marginLeft: 12,
  },
  card: {
    backgroundColor: '#E7E3F9',
    borderRadius: 12,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 12,
    marginTop: 8,
    padding: 20,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTexto: {
    fontSize: 16,
    color: '#3C55D2',
    fontWeight: 'bold',
  },
  texto: {
    marginTop: 10,
    color: '#333',
    lineHeight: 20,
  },

 footer: {
   flexDirection: "row",
   justifyContent: "space-around",
   paddingVertical: 12,
   backgroundColor: "#EC5475",
   position: "absolute",
   bottom: 0,
   left: 0,
   right: 0,
   borderTopLeftRadius: 15,
   borderTopRightRadius: 15,
 },
 footerItem: {
   alignItems: "center",
 },
 footerIcon: {
   width: 24,
   height: 24,
 },
 footerText: {
   color: "#fff",
   fontSize: 10,
   marginTop: 2,
 },

});
