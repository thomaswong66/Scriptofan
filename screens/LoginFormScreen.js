import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, AsyncStorage, Image} from 'react-native';
import {Button, Input} from "react-native-elements";
import * as Google from 'expo-google-app-auth'

export default class LoginFormScreen extends Component {
    static navigationOptions = {
        title: "Log in",
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
        this.state = {
            signedIn: false,
            name: "",
            photoUrl: ""
        }
    }

    signIn = async () => {
        try {
            const result = await Google.logInAsync({
                iosClientId: "444609546273-ounlsuf9n2d1oqjb75h5s0eb99t96l47.apps.googleusercontent.com",
                scopes: ["profile", "email"]
            })

            if (result.type === "success") {
                await AsyncStorage.setItem('userId', result.user.id)
                await AsyncStorage.setItem('userName', result.user.name)
                await AsyncStorage.setItem('photoUrl', result.user.photoUrl)
                await AsyncStorage.setItem('signedIn', 'true')
                await AsyncStorage.setItem('userToken', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3aWtpZWRAZ21haWwuY29tIiwiZXhwIjoxNTczMDU5OTAxLCJyb2xlIjpbImN1c3RvbWVyIl0sInVzZXJUeXBlIjoidmVldHRlbGwiLCJpYXQiOjE1NzIwNTk5MDF9.JCfMBJIo8XPhP2ZBEW1poyUz8GmLhK5CzzCVOq_Kl2u_zCWTVIy7ewIn63bu4Z_AWTM9oVh0HArkLO3A3MqWVw')

                const userId = await AsyncStorage.getItem('userId')
                const userName = await AsyncStorage.getItem('userName')
                const signedIn = await AsyncStorage.getItem('signedIn')
                const photoUrl = await AsyncStorage.getItem('photoUrl')
                const userToken = await AsyncStorage.getItem('userToken')

                console.log(userId);
                console.log(userName);
                console.log(signedIn);
                console.log(photoUrl);
                console.log(userToken);
                console.log(result.user);
                this.setState({
                    signedIn: true,
                    name: result.user.name,
                    photoUrl: result.user.photoUrl
                })
            } else {
                console.log("cancelled");
            }
        } catch (e) {
            console.log("error", e);
        }
    }


    render() {
        if(this.state.signedIn){
            return(
                <View style={styles.container2}>
                    <Text style={styles.text}>
                        Welcome, {this.state.name}!
                    </Text>
                    <Image
                          source={{url: this.state.photoUrl}}
                          style={styles.image}
                    />
                    <Button
                        buttonStyle={styles.styleButton}
                        title="Continue"
                        onPress={() => this.props.navigation.navigate('Home1', {
                            name: this.state.name,
                            photoUrl: this.state.photoUrl
                        })
                        }
                    />  
                </View>
            );
        } else {
            return(
                <View style={styles.container}>
                <ScrollView style={styles.scrollContainer}>
                    <Text style={styles.text}>
                        Login
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
                    <Button
                        buttonStyle={styles.styleButton}
                        title="Sign in with Google"
                        onPress={() => this.signIn()}
                    />
                    <Button
                        buttonStyle={styles.styleButton}
                        title="Login as Customer"
                        onPress={this._customersigninAsync}
                    />
                    <Button
                        buttonStyle={styles.styleButton}
                        title="Login as Technician"
                        onPress={this._techniciansigninAsync}
                    />                    
                </ScrollView>
            </View>
            )
        }
    }
                    _customersigninAsync = async() => {
                        await AsyncStorage.setItem('userToken', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3aWtpZWRAZ21haWwuY29tIiwiZXhwIjoxNTczMDU5OTAxLCJyb2xlIjpbImN1c3RvbWVyIl0sInVzZXJUeXBlIjoidmVldHRlbGwiLCJpYXQiOjE1NzIwNTk5MDF9.JCfMBJIo8XPhP2ZBEW1poyUz8GmLhK5CzzCVOq_Kl2u_zCWTVIy7ewIn63bu4Z_AWTM9oVh0HArkLO3A3MqWVw')
                        this.props.navigation.navigate('Home')
                        const userToken = await AsyncStorage.getItem('userToken')
                        console.log(userToken)
                    }

                    _techniciansigninAsync = async() => {
                        await AsyncStorage.setItem('userToken', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXNoaXgyQGdtYWlsLmNvbSIsImV4cCI6MTU3MzA2MDc1Niwicm9sZSI6WyJ0ZWNoIl0sInVzZXJUeXBlIjoidmVldHRlbGwiLCJpYXQiOjE1NzIwNjA3NTZ9.oe4pdemCwRZCUvutc1A377eg_eEZzSYHrkpm3G4PS_gXFdJRmi0f6kuqDi6ldOl6PzpDY8EHRALOeDKDvxun0w')
                        this.props.navigation.navigate('Home')
                        const userToken = await AsyncStorage.getItem('userToken')
                        console.log(userToken)
                    }

}
    



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    container2: {
        flex: 1,
        padding: 30,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
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
    },
    header: {
        fontSize: 25
    },
    image: {
        marginTop: 15,
        width: 150,
        height: 150,
        borderColor: "rgba(0,0,0,0.2)",
        borderWidth: 3,
        borderRadius: 75
    }
});