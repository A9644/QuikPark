
import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Platform, Image, Text, View } from 'react-native';
import { Provider as PaperProvider ,Button} from 'react-native-paper';

import * as Google from 'expo-google-app-auth';


export default class LoginScreen extends React.Component {


async signInWithGoogleAsync() {
  try {
    const result = await Google.logInAsync({
      androidClientId: '488920891609-t6sdenr6qruhe1qet8d3bb1e73f78hsm.apps.googleusercontent.com',
        androidStandaloneAppClientId:'488920891609-t6sdenr6qruhe1qet8d3bb1e73f78hsm.apps.googleusercontent.com',
         scopes: ['profile', 'email'],
         behaviour:'system'
      
    });
    if (result.type === 'success') {
      this.props.navigation.navigate('MyScreen')
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  }
   catch (e) {
    return { error: true };
  }
}

render(){
   return (
  
    <View style={{ flex: 1, justifyContent: 'center',backgroundColor:'black',alignItems:"center" }}>
     <Image source={{uri: 'https://images.unsplash.com/photo-1533292362155-d79af6b08b77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80'}}
       style={{width: 300, height: 410,borderRadius:12,opacity:0.8,marginBottom:112}} />
       <Text style={{color:"white",fontSize:13}}>Indore Based Parking location prototype</Text>

       <Text style={{color:"white",fontSize:43,marginBottom:53}}>QuikPark</Text>


       <Button icon="google-plus" mode="text" color="blue" onPress={this.signInWithGoogleAsync.bind(this)} style={{backgroundColor:"white",marginBottom:74}}>
    Google Login
  </Button>
  </View>
  );
}
}
 
