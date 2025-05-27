import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FooterNav from "../components/FooterNav";

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
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      try {
        const storedUser = await AsyncStorage.getItem("usuarioAtual");
        if (storedUser) {
          setUserInfo(JSON.parse(storedUser));
        } else {
          throw new Error("Nenhum usuário logado encontrado.");
        }

        const petsData = await AsyncStorage.getItem("pets");
        if (petsData) {
          setPets(JSON.parse(petsData));
        }
      } catch (error) {
        console.error("Erro ao carregar dados do AsyncStorage:", error);
        Alert.alert("Erro", "Não foi possível carregar seus dados. Por favor, faça o login novamente.");
        navigation.navigate("Login");
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  const isClinicaOuOng = () => {
    return userInfo?.tipo === "CLINICA" || userInfo?.tipo === "ONG";
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E34D76" />
        <Text>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {userInfo && (
          <View style={styles.card}>
            <View style={styles.profileRow}>
              <Image
                source={{ uri: userInfo.photo || "https://i.pravatar.cc/150" }}
                style={styles.avatarLarge}
              />
              <View style={styles.profileText}>
                <Text><Text style={styles.bold}>Nome:</Text> {userInfo.responsavelNome}</Text>
                <Text><Text style={styles.bold}>Telefone:</Text> {userInfo.telefone}</Text>
                <Text><Text style={styles.bold}>Email:</Text> {userInfo.email}</Text>
                <Text><Text style={styles.bold}>Cidade:</Text> {userInfo.cidade}</Text>
                <Text><Text style={styles.bold}>Endereço:</Text> {userInfo.logradouro}</Text>
                <Text><Text style={styles.bold}>CNPJ/CPF:</Text> {userInfo.cpfCnpj}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate("EditProfile")}
            >
              <Feather name="edit" size={16} color="#2563eb" />
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>
          </View>
        )}

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

            <View style={styles.petGrid}>
              {pets.length === 0 ? (
                <Text style={{ textAlign: "center", color: "#999" }}>
                  Nenhum pet cadastrado ainda.
                </Text>
              ) : (
                pets.map((pet, index) => (
                  <View key={index} style={styles.petCard}>
                    <Image
                      source={pet.fotoUri ? { uri: pet.fotoUri } : require("../assets/CardPet.png")}
                      style={styles.petImage}
                    />
                    <View style={styles.petContent}>
                      <Text style={styles.petName}>{pet.nome}</Text>
                      <Text style={styles.petBreed}>{pet.raca}</Text>
                      <TouchableOpacity style={styles.editPetButton}>
                        <Feather name="edit" size={16} color="#2563eb" />
                        <Text style={styles.editButtonText}>Editar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              )}
            </View>
          </>
        )}
      </ScrollView>

      <FooterNav />
    </View>
  );
};

export default PerfilClinicaPets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff0f5",
  },
  scrollContent: {
    paddingBottom: 80,
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