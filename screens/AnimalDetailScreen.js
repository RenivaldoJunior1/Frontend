import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function AnimalDetailScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Animal</Text>
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
