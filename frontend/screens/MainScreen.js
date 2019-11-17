import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import firebase from 'react-native-firebase';
import {AsyncStorage} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 
import { PRIMARY, SECONDARY, TERNARY } from '../styles/colors';
import { Images } from "../styles";


export default class MainScreen extends Component {
    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken').then((res)=>console.log("Firebase token -----"+res+"-----"));
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken().then((res)=>console.log("Firebase token -----"+res+"-----"));
            if (fcmToken) {
                await AsyncStorage.setItem('fcmToken', fcmToken).then((res)=>console.log("Firebase token -----"+res+"-----"));
            }
        }
    }
    
    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }
    
    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            this.getToken();
        } catch (error) {
            console.log('permission rejected');
        }
    }
    
    async createNotificationListeners() {
        firebase.notifications().onNotification(notification => {
            notification.android.setChannelId('insider').setSound('default')
                            //.enableLights(true);
            // notification.android.setLightColor(PRIMARY);
            // notification.android.setVibrate(true);
            // notification.android.setLockVisibility(true);
            firebase.notifications().displayNotification(notification)
            console.log("new notification----"+JSON.stringify(notification.data)+"----------");
            this.setState({
                emergency: true,
                ds: notification.data.description?notification.data.description:"",
                markers:  [
                    {
                      latitude: notification.data.latitude?parseFloat(notification.data.latitude):51.761586,
                      longitude: notification.data.longitude?parseFloat(notification.data.longitude):-1.263487,
                      title: 'Emergency!',
                    },
                    {
                        latitude: 51.760586,
                        longitude: -1.262487,
                        title: 'Your location',  
                    }
                ]
            });
        });
    }
    state = {
        emergency: true,//TOCHANGE,
        ds: "5 minutes away",
        markers:  [
            {
              latitude: 51.760576,
              longitude: -1.262467,
              title: 'Emergency!',
            },
            {
                latitude: 51.761576,
                longitude: -1.263467,
                title: 'Your location',  
            }
        ]
    };
    
    componentDidMount() {
        const channel = new firebase.notifications.Android.Channel('insider', 'insider channel', firebase.notifications.Android.Importance.Max)
        firebase.notifications().android.createChannel(channel);
        this.checkPermission();
        this.createNotificationListeners();
    }

  render() {
    return (
      <View style={styles.container}>
          {!this.state.emergency&&
            <Image
                source={Images.logoStandard}
                style={styles.logo}
                />}
          {this.state.emergency&&
          <View style={{flex: 1, height: '100%'}}>
            <View
                style={styles.mapContainer}>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: this.state.markers[0].latitude,
                    longitude: this.state.markers[0].longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                >
                    <MapView.Marker
                    coordinate={{latitude: this.state.markers[0].latitude, longitude: this.state.markers[0].longitude}}
                    title={this.state.markers[0].title}
                    />
                    <MapView.Marker
                    coordinate={{latitude: this.state.markers[1].latitude, longitude: this.state.markers[1].longitude}}
                    title={this.state.markers[1].title}
                    pinColor = {'yellow'}
                    />
            </MapView>
            </View>
           
            {!this.state.decided&& <View style={{flex: 2}}>
            <View style={{...styles.button, height: '10%', backgroundColor: TERNARY}}>
                <Text style={styles.label}>Are you able to help?</Text>
                <Text style={{...styles.label, fontSize: 15}}>{this.state.ds}</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', height: '10%'}}>
                <TouchableOpacity
                style={{...styles.button, backgroundColor: SECONDARY}}
                onPress={()=>this.setState({decided: true})}>
                    <Text style={{...styles.label, backgroundColor: SECONDARY}}>Yes!</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.button}
                onPress={()=>this.setState({emergency: false})}>
                    <Text style={styles.label}>No</Text>
                </TouchableOpacity>
            </View></View>
            }
            {this.state.decided&& 
             <View style={{flex: 2}}>
                <TouchableOpacity
                style={{...styles.button, backgroundColor: SECONDARY, flex: 0.6}}
                onPress={()=>this.setState({decided: true})}>
                    <Text style={{...styles.label}}>Lead me there</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={{...styles.button, backgroundColor: TERNARY, flex: 0.6}}
                onPress={()=>this.setState({decided: true})}>
                    <Text style={{...styles.label}}>Call 999</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={{...styles.button, backgroundColor: PRIMARY, flex: 0.6}}
                onPress={()=>this.setState({emergency: false})}>
                    <Text style={{...styles.label}}>Help given</Text>
                </TouchableOpacity>
            </View>}
        </View>
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
    logo: {
        alignSelf: "center",
        resizeMode: "contain",
        height: 400,
        width: 400,
        marginTop: 120
      },
    container: {
      ...StyleSheet.absoluteFillObject,
      height: '100%',
      flex: 1,
      alignItems: 'stretch',
      backgroundColor: TERNARY
    },
    mapContainer: {
        flex: 4,
        height: 400
      },
    map: {
        flex: 1,
        height: 400
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: PRIMARY,
        flex: 1
    },
    label:{
        fontSize: 20,
        color: 'black'
    }
   });