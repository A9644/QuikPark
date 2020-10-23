import React from 'react';
import { StyleSheet, Text, View,ScrollView,Dimensions,Button,TouchableOpacity,FlatList,TouchableWithoutFeedback,TextInput} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import MapView from 'react-native-maps';
import Modal from 'react-native-modal';
import Dropdown from 'react-native-modal-dropdown';
import * as theme from '../theme';

const parkingsSpots = [
    {
      id: 1,
      title: 'RajwadaChowk',
      price: 5,
      rating: 4.4,
      spots: 20,
      free: 10,
      coordinate: {
      latitude: 22.7185,
      longitude:  75.8547,
      distance : 2.5,
    },
   distance : 5.0,
    description: `Situated At the Heart of City
multi-vehicle parking faciltiy available
Secure with CCTV`,
},
    {
      id: 2,
      title: 'NehruStadium',
      price: 7,
      rating: 3.8,
      spots: 25,
      free: 20,
      coordinate: {
      latitude:22.7074,
      longitude: 75.8816,
      distance : 2.5,
    
    },
    distance : 3.5,
    description: `Good Parking lot with multi-space at cheap price are availale`,


    },
    {
      id: 3,
      title: 'dusheraMaidan',
      price: 10,
      rating: 4.9,
      spots: 50,
      free: 25,
      coordinate: {
      latitude: 22.6951,
      longitude: 75.8400,
      distance : 2.5,
    
    },
    distance : 0.5,
    description: `Huge Parking Space Area of Indore night services are also availale,secured with
    CCTV`,


    },
    {
      id: 4,
      title: 'Bhawarkua',
      price: 50,
      rating: 4.9,
      spots: 100,
      free: 24,
      coordinate: {
      latitude: 22.7571,
      longitude: 75.8822,
       
    },
    distance : 2,
    description: `park your wheels here at cheap rates`,


    },
     {
      id: 5,
      title: 'Gandhihal',
      price: 90,
      rating: 4,
      spots: 50,
      free: 24,
      coordinate: {
      latitude: 22.7203,
      longitude: 75.8669,
    },
    distance : 6.5,
    description: `Parking available at cheaper Price only for cars
Secure with CTV`,


    },
     {
      id: 6,
      title: 'Lalbagh',
      price: 39,
      rating: 4.4,
      spots:83,
      free: 24,
      coordinate: {
      latitude: 22.7001,
      longitude:75.8471,
    },
    distance : 6.5,
    description: `Parking lots are available with Large Space 
Secure with CCTV`,


    },
     {
      id: 7,
      title: 'Railway Station',
      price: 90,
      rating: 4,
      spots: 35,
      free: 24,
      coordinate: {
      latitude: 22.7171,
      longitude: 75.8683,
    },
    distance : 4,
    description: `Park your wheels here near Main Railway Station of Indore
Secure with CCTV`,

}
    
  ];


const {height , width} = Dimensions.get('screen');
const {Marker} = MapView;
export default class Map extends React.Component {
  state={
    location:null
  }
 state = {
    hours: {},
    active : null,
    activeModal : null
  }
  componentDidMount(){
    this._getLocationAsync();

  }


  UNSAFE_componentWillMount() {
    const hours = {};
    const {ParkingsSpots}=this.props;

    parkingsSpots.map(parking => {hours[parking.id] = 1});

    this.setState({ hours });
  }
   handleHours = (id, value) => {
    const { hours } = this.state;
    hours[id] = value;

    this.setState({ hours });
  };

  //function to fetch userlocationa 

  _getLocationAsync= async ()=>{
    let {status}=await Permissions.askAsync(Permissions.LOCATION);//taking permission from user
    if(status=="granted")
    {
      let location= await Location.getCurrentPositionAsync({});
      this.setState({location})

    }
    else{
      alert("allow permission first")
    }
    

  }

//header
 renderHeader(){
      return(
        <View style={styles.header}>
          <View style={{ flex: 1, justifyContent: 'center',marginTop:44}}>
            <Text style={styles.headerTitle}>Currently available in</Text>
            <Text style={styles.headerLocation}>Indore,Madhypradesh</Text>
            
          </View>
            

          </View>



      )
   } 

    render(){
    return (
      <View style={styles.container}>
     {this.renderHeader()}
   
        
       
        {
          this.state.location
          ?

          <MapView style={styles.map}
            followsUserLocation={true}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
       initialRegion={{
                latitude: this.state.location.coords.latitude,
                longitude: this.state.location.coords.longitude,
                latitudeDelta: 0.443,
                longitudeDelta: 0.435,
            }}
              
        > 

       {parkingsSpots.map(parking =>
            <Marker 
              key={`marker-${parking.id}`}
              coordinate={parking.coordinate}>
                <TouchableWithoutFeedback onPress={() => this.setState({ active: parking.id })} >
                  <View style={[
                    styles.marker,
                    styles.shadow,
                    this.state.active === parking.id ? styles.active : null
                  ]}>
                    <Text style={styles.markerPrice}>${parking.price}</Text>
                    <Text style={styles.markerStatus}> ({parking.free}/{parking.spots})</Text>
                  </View>
                </TouchableWithoutFeedback>
            </Marker>
           )} 
          
        </MapView>

        :
       <Text>Please Wait...</Text>
        }
       
         {this.renderModal()}
        {this.renderParkings()}

      </View>
   );
}

