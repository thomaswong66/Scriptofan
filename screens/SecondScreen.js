import React, { Component } from 'react';
import {Image,Button, View, Text, StyleSheet } from 'react-native';


export default class SecondScreen extends Component {
    
    static navigationOptions = {
        title: "Detail1",
        headerStyle: {
            backgroundColor: '#169ff5',
        },
        headerTintColor: '#fff',
        headerTintStyle: {
            fontWeight: 'bold',
        },
        tabBarVisiable: false
    }

    render() {
        const {navigation} = this.props;
        const someId = navigation.getParam('someId', 'NO-ID');
        const someTitle = navigation.getParam('someTitle', 'No title')
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>Second Screen1</Text>
                <Text>Id: {JSON.stringify(someId)}</Text>
                <Text>Title: {JSON.stringify(someTitle)}</Text>
                <Button
                title="Go to Home"
                onPress={() => this.props.navigation.navigate('Home')}
                />
                <Button
                title="Open Modal"
                onPress={() => this.props.navigation.navigate('Modal')}
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
  paragraph:{
    margin: 6,
    fontSize: 18,
    textAlign: 'center',
  }
});