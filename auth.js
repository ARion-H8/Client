import { AsyncStorage } from 'react-native';

let token;

export const getToken = async () => {
  if (token) {
    return Promise.resolve(token);
  }

  token = await AsyncStorage.getItem('token');
  return token;
};

export const signIn = (newToken) => {
  token = newToken;
  return AsyncStorage.setItem('token', newToken);
};

export const signOut = () => {
  token = null;
  return AsyncStorage.removeItem('token');
};