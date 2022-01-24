import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import React from 'react';

export default function Signin({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit() {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    fetch('http:192.168.18.191:5000/users/login', {
      method: 'POST',
      body: formData,
    })
      .then(Response => {
        console.log(Response);
      })
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <View
      style={{
        width: '80%',
        alignSelf: 'center',
        marginTop: '40%',
      }}>
      <TextInput
        style={{
          borderBottomColor: '#000',
          borderBottomWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={{
          borderBottomColor: '#000',
          borderBottomWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        value={password}
      />

      <Button
        title="Sign In"
        color='red'
        onPress={() => {
          handleSubmit();
          // navigation.navigate('Homepage');
        }}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignUp');
        }}>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'red',
            marginTop: 10,
          }}>
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}
