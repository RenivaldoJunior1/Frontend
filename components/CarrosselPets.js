import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useNavigation } from "@react-navigation/native";

// Imagens
import Pipoca from "../assets/pet1.webp";
import Max from "../assets/cachorro.jpeg";
import Luna from "../assets/pet1.webp";
import Thor from "../assets/cachorro.jpeg";
import Nina from "../assets/cachorro.jpeg";
import HomeCardBackground from "../assets/HomeCardPet.png";
import IconHome from "../assets/Home.png";
import IconAdocao from "../assets/patinha +.png";
import IconAlerta from "../assets/Flag.png";
import IconMensagens from "../assets/Mail.png";
import IconMenu from "../assets/Menu.png";
import homeBack from "../assets/HomeCardPet.png";

const { width } = Dimensions.get("window");
const cardWidth = (width - 40 - 15) / 2;

const petsData = [
  { id: "1", nome: "Pipoca", raca: "SRD", imagem: Pipoca },
  { id: "2", nome: "Max", raca: "Rhodesian Ridgeback", imagem: Max },
  { id: "3", nome: "Luna", raca: "SRD", imagem: Luna },
  { id: "4", nome: "Thor", raca: "SRD", imagem: Thor },
  { id: "5", nome: "Nina", raca: "SRD", imagem: Nina },
];

const CarrosselPets = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <ImageBackground
      source={HomeCardBackground}
      style={styles.card}
      imageStyle={styles.cardBackgroundImage}
    >
      <Image source={item.imagem} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.nome}</Text>
      <Text style={styles.cardSubtitle}>{item.raca}</Text>
    </ImageBackground>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.carouselContainer}>
        <Carousel
          loop
          width={width}
          height={250}
          autoPlay={true}
          data={petsData}
          scrollAnimationDuration={1000}
          renderItem={renderItem} // Passa diretamente a função renderItem aqui
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF4EC",
  },
  carouselContainer: {
    marginTop: 10,
    marginBottom: 40,
  },
  patinha: {
    position: "absolute",
    top: -10,
    alignSelf: "center",
    width: 60,
    height: 60,
    zIndex: 1,
  },
  card: {
    width: cardWidth,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    overflow: "hidden",
    padding: 10,
    alignSelf: "center",
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
});

export default CarrosselPets;