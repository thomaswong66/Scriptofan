import React, { Component } from 'react';
import {Platform} from 'react-native';
import { StyleSheet, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import {List} from 'react-native-paper';

export default class MenuScreen extends Component {
    static navigationOptions = {
        title: "Home3",
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
        return (
            <ScrollView style={styles.container}>
                <List.Item
                    title="Profile"
                    description="Account Profile"
                    left={props => <Icon style={styles.icons} name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'} size={40} color="grey"/>}
                    right={props => <Icon style={styles.icons} name={Platform.OS === 'ios' ? 'ios-arrow-forward' : 'md-arrow-dropright'} size={25} color="grey"/>}
                    onPress={() => this.props.navigation.navigate('Profile')}
                />
                <List.Item
                    title="Settings"
                    description="Account Settings"
                    left={props => <Icon style={styles.icons} name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'} size={40} color="grey"/>}
                    right={props => <Icon style={styles.icons} name={Platform.OS === 'ios' ? 'ios-arrow-forward' : 'md-arrow-dropright'} size={25} color="grey"/>}
                    onPress={() => this.props.navigation.navigate('Sample2')}
                />
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    icons: {
        padding: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
    },
});
