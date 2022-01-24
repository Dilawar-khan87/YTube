import {View, Text} from 'react-native';
import React from 'react';
import {Appbar} from 'react-native-paper';
import Routes from './screens/Routes';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
    <>
      <Routes />
    </>
  );
}
