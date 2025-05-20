import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export const Button = ({ children, onPress, style, variant }) => (
  <TouchableOpacity onPress={onPress} style={[{ padding: 10, borderRadius: 5, backgroundColor: '#e91e63' }, style]}>
    {typeof children === 'string' ? <Text style={{ color: '#fff' }}>{children}</Text> : children}
  </TouchableOpacity>
);
