import React, { useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;

const dicas = [
  {
    id: '1',
    imagem: require('../assets/Carrossel/pet1.jpg'),
  },
  {
    id: '2',
    imagem: require('../assets/Carrossel/pet2.jpeg'),
  },
];

const CarrosselDicas = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSharedIndex = useSharedValue(0);

  return (
    <View style={styles.section}>
      <Carousel
        width={screenWidth}
        height={200}
        data={dicas}
        autoPlay
        autoPlayInterval={3000}
        scrollAnimationDuration={1000}
        loop
        pagingEnabled
        onSnapToItem={(index) => {
          setCurrentIndex(index);
          currentSharedIndex.value = index;
        }}
        renderItem={({ item }) => (
          <View style={styles.cardDica}>
            <View style={styles.sombraContainer}>
              <Image source={item.imagem} style={styles.imagemDica} />
            </View>
            <Text style={styles.textoDica}>{item.titulo}</Text>
          </View>
        )}
      />

      {/* Indicadores animados com base no currentIndex */}
      <View style={styles.indicadores}>
        {dicas.map((_, index) => {
          const animatedStyle = useAnimatedStyle(() => {
            const isActive = currentSharedIndex.value === index;
            return {
              width: withTiming(isActive ? 20 : 10, { duration: 300 }),
              backgroundColor: isActive ? '#8D9DFA' : '#C4C4C4',
            };
          });

          return (
            <Animated.View
              key={index}
              style={[styles.bolinha, animatedStyle]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  titulo: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    marginLeft: 16,
    color: '#333',
  },
  cardDica: {
    width: screenWidth,
    alignItems: 'center',
  },
  sombraContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.45,
    shadowRadius: 4.65,
    elevation: 6,
    marginBottom: 8,
  },
  imagemDica: {
    width: screenWidth * 0.9,
    height: 160,
    borderRadius: 12,
  },
  textoDica: {
    fontSize: 14,
    color: '#444',
    width: '90%',
    textAlign: 'center',
  },
  indicadores: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 0,
  },
  bolinha: {
    height: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default CarrosselDicas;
