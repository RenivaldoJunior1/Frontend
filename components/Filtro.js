import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  Keyboard,
  Alert
} from 'react-native';

const { width, height } = Dimensions.get('window');

const Filtro = ({ visible, onClose, onApply }) => {
  const [city, setCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const handleFilterApply = () => {
    Keyboard.dismiss();
    onApply({ city, selectedCategory });
    Alert.alert(
      'Filtro Aplicado',
      `Cidade: ${city || 'Não informada'}\nCategoria: ${selectedCategory}`
    );
  };

  const handleClearFilters = () => {
    setCity('');
    setSelectedCategory('Todos');
    Alert.alert('Filtros limpos', 'Todos os filtros foram resetados');
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalWrapper}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={onClose}
        />
        
        <View style={[styles.modalContent, { top: height * 0.12 }]}>
          <View style={styles.modalHandle} />
          
          <TextInput
            style={styles.modalInput}
            placeholder="Digite a cidade"
            placeholderTextColor="#999"
            value={city}
            onChangeText={setCity}
            editable={true}
            selectTextOnFocus={true}
            onSubmitEditing={Keyboard.dismiss}
          />

          <Text style={styles.sectionTitle}>Categoria</Text>
          
          <View style={styles.categoryContainer}>
            {['ONGs', 'Clínicas', 'Todos'].map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(category)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.categoryButtonTextActive,
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.clearButton]}
              onPress={handleClearFilters}
              activeOpacity={0.7}
            >
              <Text style={styles.actionButtonText}>Limpar filtros</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.actionButton, styles.applyButton]}
              onPress={handleFilterApply}
              activeOpacity={0.7}
            >
              <Text style={styles.actionButtonText}>Filtrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: width,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 30,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  categoryButton: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  categoryButtonActive: {
    backgroundColor: '#E13E79',
  },
  categoryButtonText: {
    color: '#555',
    fontSize: 14,
  },
  categoryButtonTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButton: {
    backgroundColor: '#B4C400',
    marginRight: 10,
  },
  applyButton: {
    backgroundColor: '#F45B74',
    marginLeft: 10,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Filtro;