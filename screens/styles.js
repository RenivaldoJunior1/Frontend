import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const theme = {
  colors: {
    primary: '#c41c5f',
    secondary: '#1e40af',
    accent: '#10b981',
    background: '#f8f1eb',
    white: '#ffffff',
    textPrimary: '#000000',
    textSecondary: '#008000',
  },
  spacing: {
    small: '10px',
    medium: '20px',
    large: '30px',
  },
  borderRadius: {
    small: '10px',
    medium: '20px',
  },
};

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${theme.colors.primary};
  padding: ${theme.spacing.medium};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
`;

export const HeaderImage = styled.Image`
  width: 40px;
  height: 40px;
`;

export const SearchBar = styled.TextInput`
  flex: 1;
  background-color: ${theme.colors.white};
  padding: 15px;
  border-radius: 30px;
  margin-left: 10px;
`;

export const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ProfileImage = styled.Image`
  width: 35px;
  height: 35px;
  border-radius: ${theme.borderRadius.small};
  margin-right: 10px;
`;

export const UserText = styled.Text`
  color: ${theme.colors.white};
  font-weight: bold;
  margin-right: 10px;
`;

export const Banner = styled.View`
  background-color: ${theme.colors.secondary};
  padding: ${theme.spacing.medium};
  align-items: center;
  border-radius: ${theme.borderRadius.small};
  margin: ${theme.spacing.medium};
  width: ${width - 40}px;
  align-self: center;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${theme.colors.accent};
  padding: ${theme.spacing.small} ${theme.spacing.medium};
  border-radius: ${theme.borderRadius.small};
  margin-top: 10px;
`;

export const ButtonText = styled.Text`
  color: ${theme.colors.white};
  font-weight: bold;
`;

export const NavBar = styled.View`
  flex-direction: row;
  justify-content: space-around;
  background-color: ${theme.colors.primary};
  padding: 15px;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export const NavButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
`;

export const NavText = styled.Text`
  color: ${theme.colors.white};
  font-weight: bold;
`;
