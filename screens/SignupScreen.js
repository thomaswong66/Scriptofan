import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {Button, Input} from "react-native-elements";

export default class SignupScreen extends Component {
    static navigationOptions = {
        title: "Sign up",
        headerStyle: {
            backgroundColor: '#169ff5',
        },
        headerTintColor: '#fff',
        headerTintStyle: {
            fontWeight: 'bold',
        },
    }
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