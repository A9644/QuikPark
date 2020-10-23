import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Platform, Image, Text, View } from 'react-native';
import { Provider as PaperProvider ,Button} from 'react-native-paper';

function MyScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:"black" }}>
      <Text style={{fontSize:70,fontWeight:'bold',color:"lightgreen"}}> QuikPark</Text>


<Image source={{uri: 'https://st2.depositphotos.com/5464426/12107/v/950/depositphotos_121070832-stock-illustration-parking-space-sign-of-the.jpg'}}
       style={{width: 300, height: 300,borderRadius:44,opacity:0.9}} />
 
      <Button
       
       icon="map-marker-multiple" 
       mode="outlined"
       onPress={() => navigation.navigate('Home')}
       style={{backgroundColor:"white",marginTop:17}}
      >
      find Location
      </Button>
       

    </View>
  );
}
export default MyScreen;