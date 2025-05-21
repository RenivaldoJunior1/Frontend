import React, { useState } from "react";
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
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import HomeCardBackground from "../assets/HomeCardPet.png";
import { ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";

import LogoNav from "../assets/LogoNav.png";
import Pipoca from "../assets/CardPet.png";
import Max from "../assets/CardPet.png";
import Luna from "../assets/CardPet.png";
import Thor from "../assets/CardPet.png";
import Nina from "../assets/CardPet.png";
import FooterNav from "../components/FooterNav";

const { width } = Dimensions.get("window");
const cardWidth = (width - 40 - 15) / 2;

const petsData = [
  { id: "1", nome: "Pipoca", raca: "SRD", imagem: Pipoca },
  { id: "2", nome: "Max", raca: "Rhodesian Ridgeback", imagem: Max },
  { id: "3", nome: "Luna", raca: "SRD", imagem: Luna },
  { id: "4", nome: "Thor", raca: "SRD", imagem: Thor },
  { id: "5", nome: "Nina", raca: "SRD", imagem: Nina },
];

const AdocaoScreen = () => {
  const [fontsLoaded] = useFonts({
    "Chewy-Regular": require("../assets/fonts/Chewy-Regular.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });

  const navigation = useNavigation();

  const [searchText, setSearchText] = useState("");
  const [filteredPets, setFilteredPets] = useState(petsData);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = petsData.filter((pet) =>
      pet.nome.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPets(filtered);
  };

  const handleFilter = () => {
    const filtered = petsData.filter((pet) => pet.raca === "SRD");
    setFilteredPets(filtered);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("AnimalDetail", { pet: item })}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={HomeCardBackground}
        style={styles.card}
        imageStyle={styles.cardBackgroundImage}
      >
        <Image source={item.imagem} style={styles.cardImage} />
        <Text style={styles.cardTitle}>{item.nome}</Text>
        <Text style={styles.cardSubtitle}>{item.raca}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#EC5475", "#9C127C"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerBar}
      >
        <Image source={LogoNav} style={styles.logoNav} />
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color="#EC5475" />
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar"
            placeholderTextColor="#EC5475"
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>
        <Image
          source={{ uri: "https://i.pravatar.cc/100" }}
          style={styles.userImage}
        />
      </LinearGradient>

      <FlatList
        data={filteredPets}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContainer}
      />
      <FooterNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
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
  },
  pataIcon: {
    width: 28,
    height: 28,
    marginRight: 10,
    resizeMode: "contain",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 12,
    alignItems: "center",
    height: 40,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: "#EC5475",
  },
  userImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: 10,
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  card: {
    width: cardWidth,
    height: 200,
    marginBottom: 15,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    overflow: "hidden",
    padding: 10,
  },
  cardBackgroundImage: {
    borderRadius: 20,
    resizeMode: "contain",
    width: "113%",
    height: "120%",
  },
  cardImage: {
    width: "85%",
    height: "50%",
    marginBottom: 6,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontFamily: "Chewy-Regular", 
    color: "#3C55D2",
    marginTop: 6,
  },
  cardSubtitle: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#3C55D2",
    marginBottom: 8,
  },
  bottomLabel: {
    fontSize: 12,
    color: "#fff",
    marginTop: 4,
    fontFamily: "Poppins",
  },
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
    height: 24,
    marginBottom: 2,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#fff",
  },
  logoNav: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: "contain",
  },
  footerText: {
    fontSize: 10,
    color: "white",
  },
});

export default AdocaoScreen;
