import React, {Component} from 'react';
import {StyleSheet, ScrollView, Platform, Text} from "react-native";
import MapView from 'react-native-maps';


export default class Sample2 extends Component<Props> {
    static navigationOptions = {
            title: 'Settings',
            headerStyle: {
                backgroundColor: '#169ff5',
            },
            headerTintColor: '#fff',
            headerTintStyle: {
                fontWeight: 'bold',
            }
    }  

    render() {    return (      
        <MapView        
        style={{flex: 1}}        
        region={{latitude: 42.882004, longitude: 74.582748, latitudeDelta: 0.0922, longitudeDelta: 0.0421}}        
        showsUserLocation={true}      />    );  
}}

// export default function SettingsScreen() {
//     return (
//         <ScrollView style={styles.container}>
//             <Text style={styles.text}>
//                 Sample Page 2
//             </Text>

//         </ScrollView>
//     )
// }

// SettingsScreen.navigationOptions = {
//     title: 'Sample',
// };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 42,
    },
});
