import {View, Text} from 'react-native';
import React from 'react';

export default function Myvideos() {
  const [videos, setVideos] = React.useState([
    {
      description: '',
      dislikes: 0,
      id: '',
      likes: 0,
      published: false,
      title: '',
      video_url: '',
      views: 0,
      user_uid: 0,
    },
  ]);
  React.useEffect(() => {
    getVideos();
  }, []);
  function getVideos() {
    fetch('http://192.168.18.191:5000/users/videos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDMxMDgyMDQsImRhdGEiOnsidXNlcklkIjozLCJuYW1lIjoiSmFjayIsImVtYWlsIjoiakBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMyIsImFnZSI6MjB9LCJpYXQiOjE2NDMwMjE4MDR9.eIVFnp3f06wele_JKgRGpAxWjRoixNr4OCmKoEYZ84A'
      }
    })
      .then(response => {
        // console.log(response);
        response
          .json().then(data => {
            setVideos(data);
            console.log(data);
          }).catch(error => {
            console.log(error);
          });
      }).catch(error => {
        console.log(error);
      });
  }
  return (
    <View>
      <Text
        style={{
          fontSize: 30,
          textAlign: 'center',
          marginTop: '20%',
        }}>
        My Videos
      </Text>
      {videos.map((video, index) => {
        return (
          <View
            key={index}
            style={{
              margin: '5%',
              borderWidth: 1,
              borderColor: '#000',
              width: '80%',
              alignSelf: 'center',
            }}>
            <Text>{video.title}</Text>
            <Text>{video.description}</Text>
            <Text>{video.video_url}</Text>
          </View>
        );
      })}
    </View>
  );
}
