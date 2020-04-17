import React, {Component} from 'react';
import {View, StyleSheet, Image, ScrollView, Text} from 'react-native';
import {Button, Input} from "react-native-elements";
import {createAppContainer, createStackNavigator} from 'react-navigation';

import SignupScreen from '../screens/SignupScreen'
import AppNavigator from '../navigation/AppNavigator'
import LoginFormScreen from '../screens/LoginFormScreen'

class LoginScreen extends Component {
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
                            source={
                                __DEV__
                                    ? require('../assets/images/logo.png')
                                    : require('../assets/images/robot-prod.png')
                            }
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

const loginStack = createStackNavigator(
    {
        Login: {
            screen: LoginScreen,
            navigationOptions: {
                header: null
            }
        },
        LoginForm: {
            screen: LoginFormScreen,
            navigationOptions: {
                header: null
            }
        },
        Signup: {
            screen: SignupScreen,
            navigationOptions: {
                header: null
            }
        },
        Home: {
            screen: AppNavigator,
            navigationOptions: {
                header: null
            }
        }
    }
);

const LoginAppContainer = createAppContainer(loginStack);

export default class LoginApp extends Component {
    render() {
        return <LoginAppContainer/>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
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