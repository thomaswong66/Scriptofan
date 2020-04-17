import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    TouchableOpacity,
    Alert
} from "react-native";
import firebase from 'firebase';
import moment from 'moment';
import {Dropdown} from 'react-native-material-dropdown';
import {TextInput} from 'react-native-paper';


export default class CustomerBookingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            cars: [],
            selectedService: "",
            stateVehicleMake: [],
            selectedVehicleMake: "",
            stateVehicleModel: [],
            selectedVehicleModel: "",
            stateVehicleYear: [],
            selectedVehicleYear: "",

        }
    }

    async getServices() {
        try {
            let services = [];
            let servicesData = [];
            let response = await fetch('http://3.18.35.16:10010/services', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            let responseJSON = await response.json();
            for (let i = 0; i < responseJSON.length; i++) {
                if (responseJSON[i] !== null) {
                    services.push(responseJSON[i].name)
                }
            }
            for (let j of services) {
                servicesData.push({
                    value: j
                })
            }
            console.log(servicesData);
            this.setState({data: servicesData})
        } catch (e) {
            console.error(e)
        }
    }

    async getVehicleMake() {
        try {
            let makes = [];
            let makesData = [];
            let response = await fetch('http://3.18.35.16:10010/vehicles', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            let responseJSON = await response.json();
            for (let i = 0; i < responseJSON.length; i++) {
                if (!makes.includes(responseJSON[i].make)) {
                    makes.push(responseJSON[i].make)
                }
            }
            for (let j of makes) {
                makesData.push({
                    value: j
                })
            }
            console.log(makesData);
            this.setState({stateVehicleMake: makesData})
        } catch (e) {
            console.error(e)
        }
    }

    async getVehicleModel(make) {
        try {
            let models = [];
            let modelsData = [];
            let response = await fetch('http://3.18.35.16:10010/vehicles', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            let responseJSON = await response.json();
            for (let i = 0; i < responseJSON.length; i++) {
                if (responseJSON[i].make === make) {
                    if (!models.includes(responseJSON[i].model)) {
                        models.push(responseJSON[i].model)
                    }
                }
            }
            for (let j of models) {
                modelsData.push({
                    value: j
                })
            }
            this.setState({stateVehicleModel: modelsData})
        } catch (e) {
            console.error(e)
        }
    }

    async getVehicleYear(model) {
        try {
            let years = [];
            let yearsData = [];
            let response = await fetch('http://3.18.35.16:10010/vehicles', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            let responseJSON = await response.json();
            for (let i = 0; i < responseJSON.length; i++) {
                if (responseJSON[i].model === model) {
                    if (!years.includes(responseJSON[i].year)) {
                        years.push(moment(responseJSON[i].year).format('YYYY'));
                        years.sort()
                    }
                }
            }
            for (let j of years) {
                yearsData.push({
                    value: j
                })
            }
            this.setState({stateVehicleYear: yearsData})
        } catch (e) {
            console.error(e)
        }
    }


    componentDidMount(): void {
        this.getServices();
        this.getVehicleMake();
    }

    render() {
        let navigation = this.props;
        return (
            <ScrollView style={styles.container}>
                <Dropdown
                    label='Service'
                    data={this.state.data}
                    onChangeText={(value) => {
                        this.setState({selectedService: value})
                    }}
                />
                <View style={styles.row_container}>
                    <Dropdown
                        containerStyle={styles.month_container}
                        label='Make'
                        data={this.state.stateVehicleMake}
                        onChangeText={(value) => {
                            this.setState({selectedVehicleMake: value});
                            this.getVehicleModel(value)
                        }}
                    />
                    <Dropdown
                        containerStyle={styles.month_container}
                        label='Model'
                        data={this.state.stateVehicleModel}
                        onChangeText={(value) => {
                            this.setState({selectedVehicleModel: value});
                            this.getVehicleYear(value)
                        }}
                    />
                    <Dropdown
                        containerStyle={styles.month_container}
                        label='Year'
                        data={this.state.stateVehicleYear}
                        onChangeText={(value) => {
                            this.setState({selectedVehicleYear: value});
                        }}
                    />
                </View>
                {/*<Button title={"Testing Param Pass"} onPress={()=>{navigation.push("CalendarPage",{*/}
                {/*    service: this.state.selectedService,*/}
                {/*    make: this.state.selectedVehicleMake,*/}
                {/*    model: this.state.selectedVehicleModel,*/}
                {/*    year: this.state.selectedVehicleYear*/}
                {/*})}} />*/}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30
    },
    row_container: {
        flex: 1,
        flexDirection: 'row',
    },
    month_container: {
        flex: 2,
    },
    scrollContainer: {
        marginTop: 30
    },
    flex_1_container: {
        flex: 1,
    },
    text: {
        fontSize: 35,
        textAlign: 'center',
        paddingBottom: 20
    },
    styleButton: {
        width: 50,
        alignSelf: 'flex-end',
        paddingTop: 30,
        marginTop: 30,
    }
});