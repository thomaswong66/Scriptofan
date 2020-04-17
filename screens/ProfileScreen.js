import React from 'react';
import { StyleSheet, ScrollView, Text } from "react-native";
import { Button, Input } from 'react-native-elements'

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Profile',
        headerStyle: {
            backgroundColor: '#169ff5',
        },
        headerTintColor: '#fff',
        headerTintStyle: {
            fontWeight: 'bold',
        }
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <Input
                    style={styles.input}
                    label="First Name:"
                    labelStyle={styles.styleLabel}
                    placeholder="First Name"
                />
                <Text></Text>
                <Input
                    style={styles.input}
                    label="Last Name:"
                    labelStyle={styles.styleLabel}
                    placeholder="Last Name"
                />
                <Text></Text>
                <Input
                    style={styles.input}
                    label="Phone Number:"
                    labelStyle={styles.styleLabel}
                    placeholder="Phone Number"
                />
                <Text></Text>
                <Input
                    style={styles.input}
                    label="Email:"
                    labelStyle={styles.styleLabel}
                    placeholder="Email"
                />
                <Text></Text>
                <Input
                    style={styles.input}
                    label="Address Line 1:"
                    labelStyle={styles.styleLabel}
                    placeholder="Address Line 1"
                />
                <Text></Text>
                <Input
                    style={styles.input}
                    label="Address Line 2:"
                    labelStyle={styles.styleLabel}
                    placeholder="Address Line 2"
                />
                <Text></Text>
                <Button
                    buttonStyle={styles.styleButton}
                    title='Submit'/>
            </ScrollView>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
        backgroundColor: '#fff',
        padding: 10
    },
    text: {
        fontSize: 42,
    },
    input: {
        marginTop: 3
    },
    styleLabel: {
        fontSize: 20,
        //padding: 5
    },
    styleButton: {
        marginTop: 15,
        marginLeft: 8,
        marginRight: 8,
        backgroundColor: '#169ff5',
    }
});
