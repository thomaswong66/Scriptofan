import React, {Component} from 'react';
import {View, StyleSheet, Image, ScrollView, Text} from 'react-native';
import {Button, Input} from "react-native-elements";

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}>
                    <View style={styles.welcomeContainer}>
                        <Image
                            source={require('../assets/logo.png')}
                            style={styles.welcomeImage}
                        />
                    </View>
                    <View style={styles.buttonSection}>
                        <Button
                            buttonStyle={styles.styleButton}
                            title='Login'
                            onPress={() => this.props.navigation.navigate('LoginForm')}
                        />
                        <Text>
                            OR
                        </Text>
                        <Button
                            buttonStyle={styles.styleButton}
                            title='Signup'
                            onPress={() => this.props.navigation.navigate('Signup')}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
    },
    styleButton: {
        marginBottom: 10,
        marginTop: 10,
        width: 250,
        alignItems: 'center',
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    contentContainer: {
        paddingTop: 30,
    },
    buttonSection: {
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});