import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Alert,
    TextInput
} from "react-native";
import { Button } from 'react-native-elements';

export default class ConfirmScreen extends Component {
	static navigationOptions = {
        title: "Confirm Reservation",
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
    	const {navigation} = this.props;
        const name = navigation.getParam('name', '');
        const date = navigation.getParam('date', '');
        const startTime = navigation.getParam('startTime', '');
        const endTime = navigation.getParam('endTime', '');
    	return(
    		<View style={styles.container}>
    			<View style={styles.container2}>
	    			<Text style={styles.technician}>Technician: {name}</Text>
	    			<Text style={styles.text}>Date: {date}</Text>
	    			<Text style={styles.text}>Start Time: {startTime}</Text>
	    			<Text style={styles.text}>End Time: {endTime}</Text>
	    		</View>
    			<View style={styles.buttonContainer}>
	    			<Button
	                        buttonStyle={styles.styleButton}
	                        title="Confirm Reservation"
	                        onPress={() => Alert.alert(
						        "Confirm Reservation", 
						        name+'\n'+date+' at '+startTime,[
						        {text: 'Cancel', onPress: () => console.log('Canceled')},
						        {text: 'Confirm', onPress: () => console.log('Comfirmed')},
						        ]
						    )}
	                />
	            </View>
    		</View>
    	)
    }

}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#fff',
    },
	container2: {
        flex: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    buttonContainer: {
    	flex: 1,
    	padding: 5,
    	justifyContent: 'flex-end',
    	alignItems: 'center'
    },
	styleButton: {
	    margin: 10,
	},
	technician: {
	    margin: 5,
	    fontWeight: 'bold',
	    fontSize: 20
	},
	text: {
	    margin: 5,
	    fontSize: 20
	}
});