import React, { Component } from 'react'  
import {StyleSheet,View, Text, Picker, TouchableOpacity} from 'react-native' 

import ChooseVehicleType from '../screens/ChooseVehicleType';
import HomeScreen from '../screens/HomeScreen';
import { MonoText } from '../components/StyledText';
import { createAppContainer, createStackNavigator } from 'react-navigation';

class ChooseServiceType extends Component {  
    state = {  
        choosenIndex: 0  
    };  
  
    render() {  
        return (  
            <View style={styles.container}>  
                <Text style={styles.textStyle}>Choose Service Type</Text>  
                <Picker style={styles.pickerStyle}  
                        selectedValue={this.state.language}  
                        onValueChange={(itemValue, itemPosition) =>  
                            this.setState({language: itemValue, choosenIndex: itemPosition})}  
                    >  
                    <Picker.Item label="Repair" value="Repair" />  
                    <Picker.Item label="Maintenance" value="Maintenance" />  
                    <Picker.Item label="Car Wash" value="Car Wash" /> 
                    <Picker.Item label="Vehicle Check" value="Vehicle Check" />  
                </Picker>  
                <Text style={styles.textStyle}> {"Chosen ="+this.state.language}</Text>

            <View style={styles.startButtonContainer}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ChooseVehicleType')} style={styles.helpLink}>
                <Text style={{color: 'white', fontSize: 22}}>
                  Choose Vehicle Type
                </Text>
              </TouchableOpacity>
            </View>  
            </View>  
        );  
    }  
}  

ChooseServiceType.navigationOptions = {
  header: null,
};

const RootStack = createStackNavigator(
  {
    Home: ChooseServiceType,
    ChooseVehicleType: ChooseVehicleType
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
     startButtonContainer: {
        backgroundColor: '#323232',
        marginTop: -10,
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