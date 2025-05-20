import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const FooterNav = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      {/* Botão "Início" */}
      <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate("Home")}>
        <Image source={require("../assets/Home.png")} style={styles.footerIcon} />
        <Text style={styles.footerText}>Início</Text>
      </TouchableOpacity>

      {/* Botão "Adoção" */}
      <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate("Adocao")}>
        <Image source={require("../assets/patinha +.png")} style={styles.footerIcon} />
        <Text style={styles.footerText}>Adoção</Text>
      </TouchableOpacity>

      {/* Botão "Notificações" */}
      <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate("Notificacoes")}>
        <Image source={require("../assets/NavNotificação.png")} style={styles.footerIcon} />
        <Text style={styles.footerText}>Notificações!</Text>
      </TouchableOpacity>

      {/* Botão "Menu" */}
      <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate("Menu")}>
        <Image source={require("../assets/Menu.png")} style={styles.footerIcon} />
        <Text style={styles.footerText}>Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos comentados
const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center", 
    backgroundColor: "#F45B74", 
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    position: "absolute", 
    bottom: 15,
    left: 10,
    right: 10,
    elevation: 10, 
    zIndex: 99,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  footerItem: {
    alignItems: "center", 
  },
  footerIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 4,
    marginRight: 4,
  },
  footerText: {
    fontSize: 10,
    color: "white",
  },
});

export default FooterNav;
