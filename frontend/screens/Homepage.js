import { View, Text, Button } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Myvideos from './Myvideos';
import Uploadvideo from './Uploadvideo';
const Tab = createMaterialTopTabNavigator();

export default function Homepage({navigation}) {
  return (
    <>
    
    <Tab.Navigator>
      <Tab.Screen name="Myvideos" component={Myvideos} />
      <Tab.Screen name="Uploadvideo" component={Uploadvideo} />
    </Tab.Navigator>
    <Button title="Sign Out" onPress={() => navigation.navigate('Splash')} />
    </>
  );
}
// function Homepage({navigation}) {
//   return (
//     <View>
//       <Text style={{
//         fontSize: 30,
//         textAlign: 'center',
//         marginTop: '20%',
//       }}>homepage</Text>
//       <View style={{
//         width: '80%',
//         alignSelf: 'center',
//         marginTop: '20%',

//       }}>
//       <Button title='sign out' onPress={() => {
//         navigation.navigate('Splash');
//       }} />
//       </View>
//     </View>
//   );
// }
