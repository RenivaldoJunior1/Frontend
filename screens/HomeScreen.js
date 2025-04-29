import React from "react";
import { View, TextInput, Image, TouchableOpacity, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CarrosselDicas from '../components/CarrosselDicas';
import CarrosselPets from '../components/CarrosselPets';

export const HeaderContainer = styled(LinearGradient).attrs({
  colors: ["#E13E79", "#9C27B0"], // Gradiente só no header
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const Header = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* HEADER */}
      <HeaderContainer>
        <Image source={require("../assets/PataHome.png")} style={styles.logo} />
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={20} color="#E13E79" />
          <TextInput style={styles.searchInput} placeholder="Pesquisar" placeholderTextColor="#E13E79" />
          <TouchableOpacity>
            <Ionicons name="options-outline" size={20} color="#E13E79" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
          <Image source={require("../assets/profile.png")} style={styles.profileImage} />
        </TouchableOpacity>
      </HeaderContainer>

      {/* MAIN CONTENT */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* SEÇÃO */}
        <Text style={styles.title}>O que você procura?</Text>
        <View style={styles.box}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("OngScreen")}>
              <Image source={require("../assets/ong.png")} style={styles.iconImage} />
              <Text style={styles.iconText}>ONGs</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("CuidadosScreen")}>
              <Image source={require("../assets/CUIDADOS_home.png")} style={styles.iconImage} />
              <Text style={styles.iconText}>Cuidados</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("DicasScreen")}>
              <Image source={require("../assets/Dicas_home.png")} style={styles.iconImage} />
              <Text style={styles.iconText}>Dicas</Text> 
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("ClinicaScreen")}>
              <Image source={require("../assets/clinicas.png")} style={styles.iconImage} />
              <Text style={styles.iconText}>Clínicas</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SEÇÃO */}
        <Text style={styles.title}>Conheça Nossos Pets</Text>
        <CarrosselPets />
        <Text style={styles.title}>Dicas e Cuidados</Text>
        <CarrosselDicas />
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate("Home")}>
          <Image source={require("../assets/Home.png")} style={styles.footerIcon} />
          <Text style={styles.footerText}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate("Adocao")}>
          <Image source={require("../assets/patinha +.png")} style={styles.footerIcon} />
          <Text style={styles.footerText}>Adoção</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate("Home")}>
          <Image source={require("../assets/NavNotificação.png")} style={styles.footerIcon} />
          <Text style={styles.footerText}>Notificações!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => navigation.navigate("Menu")}
        >
          <Image source={require("../assets/Menu.png")} style={styles.footerIcon} />
          <Text style={styles.footerText}>Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#FFF7EE", 
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 5,
    fontSize: 16,
    color: "#E13E79",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginLeft: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3C55D2",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 22,
  },
  box: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  iconContainer: {
    alignItems: "center",
    width: 80,
  },
  iconImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  iconText: {
    fontSize: 14,
    color: "#4b0082",
    textAlign: "center",
  },

  // FOOTER STYLES
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#EC5475",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
  },
  footerItem: {
    alignItems: "center",
  },
  footerIcon: {
    width: 30,
    height: 30,
    marginBottom: 4,
    resizeMode: "contain", // Isso evita corte
    marginTop: 4, // Adiciona espaço extra para o topo
    marginLeft: 4,
    marginRight: 4,
  },
  footerText: {
    fontSize: 10,
    color: "white",
  },
});
