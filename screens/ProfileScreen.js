import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FooterNav from "../components/FooterNav";

// Componente de Header com gradiente
export const HeaderContainer = styled(LinearGradient).attrs({
  colors: ["#E13E79", "#9C27B0"],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const PerfilClinicaPets = () => {
  const navigation = useNavigation();

  // Estado para armazenar as informações do usuário
  const [userInfo, setUserInfo] = useState({
    tipo: "",
    email: "",
    telefone: "",
    cidade: "",
    nome: "",
    endereco: "",
    cnpjOuCpf: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const tipo = await AsyncStorage.getItem("tipoUsuario");
        const email = await AsyncStorage.getItem("userEmail");
        const telefone = await AsyncStorage.getItem("userTelefone");
        const cidade = await AsyncStorage.getItem("userCidade");
        const nome = await AsyncStorage.getItem("userNome");
        const endereco = await AsyncStorage.getItem("userEndereco");
        const cnpjOuCpf = await AsyncStorage.getItem("userCnpjOuCpf");

        setUserInfo({
          tipo: tipo || "",
          email: email || "",
          telefone: telefone || "",
          cidade: cidade || "",
          nome: nome || "",
          endereco: endereco || "",
          cnpjOuCpf: cnpjOuCpf || "",
        });
        
        // DEBUG: Verifique no console se o tipo está sendo recuperado corretamente
        console.log("Tipo de usuário recuperado:", tipo);
      } catch (error) {
        console.error("Erro ao recuperar dados do AsyncStorage:", error);
      }
    };

    fetchUserData();
  }, []);

  // Função mais segura para verificar o tipo de usuário
  const isClinicaOuOng = () => {
    return userInfo.tipo === "clinica" || userInfo.tipo === "ong";
  };

  return (
    <View style={styles.container}>
      {/* Header FIXO fora do ScrollView */}
      <HeaderContainer>
        <Image source={require("../assets/PataHome.png")} style={styles.logo} />
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={20} color="#E13E79" />
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
          <Image source={require("../assets/profile.png")} style={styles.profileImage} />
        </TouchableOpacity>
      </HeaderContainer>

      {/* Conteúdo rolável */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Card de informações do perfil */}
        <View style={styles.card}>
          <View style={styles.profileRow}>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
              style={styles.avatarLarge}
            />
            <View style={styles.profileText}>
              <Text><Text style={styles.bold}>Telefone:</Text> {userInfo.telefone}</Text>
              <Text><Text style={styles.bold}>Email:</Text> {userInfo.email}</Text>
              <Text><Text style={styles.bold}>Cidade:</Text> {userInfo.cidade}</Text>
              <Text><Text style={styles.bold}>Nome:</Text> {userInfo.nome}</Text>
              <Text><Text style={styles.bold}>Endereço:</Text> {userInfo.endereco}</Text>
              <Text><Text style={styles.bold}>CNPJ/CPF:</Text> {userInfo.cnpjOuCpf}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate("EditProfile")}>
            <Feather name="edit" size={16} color="#2563eb" />
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
        </View>

        {/* Área de Pets Cadastrados - APENAS para ONGs e Clínicas */}
        {isClinicaOuOng() && (
          <>
            <View style={styles.petsHeader}>
              <Text style={styles.petsTitle}>Pets Cadastrados</Text>

              <TouchableOpacity
                style={styles.cadastrarBtn}
                onPress={() => navigation.navigate("CadastroAnimal")}
              >
                <Text style={styles.cadastrarBtnText}>Cadastrar</Text>
              </TouchableOpacity>
            </View>

            {/* Grid de cards dos pets */}
            <View style={styles.petGrid}>
              {[1, 2].map((_, i) => (
                <View key={i} style={styles.petCard}>
                  <Image
                    source={i % 2 === 0 ? require("../assets/cachorro.jpeg") : require("../assets/CardPet.png")}
                    style={styles.petImage}
                  />
                  <View style={styles.petContent}>
                    <Text style={styles.petName}>{i % 2 === 0 ? "Pipoca" : "Max"}</Text>
                    <Text style={styles.petBreed}>{i % 2 === 0 ? "SRD" : "Rhodesian Ridgeback"}</Text>

                    <TouchableOpacity style={styles.editPetButton}>
                      <Feather name="edit" size={16} color="#2563eb" />
                      <Text style={styles.editButtonText}>Editar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>

      {/* FooterNav FIXO fora do ScrollView */}
      <FooterNav />
    </View>
  );
};

export default PerfilClinicaPets;

// Estilos atualizados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff0f5",
  },
  scrollContent: {
    paddingBottom: 80, // Espaço para o footer
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginLeft: 10,
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 5,
  },
  searchInput: {
    marginLeft: 8,
    fontSize: 14,
    flex: 1,
  },
  card: {
    backgroundColor: "#E9D8FD",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 12,
    marginBottom: 24,
    marginTop: 25,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 15,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 12,
  },
  profileText: {
    flex: 1,
  },
  bold: {
    fontWeight: "bold",
  },
  editButton: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  editButtonText: {
    color: "#2563eb",
    marginLeft: 4,
  },
  petsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
    marginBottom: 12,
  },
  petsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563eb",
  },
  cadastrarBtn: {
    backgroundColor: "#ec4899",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  cadastrarBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  petGrid: {
    paddingHorizontal: 12,
    gap: 12,
    marginBottom: 20,
  },
  petCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
  },
  petImage: {
    width: "100%",
    height: 120,
  },
  petContent: {
    alignItems: "center",
    padding: 8,
  },
  petName: {
    fontWeight: "bold",
    color: "#2563eb",
  },
  petBreed: {
    fontSize: 12,
    color: "#666",
  },
  editPetButton: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
  },
});