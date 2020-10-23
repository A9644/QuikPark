// In App.s in a new project

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyScreen from './Screens/MyScreen';
import Services from './Screens/Services';
import LoginScreen from './Screens/LoginScreen';



import Map from './Screens/Map';
import { StyleSheet, Platform, Image, Text, View,Button } from 'react-native';



function HomeScreen({navigation}) {


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>

     <Map/>
     <Button title="more services" onPress={()=>navigation.navigate('Services')} />
      
       
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
       <Stack.Screen name="LoginScreen" component={LoginScreen}  options={{
          title:'Space for your Wheels',
           headerStyle: {
            backgroundColor: 'black',
           },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'normal',
          },
        }}/>
        <Stack.Screen name="MyScreen" component={MyScreen}  options={{
          title: 'Find Space For your Wheels',
           headerStyle: {
            backgroundColor: 'brown',
           },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{
          title: 'services',
           headerStyle: {
            backgroundColor: 'brown',
           },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        <Stack.Screen name="Services" component={Services} options={{
          title: 'Services',
           headerStyle: {
            backgroundColor: 'brown',
           },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
} 
export default App;