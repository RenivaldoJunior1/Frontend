import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import IconHome from "../assets/Home.png";
import IconAdocao from "../assets/patinha +.png";
import IconAlerta from "../assets/Flag.png";
import IconMail from "../assets/Mail.png";
import IconMenu from "../assets/Menu.png";

import PataIcon from "../assets/patinha.png";
import LogoNav from "../assets/LogoNav.png";

import FooterNav from "../components/FooterNav";

const { width } = Dimensions.get("window");
const cardWidth = (width - 40 - 15) / 2;

const ongsData = [
  {
    id: "1",
    nome: "CASA",
    imagem: require("../assets/ong1.jpg"),
    localizacao: "São Paulo, SP",
    animais: "Cães e Gatos",
    rating: 4.8,
    vagas: 5,
  },
  {
    id: "2",
    nome: "MILAU",
    imagem: require("../assets/ong2.jpg"),
    localizacao: "Rio de Janeiro, RJ",
    animais: "Gatos",
    rating: 4.5,
    vagas: 3,
  },
  {
    id: "3",
    nome: "PROJETO MIAU",
    imagem: require("../assets/ong3.jpg"),
    localizacao: "Belo Horizonte, MG",
    animais: "Gatos",
    rating: 4.9,
    vagas: 2,
  },
  {
    id: "4",
    nome: "CARAMELO",
    imagem: require("../assets/ong3.jpg"),
    localizacao: "Curitiba, PR",
    animais: "Cães",
    rating: 4.7,
    vagas: 7,
  },
  {
    id: "5",
    nome: "BIENZO",
    imagem: require("../assets/ong.png"),
    localizacao: "Porto Alegre, RS",
    animais: "Cães e Gatos",
    rating: 4.6,
    vagas: 4,
  },
  {
    id: "6",
    nome: "ANJOS PET",
    imagem: require("../assets/ong.png"),
    localizacao: "Salvador, BA",
    animais: "Cães",
    rating: 4.8,
    vagas: 6,
  },
];

const OngsScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth }]}
      onPress={() => navigation.navigate("InfoOng", { ong: item })}
    >
      <Image source={item.imagem} style={styles.cardImage} />

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.nome}</Text>

        <View style={styles.infoRow}>
          <MaterialIcons name="location-on" size={14} color="#C73578" />
          <Text style={styles.infoText} numberOfLines={1}>
            {item.localizacao}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialIcons name="pets" size={14} color="#C73578" />
          <Text style={styles.infoText}>{item.animais}</Text>
        </View>

        <View style={styles.ratingContainer}>
          <View style={styles.infoRow}>
            <MaterialIcons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>

          <View style={styles.vagasContainer}>
            <Text style={styles.vagasText}>{item.vagas} vagas</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Cabeçalho */}
        <LinearGradient
          colors={["#EC5475", "#9C127C"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.headerBar}
        >
          <View style={styles.pataContainer}>
            <Image source={LogoNav} style={styles.logoNav} />
          </View>

          <View style={styles.searchBox}>
            <MaterialIcons name="search" size={20} color="#EC5475" />
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar"
              placeholderTextColor="#EC5475"
            />
          </View>

          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            style={styles.userImage}
          />
        </LinearGradient>

        {/* Ícone ONG */}
        <View style={styles.iconContainer}>
          <View style={styles.circle}>
            <Image source={PataIcon} style={styles.iconImage} />
          </View>
          <Text style={styles.iconLabel}>ONGs</Text>
        </View>

        {/* Lista de ONGs */}
        <FlatList
          data={ongsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <Text style={styles.sectionTitle}>ONGs Disponíveis</Text>
            </View>
          }
        />

        {/* Barra de Navegação Inferior */}
        <FooterNav />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF4EC",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF4EC",
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },

  pataIcon: {
    width: 20,
    height: 20,
    tintColor: "#EC5475",
    resizeMode: "contain",
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 12,
    height: 40,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: "#EC5475",
    fontFamily: "Poppins",
  },
  logoNav: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: "contain",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#fff",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E9E6FF",
    borderWidth: 2,
    borderColor: "#6A5ACD",
    alignItems: "center",
    justifyContent: "center",
  },
  iconImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    tintColor: "#6A5ACD",
  },
  iconLabel: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "600",
    color: "#6A5ACD",
    fontFamily: "Poppins",
  },
  headerContainer: {
    width: "100%",
    paddingBottom: 15,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#C73578",
    fontFamily: "ABeeZee",
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 80, // espaço extra para a barra inferior
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#C73578",
    marginBottom: 8,
    fontFamily: "ABeeZee",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 11,
    color: "#666",
    marginLeft: 5,
    fontFamily: "Poppins",
    flexShrink: 1,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  ratingText: {
    fontSize: 11,
    color: "#FFD700",
    marginLeft: 5,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  vagasContainer: {
    backgroundColor: "#EB5375",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  vagasText: {
    fontSize: 10,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F45B74",
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
    zIndex: 99,
  },
  bottomItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  bottomLabel: {
    fontSize: 12,
    color: "#fff",
    marginTop: 4,
    fontFamily: "Poppins",
  },
  bottomIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  iconWithMenu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    
  },
  menuIcon: {
    width: 80,
    height: 20,
    resizeMode: "contain",
    marginLeft: 4,
  },
});

export default OngsScreen;