   //parking data and parkinggs function
  renderParking(item){
    const { hours } = this.state;
    const totalPrice = item.price * hours[item.id];
      return(
            <TouchableWithoutFeedback key={`parking-${item.id}`} onPress={() => this.setState({ active: item.id })} >
          <View style={[styles.parking, styles.shadow]}>
            <View style={styles.hours}>
              <Text style={theme.SIZES.font}>x {item.spots} {item.title}</Text>
              <View style={{width : 100, borderRadius : 6, borderColor : theme.COLORS.gray, borderWidth : 0.7, padding : 4}}>
                 <Dropdown 
                  defaultIndex={0}
                  defaultValue={'01:00'}
                  options={['01:00', '02:00', '03:00', '04:00', '05:00']}
                  style={styles.hoursDropdown}
                  dropdownStyle={styles.hoursDropdownStyle}
                />
              </View>
            </View>
            <View style={styles.parkingInfoContainer}>
              <View style={styles.parkingInfo}>
                <View style={styles.parkingIcon}>
                  <Ionicons name='ios-pricetag' size={theme.SIZES.icon} color={theme.COLORS.gray}/>
                  <Text>{item.price} Rs</Text>
                </View>
                <View style={styles.parkingIcon}>
                  <Ionicons name='ios-star' size={theme.SIZES.icon} color={theme.COLORS.gray}/>
                  <Text>{item.rating}</Text>
                </View>
              </View>
                <TouchableOpacity style={styles.buy} onPress={() => this.setState({ activeModal: item })}>
              <View style={styles.buyTotal}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesome name='dollar' size={theme.SIZES.icon * 1.25} color={theme.COLORS.white} />
                  <Text style={styles.buyTotalPrice}>{totalPrice}</Text>
                </View>
                <Text style={{ color: theme.COLORS.white }}>
                  {item.price}x{hours[item.id]} 
                </Text>
              </View>
              <View style={styles.buyButton}>
                <FontAwesome name='angle-right' size={theme.SIZES.icon * 1.75} color={theme.COLORS.white} />
              </View>
            </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )
  }

renderParkings(){
      return(
        <FlatList
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToAlignment="center"
          style={styles.parkings}
          data={parkingsSpots}
          keyExtractor={(item, index) => `${item.id}`}
          renderItem={({ item }) => this.renderParking(item)}
        />
      )
}

