import React, { useState, useEffect } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput, Image,
  FlatList, Dimensions, SafeAreaView, ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import FooterNav from "../components/FooterNav";
import PataIcon from "../assets/patinha.png";
import LogoNav from "../assets/LogoNav.png";

const { width } = Dimensions.get("window");
const cardWidth = (width - 40 - 15) / 2;

const EntityListScreen = ({ screenConfig }) => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = screenConfig.apiEndpoint;
        if (searchText) {
          url += `?q=${searchText}`;
        }
        
        console.log("Buscando na URL:", url);

        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error("Falha ao buscar os dados da API.");
        }
        
        const responseData = await response.json();
        
        if (Array.isArray(responseData.data)) {
            const filteredData = responseData.data.filter(
              (item) => item.tipo === screenConfig.filterType
            );
            
            console.log(`Encontrados ${responseData.data.length} itens, filtrados para ${filteredData.length} itens do tipo ${screenConfig.filterType}.`);
            setItems(filteredData);
        } else {
            console.error("Formato de dados inválido recebido:", responseData);
            throw new Error("O formato dos dados recebidos é inválido.");
        }

      } catch (e) {
        setError(e.message);
        console.error("Erro na busca de dados:", e);
      } finally {
        setLoading(false);
      }
    };

    const handler = setTimeout(() => {
        fetchData();
    }, 500);

    return () => clearTimeout(handler);

  }, [searchText, screenConfig.apiEndpoint]);

  
  const getFirstLetter = (item) => {
    const name = item.razaoSocial || item.responsavelNome || '';
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth }]}
      onPress={() => navigation.navigate(screenConfig.navigateTo, { [screenConfig.paramName]: item })}
    >
     
      {item.imagem ? (
        <Image source={{ uri: item.imagem }} style={styles.cardImage} />
      ) : (
        <View style={styles.cardAvatar}>
          <Text style={styles.cardAvatarText}>
            {getFirstLetter(item)}
          </Text>
        </View>
      )}
      
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.razaoSocial || item.responsavelNome}</Text>
        <View style={styles.infoRow}>
          <MaterialIcons name="location-on" size={14} color="#C73578" />
          <Text style={styles.infoText} numberOfLines={1}>{item.cidade}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="pets" size={14} color="#C73578" />
          <Text style={styles.infoText}>{item.tipo}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <LinearGradient
          colors={["#EC5475", "#9C127C"]}
          style={styles.headerBar}
        >
          <Image source={LogoNav} style={styles.logoNav} />
          <View style={styles.searchBox}>
            <MaterialIcons name="search" size={20} color="#EC5475" />
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar..."
              placeholderTextColor="#EC5475"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <Image source={{ uri: "https://i.pravatar.cc/100" }} style={styles.userImage} />
        </LinearGradient>

        <View style={styles.iconContainer}>
          <View style={styles.circle}>
            <Image source={PataIcon} style={styles.iconImage} />
          </View>
          <Text style={styles.iconLabel}>{screenConfig.title}</Text>
        </View>

        {loading ? (
            <ActivityIndicator size="large" color="#C73578" style={{ flex: 1 }} />
        ) : error ? (
            <Text style={styles.errorText}>Erro: {error}</Text>
        ) : (
            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              contentContainerStyle={styles.listContainer}
              columnWrapperStyle={styles.columnWrapper}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={
                <View style={styles.headerContainer}>
                  <Text style={styles.sectionTitle}>{screenConfig.title} Disponíveis</Text>
                </View>
              }
              ListEmptyComponent={<Text style={styles.errorText}>Nenhum item encontrado.</Text>}
            />
        )}
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
    marginLeft: 10,
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
    paddingBottom: 80, 
  },
  columnWrapper: {
    justifyContent: "space-between",
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
  cardAvatar: {
    width: "100%",
    height: 100,
    backgroundColor: "#808080",
    justifyContent: "center",
    alignItems: "center",
  },
  cardAvatarText: {
    fontSize: 40, 
    color: "#FFFFFF",
    fontWeight: "bold",
    fontFamily: "ABeeZee",
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
  errorText: {
    textAlign: 'center', 
    marginTop: 50, 
    fontSize: 16,
    color: '#666'
  },
});

export default EntityListScreen;