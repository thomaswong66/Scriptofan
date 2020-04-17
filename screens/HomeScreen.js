import React, { Component } from 'react';
import {Image, View, Text, StyleSheet, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';

export default class HomeScreen extends Component {

    constructor(props) {
      super(props)
      this.state = {
        signedIn: false,
        name: "",
        photoUrl: ""
      }
    }
    
    static navigationOptions = {
        title: 'Home2',
        headerStyle: {
            backgroundColor: '#169ff5',
        },
        headerTintColor: '#fff',
        headerTintStyle: {
            fontWeight: 'bold',
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

    _signout = async() => {
        await AsyncStorage.removeItem('userId')
        await AsyncStorage.removeItem('userToken')
        await AsyncStorage.removeItem('userName')
        await AsyncStorage.removeItem('photoUrl')
        await AsyncStorage.setItem('signedIn', 'false')

        this.props.navigation.navigate('LoginScreen')

        const userId = await AsyncStorage.getItem('userId')
        const userToken = await AsyncStorage.getItem('userToken')
        const userName = await AsyncStorage.getItem('userName')
        const photoUrl = await AsyncStorage.getItem('photoUrl')
        const signedIn = await AsyncStorage.getItem('signedIn')

        console.log(userId);
        console.log(userToken)
        console.log(userName)
        console.log(photoUrl)
        console.log(signedIn)
    }

    render() {
        
        return (
            <View style={styles.container}>
                      <Text>Welcome, {this.state.name}!</Text>
                      <Image
                          source={{url: this.state.photoUrl}}
                          style={styles.image}
                      />
                      <Image
                        source={require('../assets/logo.png')}
                        style={styles.welcomeImage}
                      />

                      <Text style={styles.getStartedText}>Get Started</Text>

                      <Button 
                        onPress={() => {this.props.navigation.navigate('Details1')}}
                        buttonStyle={styles.styleButton}
                        title='Book Services'
                      />

                      <Button
                          buttonStyle={styles.styleButton}
                          title="Sign Out"
                          onPress={this._signout}
                      />

                        
            </View>
        )
    }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    margin: 50,
    padding: 50,
    alignItems: 'center',
  },
  welcomeImage: {
    margin: 20,
    width: 120,
    height: 100,
    resizeMode: 'contain'
  },
  getStartedText: {
    margin: 20,
    fontSize: 24,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  styleButton: {
    margin: 20,
    backgroundColor: '#169ff5',
  },
  image: {
    margin: 20,
    width: 80,
    height: 80,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 40
  }
});