import { View, Text, TextInput,Button } from 'react-native';
import React from 'react';

export default function Uploadvideo() {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [url, setUrl] = React.useState('');

    function handleSubmit() {
        fetch('http://192.168.18.191:5000/videos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDMxMDgyMDQsImRhdGEiOnsidXNlcklkIjozLCJuYW1lIjoiSmFjayIsImVtYWlsIjoiakBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMyIsImFnZSI6MjB9LCJpYXQiOjE2NDMwMjE4MDR9.eIVFnp3f06wele_JKgRGpAxWjRoixNr4OCmKoEYZ84A'
            },
            body: JSON.stringify({
                title: title,
                description: description,
                video_url: url,
                published: false,
            })
        }).then(
            response => {
                console.log(response);
            }
        ).catch(error => {
            console.log(error);
        });
    }
    
  return (
    <View style={{
        width: '80%',
        alignSelf: 'center',

    }}>
      <Text 
        style={{
            fontSize: 30,
            textAlign: 'center',
            marginTop: '10%',
            }}>
            Upload Video
        </Text>
        <TextInput
            style={{
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                marginBottom: 10,
              }}
            placeholder="Title"
            onChangeText={text => setTitle(text)}
            value={title}
            />
        <TextInput
            style={{
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                marginBottom: 10,
              }}
            placeholder="Description"
            onChangeText={text => setDescription(text)}
            value={description}
            />
        <TextInput
            style={{
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                marginBottom: 10,
              }}
            placeholder="URL"
            onChangeText={text => setUrl(text)}
            value={url}
            />
        <Button
            title="Upload"
            onPress={() => {
                handleSubmit()
                // navigation.navigate('Homepage');
            }}
            />
    </View>
  );
}