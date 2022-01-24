import {View, Text, Button, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { Card } from 'react-native-paper';
import VideoPlayer from 'react-native-video-player';


export default function Frontscreen({navigation}) {
  const [videos, setVideos] = React.useState([
    {
      description: '',
      dislikes: 0,
      id: '',
      likes: 0,
      published:false,
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
    fetch('http:192.168.18.191:5000/videos', {
      method: 'GET',
    })
    .then(response => response.json().then(data => {
      setVideos(data);
      console.log(data[0]);
    }
      
      ).catch(error => {
        console.log(error);
      })
      ).catch(error => {
      console.log(error);
    });
  }
  return (
    <View>
      <ScrollView>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Splash');
        }}>
        <Text style={{
          fontSize: 20,
          textAlign: 'right',
          color:'red',
          marginRight: '5%',
        }}>Sign Up | Sign In</Text>
      </TouchableOpacity>
      {/* <VideoPlayer
          video={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
          videoWidth={1600}
          videoHeight={900}
          thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
      /> */}
      {videos.map(video => (
        <Card key={video.views} style={{
          margin: 10,
          padding: 10,
          borderRadius: 10,
          backgroundColor: 'lightblue',
          width: '94%',
          height: '16%',
          alignSelf: 'center',


        }}>
        <VideoPlayer
          style={{  
            width: '100%',
            height: 180,
            borderRadius: 10,
            backgroundColor: 'grey',
          }}
          video={{ uri: video.video_url }}
          showDuration={true}
        />
        <Text style={{fontSize:16,fontWeight:'600'}}>Title:{video.title}</Text>        
        <Text style={{fontSize:16,fontWeight:'600'}}>Description:{video.description}</Text>
        <Text style={{fontSize:16,fontWeight:'600'}}>Views:{video.views}</Text>
        <Text style={{fontSize:16,fontWeight:'600'}}>Likes:{video.likes}</Text>
        <Text style={{fontSize:16,fontWeight:'600'}}>Dislikes:{video.dislikes}</Text>
        
        </Card>
      ))
      } 
      </ScrollView>
    </View>
  );
}
