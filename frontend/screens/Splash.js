import {View, Text, TextInput, Button, ScrollView} from 'react-native';
import React from 'react';
import {back} from 'react-native/Libraries/Animated/Easing';
import {Card} from 'react-native-paper';

export default function Splash({navigation}) {
  const [user, setUser] = React.useState([
    {
      id: '',
      name: '',
      email: '',
      password: '',
      age: '',
    },
  ]);
  React.useEffect(() => {
    getUser();
  }, []);
  function getUser() {
    fetch('http:192.168.18.191:5000/users', {
      method: 'GET',
    })
      .then(response =>
        response
          .json()
          .then(data => {
            console.log(data[0]);
            setUser(data);
          })
          .catch(error => {
            console.log(error);
          }),
      )
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <>
      <View
        style={{
          width: '80%',
          alignSelf: 'center',
          marginTop: '20%',
          // backgroundColor:'pink'
        }}>
        <Button
          color="red"
          title="Sign In"
          onPress={() => {
            navigation.navigate('SignIn');
          }}
        />
      </View>
      <View
        style={{
          width: '80%',
          alignSelf: 'center',
          marginTop: '5%',
        }}>
        <Button
          color="red"
          title="Sign Up"
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        Registered Users
      </Text>
      <View
        style={{
          width: '80%',
          alignSelf: 'center',
          marginTop: '5%',
        }}>
        <Button
          color="green"
          title="Refresh"
          onPress={() => {
            getUser();
          }}
        />
      </View>

      <ScrollView>
        {user.map(user => (
          <Card
            key={user.name}
            style={{
              margin: 10,
              padding: 10,
              borderRadius: 10,
              backgroundColor: 'pink',
              width: '94%',
              alignSelf: 'center',
            }}>
            <Text>Username:{user.name}</Text>
            <Text>Email:{user.email}</Text>
            <Text>Password:{user.password}</Text>
            <Text>Age:{user.age}</Text>
          </Card>
        ))}
      </ScrollView>
    </>
  );
}