 renderModal(){
     const {activeModal , hours} = this.state;

     if (!activeModal) return null;     
     
     return(
      <Modal
        isVisible
        useNativeDriver
        style={styles.modalContainer}
        onBackButtonPress={() => this.setState({ activeModal: null })}
        onBackdropPress={() => this.setState({ activeModal: null })}
        onSwipeComplete={() => this.setState({ activeModal: null })}
        
       >
         <View style={styles.modal}>
          <View>
            <Text style={{ fontSize: theme.SIZES.font * 1.5 }}>
              {activeModal.title}
            </Text>
          </View>
          <View style={{ paddingVertical: theme.SIZES.base }}>
            <Text style={{ color: theme.COLORS.gray, fontSize: theme.SIZES.font * 1.1 }}>
              {activeModal.description}
            </Text>
          </View>
          <View style={styles.modalInfo}>
            <View style={[styles.parkingIcon, {justifyContent: 'flex-start'} ]}>
             <Ionicons name='ios-pricetag' size={theme.SIZES.icon * 1.1} color={theme.COLORS.gray} />

              <Text style={{ fontSize: theme.SIZES.icon * 1.15 }}> {activeModal.price} Rs</Text>
            </View>
            
            <View style={[styles.parkingIcon, {justifyContent: 'flex-start'} ]}>
            <Ionicons name='ios-pin' size={theme.SIZES.icon * 1.1} color={theme.COLORS.gray} />
              <Text style={{ fontSize: theme.SIZES.icon * 1.15 }}> {activeModal.distance}km</Text>
            </View>
            <View style={[styles.parkingIcon, {justifyContent: 'flex-start'} ]}>
             <Ionicons name='ios-car' size={theme.SIZES.icon * 1.3} color={theme.COLORS.gray} />
              <Text style={{ fontSize: theme.SIZES.icon * 1.15 }}> {activeModal.free}/{activeModal.spots}</Text>
            </View>
          </View>
          <View style={styles.modalHours}>
            <Text style={{ textAlign: 'center', fontWeight: '500' }}>Choose your Booking Period:</Text>
            <View style={styles.modalHoursDropdown}>
              <Dropdown 
                  defaultIndex={0}
                  defaultValue={'01:00'}
                  options={['01:00', '02:00', '03:00', '04:00', '05:00']}
                  style={styles.hoursDropdown}
                  dropdownStyle={styles.hoursDropdownStyle}
                /> 
            </View>

          </View>
          <View>
            <TouchableOpacity style={styles.payBtn}>
              <Text style={styles.payText}>
                Proceed to pay ${activeModal.price * hours[activeModal.id]}
              </Text>
              <FontAwesome name='angle-right' size={theme.SIZES.icon * 1.75} color={theme.COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
         
       </Modal>
     )
   }
}


const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: theme.COLORS.white,
    justifyContent:"center",
    alignItems:"center"
  },
  map: {
    
    width: 420,
    height : 600
  },
 header: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: theme.SIZES.base * 2,
    paddingTop: theme.SIZES.base * 2.5,
    paddingBottom: theme.SIZES.base * 1.5,
    backgroundColor:"white"
  },
  headerTitle: {
    color: theme.COLORS.gray,
  },
    headerLocation: {
    fontSize: theme.SIZES.font,
    fontWeight: '500',
    paddingVertical: theme.SIZES.base / 3,
  },
   headerIcon :{ 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'flex-end', 
  },
  headerLocationInfo : {
   flex: 1, 
   justifyContent: 'center' 
  },
 parkings:{
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: theme.SIZES.base * 2,
    paddingBottom : theme.SIZES.base * 2
  },
  
  parking: {
    flexDirection: 'row',
    backgroundColor: theme.COLORS.white,
    borderRadius: 6,
    padding: theme.SIZES.base,
    marginHorizontal: theme.SIZES.base * 2,
    width: width - (24 * 2),
  },


  titleText:{
    color:"black",

    fontSize:29
  },
 buy: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: theme.SIZES.base * 1.5,
    paddingVertical: theme.SIZES.base,
    backgroundColor: theme.COLORS.red,
    borderRadius: 6,
  },

    marker: {
    flexDirection: 'row',
    backgroundColor: theme.COLORS.white,
    borderRadius: theme.SIZES.base * 2,
    paddingVertical: 12,
    paddingHorizontal: theme.SIZES.base * 2,
    borderWidth: 1,
    borderColor: theme.COLORS.white,
  },

  markerPrice: { 
    color: theme.COLORS.red, 
    fontWeight: 'bold', 
  },
  markerStatus: { 
    color: theme.COLORS.gray
  },
 
  shadow: {
    shadowColor: theme.COLORS.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor : theme.COLORS.white ,
    elevation : 15
  },
  active: {
    borderColor: theme.COLORS.red,
  },
    hours : {
    flex : 1, 
    flexDirection : 'column'
  },
  hoursTitle: {
    fontSize: theme.SIZES.text,
    fontWeight: '500',
  },
  parkingInfoContainer : {
    flex : 1.5, 
    flexDirection : 'row'
  },
 parkingInfo : {
    justifyContent: 'space-evenly',
    marginHorizontal : theme.SIZES.base * 1.5
  },
  parkingIcon : {
    flexDirection : 'row', 
    justifyContent : 'space-between', 
  },
  buyTotal : {
    flex:1, 
    justifyContent: 'center'
  },
 buyButton : {
    flex : 0.5, 
    justifyContent : 'center', 
    alignItems : 'flex-end'
  },
  buyTotalPrice : {
    color: theme.COLORS.white,
    fontSize: theme.SIZES.base * 2,
    fontWeight: '600',
    paddingLeft: theme.SIZES.base / 4,fontSize : 25, 
    
  },
    modalContainer: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    margin: 0,
    justifyContent: 'flex-end',
  },
 modal: {
    flexDirection: 'column',
    height: height * 0.75,
    padding: theme.SIZES.base * 2,
    backgroundColor: theme.COLORS.white,
    borderTopLeftRadius: theme.SIZES.base,
    borderTopRightRadius: theme.SIZES.base,
  },
   modalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: theme.SIZES.base,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: theme.COLORS.overlay,
    borderBottomColor: theme.COLORS.overlay,
  },
modalHours: {
    paddingVertical: height * 0.15,
  },
  modalHoursDropdown: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.SIZES.base,
  },
 payBtn: {
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.SIZES.base * 1.5,
    backgroundColor: theme.COLORS.red,
  },
  payText: {
    fontWeight: '600',
    fontSize: theme.SIZES.base * 1.5,
    color: theme.COLORS.white,
  },
   hoursDropdown: {
    borderRadius: theme.SIZES.base / 2,
    borderColor: theme.COLORS.overlay,
    borderWidth: 1,
    paddingHorizontal: theme.SIZES.base,
    paddingVertical: theme.SIZES.base/1.5,
    marginRight: theme.SIZES.base / 2,
  },
   hoursDropdownStyle: {
    marginLeft: -theme.SIZES.base,
    paddingHorizontal: theme.SIZES.base / 2,
    marginVertical: -(theme.SIZES.base + 1),
  },
});