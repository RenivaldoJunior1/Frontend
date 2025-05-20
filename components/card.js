import React from 'react';
import { View } from 'react-native';

export const Card = ({ children, style }) => (
  <View style={[{ backgroundColor: '#fff', borderRadius: 10, padding: 10}, style]}>
    {children}
  </View>
);

export const CardContent = ({ children, style }) => (
  <View style={style}>{children}</View>
);
