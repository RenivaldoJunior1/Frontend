import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const getResultTypeDetails = (type) => {
    switch (type) {
        case 'ONG':
            return { icon: 'hospital-o', screen: 'PerfilOng' }; 
        case 'CLINICA':
            return { icon: 'user-md', screen: 'PerfilClinica' };
        case 'PET':
            return { icon: 'paw', screen: 'PetDetails' }; 
        default:
            return { icon: 'question-circle', screen: 'Home' };
    }
};

const SearchResultsList = ({ results, isLoading }) => {
    const navigation = useNavigation();

    const renderItem = ({ item }) => {
        const { icon, screen } = getResultTypeDetails(item.resultType);
        
        return (
            <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate(screen, { id: item.id })}>
                <FontAwesome name={icon} size={24} color="#E13E79" style={styles.icon} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.razaoSocial || item.responsavelNome || item.nome}</Text>
                    <Text style={styles.subtitle}>{item.cidade || item.raca || 'Detalhe'}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#E13E79" />
            </View>
        );
    }
    
    if (results.length === 0) {
        return (
            <View style={styles.centered}>
                <Text style={styles.emptyText}>Nenhum resultado encontrado.</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={results}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        backgroundColor: '#fff',
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    icon: {
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
    },
});

export default SearchResultsList;