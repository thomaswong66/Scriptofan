import React, { Component } from 'react'  
import {StyleSheet,View, Text, Picker, TouchableOpacity} from 'react-native' 

import { MonoText } from '../components/StyledText';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'; 
  
class ChooseVehicleType extends Component {  
    state = {  
        choosenIndex: 0  
    };  
  
    render() {  
        return (  
            <View style={styles.container}>  
                <Text style={styles.textStyle}>Choose Vehicle Type</Text>  
                <Picker style={styles.pickerStyle}  
                        selectedValue={this.state.language}  
                        onValueChange={(itemValue, itemPosition) =>  
                            this.setState({language: itemValue, choosenIndex: itemPosition})}  
                    >  
                    <Picker.Item label="Car" value="Car" />  
                    <Picker.Item label="Truck" value="Truck" />    
                </Picker>  
                <Text style={styles.textStyle}> {"Chosen ="+this.state.language}</Text>
  
            </View>  
        );  
    }  
}  

ChooseVehicleType.navigationOptions = {
  header: null,
};

const RootStack = createStackNavigator(
  {
    Home: ChooseVehicleType
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
const styles = StyleSheet.create ({  
     container: {  
         flex: 1,  
         alignItems: 'center',  
         justifyContent: 'center',  
     },
     startButtomContainer: {
        backgroundColor: '#323232',
        marginTop: 50,
        top: 100,
        alignItems: 'center',
        width: 220,
        alignSelf: 'center',
        borderRadius: 15
  },
  helpLink: {
        paddingVertical: 15,
  },  
    textStyle:{  
        margin: 24,  
        fontSize: 25,  
        fontWeight: 'bold',  
        textAlign: 'center',  
    },  
    pickerStyle:{  
        height: 150,  
        width: "80%",  
        color: '#344953',  
        justifyContent: 'center',  
    }  
})  