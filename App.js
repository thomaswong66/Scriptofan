import React, { useState } from 'react';
import { StyleSheet, Text, View, TabBarIcon, AsyncStorage } from 'react-native';
import firebase from 'firebase';

import AppContainer from './navigation/navigator.js';
import AppContainer2 from './navigation/navigator2.js';

const config = {
  databaseURL: "https://supra45-calendar.firebaseio.com/",
  projectId: "supra45-calendar"
};

firebase.initializeApp(config);

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            name: "",
            photoUrl: ""
        }
    }

    componentDidMount() {
        this.getItem();
    }
    
    getItem = async () => {
            const userName = await AsyncStorage.getItem('userName')
            const signedIn = await AsyncStorage.getItem('signedIn')
            const photoUrl = await AsyncStorage.getItem('photoUrl')

            this.setState({
                signedIn: signedIn,
                name: userName,
                photoUrl: photoUrl
            })
    }

    render() {
    return (
        <View style={styles.container}>

          { this.state.signedIn === 'true' ? <AppContainer2 /> : <AppContainer /> }

        </View>
    );
  }
  
    
    
  }

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});



