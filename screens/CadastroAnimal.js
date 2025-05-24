import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function CadastroAnimalScreen() {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [temperamento, setTemperamento] = useState('');
  const [vacinacao, setVacinacao] = useState('');
  const [genero, setGenero] = useState('');
  const [idade, setIdade] = useState('');
  const [raca, setRaca] = useState('');
  const [especie, setEspecie] = useState('');
  const [descricao, setDescricao] = useState('');
  const [endereco, setEndereco] = useState('');
  const [imagens, setImagens] = useState([]);
  const [pickerAtivo, setPickerAtivo] = useState(null);

  const tiposTemperamento = ['Dócil', 'Bravo'];
  const opcoesVacinacao = ['Sim', 'Não'];
  const generos = ['Macho', 'Fêmea'];
  const idades = Array.from({ length: 10 }, (_, i) => `${i + 1} ano${i > 0 ? 's' : ''}`);
  const racas = ['Rottweiler', 'Pincher', 'SRD', 'Raçado'];
  const especies = ['Branco', 'Preto'];

  async function salvarPet() {
    if (!nome.trim()) {
      Alert.alert('Erro', 'Por favor, informe o nome do animal');
      return;
    }

    const novoPet = {
      id: Date.now().toString(),
      nome,
      temperamento,
      vacinacao,
      genero,
      idade,
      raca,
      especie,
      descricao,
      endereco,
      imagens,
    };

    try {
      const petsJson = await AsyncStorage.getItem('pets');
      const pets = petsJson ? JSON.parse(petsJson) : [];
      pets.push(novoPet);
      await AsyncStorage.setItem('pets', JSON.stringify(pets));

      Alert.alert('Sucesso', 'Animal cadastrado com sucesso!');
      console.log('Pet salvo:', novoPet);

      setNome('');
      setTemperamento('');
      setVacinacao('');
      setGenero('');
      setIdade('');
      setRaca('');
      setEspecie('');
      setDescricao('');
      setEndereco('');
      setImagens([]);
      setPickerAtivo(null);

      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o animal.');
      console.error(error);
    }
  }

  async function escolherImagem() {
    if (imagens.length >= 4) {
      Alert.alert('Limite atingido', 'Você pode adicionar no máximo 4 imagens');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagens([...imagens, resultado.assets[0].uri]);
    }
  }

  function removerImagem(index) {
    const novasImagens = [...imagens];
    novasImagens.splice(index, 1);
    setImagens(novasImagens);
  }

  function renderImagem({ item, index }) {
    return (
      <View style={styles.slide}>
        <Image source={{ uri: item }} style={styles.carouselImage} />
        <TouchableOpacity
          style={styles.removeImageButton}
          onPress={() => removerImagem(index)}
        >
          <Ionicons name="close-circle" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  }

  function renderPicker(titulo, valor, opcoes, chave) {
    return (
      <TouchableOpacity
        style={styles.pickerTrigger}
        onPress={() => setPickerAtivo(pickerAtivo === chave ? null : chave)}
      >
        <Text style={styles.pickerLabel}>{titulo}</Text>
        <View style={styles.pickerValueContainer}>
          <Text style={styles.pickerValue}>{valor || 'Selecione'}</Text>
          <MaterialIcons
            name={pickerAtivo === chave ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={20}
            color="#666"
          />
        </View>

        {pickerAtivo === chave && (
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={valor}
              onValueChange={(itemValue) => {
                switch (chave) {
                  case 'temperamento':
                    setTemperamento(itemValue);
                    break;
                  case 'vacinacao':
                    setVacinacao(itemValue);
                    break;
                  case 'genero':
                    setGenero(itemValue);
                    break;
                  case 'idade':
                    setIdade(itemValue);
                    break;
                  case 'raca':
                    setRaca(itemValue);
                    break;
                  case 'especie':
                    setEspecie(itemValue);
                    break;
                }
                setPickerAtivo(null);
              }}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {opcoes.map((opcao) => (
                <Picker.Item key={opcao} label={opcao} value={opcao} />
              ))}
            </Picker>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#3C55D2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cadastro do Animal</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageSection}>
          {imagens.length > 0 ? (
            <>
              <FlatList
                horizontal
                data={imagens}
                renderItem={renderImagem}
                keyExtractor={(_, i) => i.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.carouselContent}
              />
              <Text style={styles.imageCounter}>{imagens.length}/4 fotos</Text>
            </>
          ) : (
            <TouchableOpacity style={styles.imageContainer} onPress={escolherImagem}>
              <View style={styles.placeholderContainer}>
                <MaterialIcons name="add-a-photo" size={40} color="#aaa" />
                <Text style={styles.imageText}>Adicionar fotos</Text>
              </View>
            </TouchableOpacity>
          )}

          {imagens.length > 0 && imagens.length < 4 && (
            <TouchableOpacity style={styles.addMoreButton} onPress={escolherImagem}>
              <Text style={styles.addMoreText}>+ Adicionar mais fotos</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Nome ✏️</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Nome do animal"
          />

          <View style={styles.doublePickerRow}>
            {renderPicker('Temperamento', temperamento, tiposTemperamento, 'temperamento')}
            {renderPicker('Vacinação', vacinacao, opcoesVacinacao, 'vacinacao')}
          </View>

          <View style={styles.doublePickerRow}>
            {renderPicker('Gênero', genero, generos, 'genero')}
            {renderPicker('Idade', idade, idades, 'idade')}
          </View>

          <View style={styles.doublePickerRow}>
            {renderPicker('Raça', raca, racas, 'raca')}
            {renderPicker('Espécie', especie, especies, 'especie')}
          </View>

          <Text style={styles.label}>Abrigado em 📍</Text>
          <TextInput
            style={styles.input}
            placeholder="Endereço..."
            value={endereco}
            onChangeText={setEndereco}
          />

          <Text style={styles.label}>Informações</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Descrição..."
            value={descricao}
            onChangeText={setDescricao}
            multiline
          />

          <TouchableOpacity style={styles.button} onPress={salvarPet}>
            <Text style={styles.buttonText}>Postar!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5FF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3C55D2',
  },
  content: {
    paddingBottom: 20,
  },
  imageSection: {
    marginBottom: 15,
    alignItems: 'center',
  },
  imageContainer: {
    height: 150,
    width: width - 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderStyle: 'dashed',
  },
  placeholderContainer: {
    alignItems: 'center',
  },
  imageText: {
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
  carouselContent: {
    paddingHorizontal: 10,
  },
  slide: {
    position: 'relative',
    width: 150,
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 10,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  removeImageButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 15,
  },
  imageCounter: {
    marginTop: 8,
    color: '#666',
    fontSize: 14,
  },
  addMoreButton: {
    marginTop: 10,
  },
  addMoreText: {
    color: '#3C55D2',
    fontWeight: 'bold',
  },
  formContainer: {
    paddingHorizontal: 15,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#444',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 15,
    fontSize: 16,
  },
  doublePickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  pickerTrigger: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    width: '48%',
  },
  pickerLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  pickerValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerValue: {
    fontSize: 14,
    color: '#333',
  },
  pickerWrapper: {
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  picker: {
    height: 100,
  },
  pickerItem: {
    fontSize: 14,
    height: 100,
  },
  button: {
    backgroundColor: '#3C55D2',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
