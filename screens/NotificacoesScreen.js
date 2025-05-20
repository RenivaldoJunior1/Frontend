import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, Feather, Entypo } from "@expo/vector-icons";
import FooterNav from "../components/FooterNav";

const LogoNav = require("../assets/LogoNav.png");

export default function NotificacoesScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [notificacaoSelecionada, setNotificacaoSelecionada] = useState(null);

  const notificacoes = [
    {
      id: 1,
      titulo: "Lembrete de Interação",
      descricao: "Você ainda não curtiu nenhum artigo esta semana.",
      detalhe:
        "Você ainda não curtiu nenhum artigo esta semana. Explore nosso conteúdo e descubra dicas incríveis! 🐾",
      tempo: "Há 3 horas",
    },
    {
      id: 2,
      titulo: "Lembrete de Interação",
      descricao: "Você ainda não curtiu nenhum artigo esta semana.",
      detalhe:
        "Você ainda não curtiu nenhum artigo esta semana. Explore nosso conteúdo e descubra dicas incríveis! 🐾",
      tempo: "Há 3 horas",
    },
    {
      id: 3,
      titulo: "Lembrete de Interação",
      descricao: "Você ainda não curtiu nenhum artigo esta semana.",
      detalhe:
        "Você ainda não curtiu nenhum artigo esta semana. Explore nosso conteúdo e descubra dicas incríveis! 🐾",
      tempo: "Há 3 horas",
    },
    {
      id: 4,
      titulo: "Lembrete de Interação",
      descricao: "Você ainda não curtiu nenhum artigo esta semana.",
      detalhe:
        "Você ainda não curtiu nenhum artigo esta semana. Explore nosso conteúdo e descubra dicas incríveis! 🐾",
      tempo: "Há 3 horas",
    },
    {
      id: 5,
      titulo: "Lembrete de Interação",
      descricao: "Você ainda não curtiu nenhum artigo esta semana.",
      detalhe:
        "Você ainda não curtiu nenhum artigo esta semana. Explore nosso conteúdo e descubra dicas incríveis! 🐾",
      tempo: "Há 3 horas",
    },
  ];

  const abrirDetalhe = (notificacao) => {
    setNotificacaoSelecionada(notificacao);
    setModalVisible(true);
  };

  const fecharDetalhe = () => {
    setModalVisible(false);
    setNotificacaoSelecionada(null);
  };

  return (
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
      <View style={styles.headerInfo}>
        <Text style={styles.tituloNotificacoes}>Notificações</Text>
        <Text style={styles.subtituloNotificacoes}>
          2 notificações não lidas
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {notificacoes.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => abrirDetalhe(item)}
          >
            <Feather
              name="bell"
              size={28}
              color="#3C55D3"
              style={styles.icone}
            />
            <View style={styles.textContainer}>
              <Text style={styles.titulo}>{item.titulo}</Text>
              <Text style={styles.descricao}>{item.descricao}</Text>
            </View>
            <View style={styles.timeContainer}>
              <View style={styles.dot} />
              <Text style={styles.tempo}>{item.tempo}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={fecharDetalhe}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={fecharDetalhe} style={styles.fecharBtn}>
              <Entypo name="cross" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.modalTitulo}>
              {notificacaoSelecionada?.titulo}
            </Text>
            <Text style={styles.modalTexto}>
              {notificacaoSelecionada?.detalhe}
            </Text>
            <TouchableOpacity style={styles.btnLido} onPress={fecharDetalhe}>
              <Feather name="bookmark" size={20} color="#3C55D3" />
              <Text style={styles.btnTexto}>Marcar como lido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <FooterNav />
    </View>
  );
}

const styles = StyleSheet.create({
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
  pataContainer: {
    paddingRight: 10,
  },
  logoNav: {
    width: 30,
    height: 30,
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
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#fff",
  },
  scrollContainer: {
    padding: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0EDFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  icone: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3C55D3",
    fontFamily: "Poppins",
  },
  descricao: {
    fontSize: 14,
    color: "#3C55D3",
    fontFamily: "Poppins",
  },
  timeContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FF4D92",
    alignSelf: "flex-end",
    marginBottom: 2,
  },
  tempo: {
    fontSize: 10,
    color: "#A3A3A3",
    fontFamily: "Poppins",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#F0EDFF",
    padding: 50,
    borderRadius: 20,
    width: "85%",
    alignItems: "center",
    marginTop: 120,
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3C55D3",
    fontFamily: "Poppins",
    marginBottom: 10,
  },
  modalTexto: {
    fontSize: 14,
    textAlign: "center",
    color: "#3C55D3",
    fontFamily: "Poppins",
    marginBottom: 20,
  },
  btnLido: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 12,
    width: "100%",
    justifyContent: "center",
  },
  btnTexto: {
    marginLeft: 8,
    fontSize: 16,
    color: "#3C55D3",
    fontFamily: "Poppins",
  },
  fecharBtn: {
    position: "absolute",
    top: -46,
    right: 0,
    backgroundColor: "red",
    borderRadius: 20,
    padding: 6,
    zIndex: 10,
    elevation: 4,
  },

  headerInfo: {
    backgroundColor: "#FFF4EC",
    paddingTop: 16,
    paddingBottom: 8,
    alignItems: "center",
  },
  tituloNotificacoes: {
    fontSize: 24,
    fontWeight: "600",
    color: "#3C55D3",
    fontFamily: "Poppins",
  },
  subtituloNotificacoes: {
    fontSize: 14,
    color: "#3C55D3",
    fontFamily: "Poppins",
    marginTop: 4,
  },
});
