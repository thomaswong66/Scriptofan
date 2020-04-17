import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    TouchableOpacity
} from "react-native";
import firebase from 'firebase';
import moment from 'moment';
import { Dropdown } from 'react-native-material-dropdown';

export default class TechnicianTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            cars: [],
            selectedService: "",
        }
    }
    _addSchedule(techName, start, end) {
        firebase.database().ref('schedule/').push({
            techName,
            times : {
                start,
                end
            }
        }).then((data) => {
            console.log('data ', data)
        }).catch((error) => {
            console.log('error ', error)
        })
    }
    _readSchedules() {
        firebase.database().ref('schedule/').on('value', function (snapshot) {
            console.log(snapshot.val())
            }
        )
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
            this.setState({data:servicesData})
        }
        catch (e) {
            console.error(e)
        }
    }

    async getVehicles() {
        try {
            let cars = [];
            let carsData = [];
            let response = await fetch('http://3.18.35.16:10010/vehicles', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            let responseJSON = await response.json();
            for (let i = 0; i < responseJSON.length; i++) {
                cars.push("(" + moment(responseJSON[i].year).format('YYYY') + ") " + responseJSON[i].make + " " + responseJSON[i].model)
            }
            for (let j of cars) {
                carsData.push({
                    value: j
                })
            }
            console.log(carsData);
            this.setState({cars:carsData})
        }
        catch (e) {
            console.error(e)
        }
    }



    _returnDates() {
        let dates = [];
        let datesObject = {};
        firebase.database().ref('schedule/').on('value', function (userSnapshot) {
            userSnapshot.forEach(function (snapshot) {
                dates.push(moment(snapshot.val().times.start).format('YYYY-MM-DD'));
            });
        });
        dates.forEach((day) => {
            datesObject[day] = {
                selected: true,
                marked: true
            };
        });
        console.log(dates);
        return datesObject
    }
    componentDidMount(): void {
        this.getServices();
        this.getVehicles();
    }

    render(){
        let techName = "testTechName",
            start = "2019-11-05",
            end = "2019-11-05";
        return (
            <View>
                {/*<Button title={"Add Schedule"} onPress={() => this._addSchedule(techName, start, end)}>*/}
                {/*</Button>*/}
                {/*<Button title={"Read Schedules"} onPress={() => this._readSchedules()}>*/}
                {/*</Button>*/}
                {/*<Button title={'test'} onPress={() => this._returnDates()}>*/}
                {/*</Button>*/}
                {/*<Button title={'test2'} onPress={() => this.getServices()}>*/}
                {/*</Button>*/}
                <Dropdown
                    label='Service'
                    data={this.state.data}
                    onChangeText={(value) => {
                        this.setState({selectedService: value})
                    }}
                />
                <Dropdown
                    label='Vehicle'
                    data={this.state.cars}
                />
                <Button title={'test'} onPress={() => console.log(this.state.selectedService)}>Test</Button>
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