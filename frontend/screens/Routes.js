import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from './Homepage';
import Splash from './Splash';
import SignUp from './Signup';
import SignIn from './Signin';
import Frontscreen from './Frontscreen';
import { View, Text, Button, TouchableOpacity, ScrollView } from 'react-native';

const Root = createNativeStackNavigator();

export default function Routes({navigation}) {
  return (
    <NavigationContainer>
      <Root.Navigator>
        <Root.Screen name="Youtube" component={Frontscreen} 
        options={{
          headerTintColor: 'red',
        }}
        />
        <Root.Screen name="Splash" component={Splash} />
        <Root.Screen name="SignUp" component={SignUp} />
        <Root.Screen name="SignIn" component={SignIn} />
        <Root.Screen name="Homepage" component={Homepage} 
        options={{
          headerShown: true,
          headerBackVisible: false,
          // headerTintColor: 'red',
        }}
        />
      </Root.Navigator>
    </NavigationContainer>
  );
}
