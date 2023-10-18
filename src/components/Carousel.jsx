import React, { useRef, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  Text,
} from "react-native";
import { colors } from "./Colors";

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const screenWidth = Dimensions.get("window").width;

  const images = [
    "https://cdn.grabon.in/gograbon/images/web-images/uploads/1658919135375/swiggy-coupons.jpg",
    "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/mfz2zorpe8in1noybhzo",
    "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/lhnwo9ezxo7mpkpvtdcy",
  ];
  const imageCount = images.length;

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const newIndex = Math.floor(contentOffset.x / screenWidth);
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const scrollTimer = setInterval(() => {
      let nextIndex = activeIndex + 1;
      if (nextIndex >= imageCount) {
        nextIndex = 0;
      }
      scrollViewRef.current.scrollTo({
        x: nextIndex * screenWidth,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(scrollTimer);
  }, [activeIndex, imageCount]);

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        ref={scrollViewRef}
        contentContainerStyle={{ width: screenWidth * imageCount }} // Ensure one image per scroll
      >
        {images.map((image, index) => (
          <View key={index} style={{ width: screenWidth }}>
            <Image source={{ uri: image }} style={styles.carouselImage} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.dotContainer}>
        {images.map((_, index) => (
          <Text
            key={index}
            style={[
              styles.dot,
              { color: index === activeIndex ? colors.white : colors.tertiary },
            ]}
          >
            •
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    width: "100%",
    height: 200,
    marginTop: 0,
    backgroundColor: colors.primary,
    padding: 10,
    paddingBottom: 0,
    paddingRight: 20,
    paddingLeft: 20,
  },
  carouselImage: {
    width: Dimensions.get("window").width - 40,
    height: "100%",
    objectFit: "cover",
    borderRadius: 10,
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
  },
  dot: {
    fontSize: 24,
    marginHorizontal: 5,
  },
});

export default Carousel;
