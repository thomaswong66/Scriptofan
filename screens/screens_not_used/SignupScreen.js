import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {Button, Input} from "react-native-elements";
import {createAppContainer, createStackNavigator} from "react-navigation";

import AppNavigator from "../navigation/AppNavigator";

class SignupScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollContainer}>
                    <Text style={styles.text}>
                        Sign Up
                    </Text>
                    <Input
                        label="Email:"
                        labelStyle={styles.styleLabel}
                        placeholder='Email'
                    />
                    <Input
                        label="Password"
                        labelStyle={styles.styleLabel}
                        placeholder="Password"
                    />
                    <Input
                        label="Confirm Password:"
                        labelStyle={styles.styleLabel}
                        placeholder="Confirm Password"
                    />
                    <Button
                        buttonStyle={styles.styleButton}
                        title="Signup"
                        onPress={() => this.props.navigation.navigate('Home')}
                    />
                </ScrollView>
            </View>
        )
    }
}

const signupStack = createStackNavigator(
    {
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
    }, {
        headerMode: "none"
    }
);

const SignupAppContainer = createAppContainer(signupStack);

export default class LoginApp extends Component {
    render() {
        return <SignupAppContainer/>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        marginTop: 30
    },
    text: {
        fontSize: 35,
        textAlign: 'center',
        paddingBottom: 20
    },
    styleLabel: {
        fontSize: 20,
    },
    styleButton: {
        marginTop: 10,
    }
});