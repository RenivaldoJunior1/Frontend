import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

export const Avatar = ({ children, style, className }) => (
  <View style={[styles.avatarContainer, style]}>{children}</View>
);

export const AvatarImage = ({ src }) => (
  <Image source={{ uri: src }} style={styles.avatarImage} />
);

const styles = StyleSheet.create({
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#ccc',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
});
