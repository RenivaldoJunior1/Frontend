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

const { width } = Dimensions.get("window");
const cardWidth = (width - 40 - 15) / 2;

const clinicasData = [
  {
    id: "1",
    nome: "Clínica Bem Estar",
    imagem: require("../assets/clinica1.jpg"),
    localizacao: "São Paulo, SP",
    animais: "Cães e Gatos",
    rating: 4.8,
    vagas: 2,
  },
  {
    id: "2",
    nome: "PetCare RJ",
    imagem: require("../assets/clinica2.png"),
    localizacao: "Rio de Janeiro, RJ",
    animais: "Cães",
    rating: 4.6,
    vagas: 3,
  },
  {
    id: "3",
    nome: "AmigoPet",
    imagem: require("../assets/clinica3.png"),
    localizacao: "Curitiba, PR",
    animais: "Gatos",
    rating: 4.7,
    vagas: 1,
  },
];

const ClinicaScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth }]}
      onPress={() => navigation.navigate("ClinicaDetail", { clinica: item })}
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

        <View style={styles.iconContainer}>
          <View style={styles.circle}>
            <Image source={PataIcon} style={styles.iconImage} />
          </View>
          <Text style={styles.iconLabel}>Clínicas</Text>
        </View>

        <FlatList
          data={clinicasData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <Text style={styles.sectionTitle}>Clínicas Veterinárias</Text>
            </View>
          }
        />

        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.bottomItem}
            onPress={() => navigation.navigate("Home")}
          >
            <Image source={IconHome} style={styles.bottomIcon} />
            <Text style={styles.bottomLabel}>Início</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomItem}
            onPress={() => navigation.navigate("Adocao")}
          >
            <Image source={IconAdocao} style={styles.bottomIcon} />
            <Text style={styles.bottomLabel}>Adoção</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomItem}
            onPress={() => navigation.navigate("Alerta")}
          >
            <Image source={IconAlerta} style={styles.bottomIcon} />
            <Text style={styles.bottomLabel}>Alerta!</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomItem}
            onPress={() => navigation.navigate("Mensagens")}
          >
            <Image source={IconMail} style={styles.bottomIcon} />
            <Text style={styles.bottomLabel}>Mensagens</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomItem}
            onPress={() => navigation.navigate("Menu")}
          >
            <Image source={IconMenu} style={styles.bottomIcon} />
            <Text style={styles.bottomLabel}>Menu</Text>
          </TouchableOpacity>
        </View>
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
    width: 70,
    height: 70,
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
    paddingBottom: 80,
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 30,
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
    marginTop: 25,
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
});

export default ClinicaScreen;
