import React, { useState } from "react";
import { View,Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, SafeAreaView, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import FooterNav from "../components/FooterNav";

const { width } = Dimensions.get("window");

const DicasScreen = () => {
  const [activeTab, setActiveTab] = useState("Felinos");
  const navigation = useNavigation();

  const dicas = {
    Felinos: [
      "Utilize o Feliway para reduzir o estresse.",
      "Evite manipular excessivamente o animal.",
      "Realize quarentena caso haja outros pets.",
      "Introduza o novo gatinho aos poucos.",
      "Troque a alimentação gradualmente.",
    ],
    Caninos: [
      "Restrinja o espaço nos primeiros dias.",
      "Faça quarentena antes da introdução.",
      "Troque a ração gradualmente.",
      "Alimente o cão próximo aos donos.",
      "Supervisione as interações iniciais.",
    ],
  };


  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
      colors={["#E13E79", "#9C27B0"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.headerGradient}
>
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


      {/* Conteúdo */}
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Dicas</Text>
        <Image
          source={require("../assets/petconsulta.png")}
          style={styles.headerImage}
        />
        <Text style={styles.description}>
          A transição para um novo lar é um momento emocionante, mas pode ser desafiador para pets e tutores. Aqui estão algumas dicas:
        </Text>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Felinos" && styles.activeTab]}
            onPress={() => setActiveTab("Felinos")}
          >
            <Text style={styles.tabText}>Felinos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Caninos" && styles.activeTab]}
            onPress={() => setActiveTab("Caninos")}
          >
            <Text style={styles.tabText}>Caninos</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tipsList}>
          {dicas[activeTab].map((dica, index) => (
            <Text key={index} style={styles.tip}>
              {index + 1}. {dica}
            </Text>
          ))}
        </View>

        <TouchableOpacity style={styles.cuidadosButton} onPress={() => navigation.navigate("CuidadosScreen")}>
          <Text style={styles.cuidadosButtonText}>Cuidados</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer */}
      <FooterNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF7EE" },
  scroll: { paddingBottom: 100, paddingHorizontal: 16 },

  // HEADER
  headerGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 22,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    margin: -5,
  },
  
  logo: { width: 30, height: 30,  marginRight: 10, },

  searchBox: {
    flexDirection: "row",
    backgroundColor: "#FFF4EC",
    borderRadius: 20,
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

  // CONTEÚDO
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3C55D2",
    marginTop: 16,
  },
  headerImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginVertical: 12,
  },
  description: {
    fontSize: 14,
    color: "#444",
    marginBottom: 16,
  
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },


  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#fdd9e2",
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#EC5475",
  },
  tabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  tipsList: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    height: 280,
    marginBottom: 20,
    elevation: 5,
    backgroundColor: "#E7E3F9",
  },
  tip: {
    fontSize: 16,
    color: "#333",
    padding: 5,
    marginBottom: 12,   
  },
  cuidadosButton: {
    backgroundColor: "#EC5475",
    paddingVertical: 10,
    borderRadius: 25,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 10,
    width: 200,
  },
  cuidadosButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  // FOOTER
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

export default DicasScreen;