import { View, Text, TextInput,Button,TouchableOpacity } from 'react-native';
import React from 'react';

export default function Signup({navigation}) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [age,setAge] = React.useState('');

  function handleSubmit() {
    fetch('http:192.168.18.191:5000/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        age: age,
      }),
    }).then(Response => {
      console.log(Response);
      if(Response.status === 200){
        alert("User Created");
        navigation.navigate('SignIn');
      }else{
        console.log('error');
      }
      }).catch(error => {
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
        placeholder="Name"
        onChangeText={text => setName(text)}
        value={name}
      />
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
      <TextInput
        style={{
          borderBottomColor: '#000',
          borderBottomWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Age"
        onChangeText={text => setAge(text)}
        value={age}
      />
      <Button
        // color='red'
        title="Sign Up"
        onPress={() => {
          handleSubmit();
          // navigation.navigate('Login');
        }}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignIn');
        }}>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            // color: 'red',
            marginTop: 10,
          }}>
          already have an account? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
}
