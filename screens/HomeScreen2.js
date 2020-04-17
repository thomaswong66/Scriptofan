import React, { Component } from 'react';
import {Image, Button, View, Text, StyleSheet, AsyncStorage } from 'react-native';


export default class HomeScreen2 extends Component {

    constructor(props) {
        super(props);
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

    render() {

        return (
            <View style={styles.container}>

                <Text>Home Screen2</Text>
                <Text>{this.state.name}</Text>
                <Text>Signed In: {this.state.signedIn}</Text>
                <Image
                    source={{url: this.state.photoUrl}}
                    style={styles.image}
                />
                
                <Button
                title="Go to Details"
                    onPress={() => {
                        this.props.navigation.navigate('Details2', {
                        someId: 100,
                        someTitle: 'Title',
                        })
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
        marginTop: 15,
        width: 150,
        height: 150,
        borderColor: "rgba(0,0,0,0.2)",
        borderWidth: 3,
        borderRadius: 75
    },
  paragraph:{
    margin: 6,
    fontSize: 18,
    textAlign: 'center',
  }
});