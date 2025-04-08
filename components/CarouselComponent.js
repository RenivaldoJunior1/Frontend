import React, { useState } from "react";
import { View, Dimensions, Image, Animated } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

const data = [
  { image: require("../assets/Carrossel/pet1.jpg") },
  { image: require("../assets/Carrossel/pet2.jpeg") },
];

const CarouselComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      {/* Carrossel */}
      <Carousel
        loop
        width={width * 1} 
        height={180}
        autoPlay={true}
        autoPlayInterval={3000}
        data={data}
        scrollAnimationDuration={1000}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={({ item }) => (
          <View
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 15,
              overflow: "hidden",
              
              elevation: 5,
            }}
          >
            <Image
              source={item.image}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 15,
              }}
              resizeMode="contain"
            />
          </View>
        )}
      />

      {/* Indicadores */}
      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
        {data.map((_, index) => (
          <Animated.View
            key={index}
            style={{
              width: currentIndex === index ? 20 : 10, 
              height: 5,
              borderRadius: 5,
              backgroundColor: currentIndex === index ? "#8D9DFA" : "#C4C4C4",
              marginHorizontal: 5,
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default CarouselComponent;
