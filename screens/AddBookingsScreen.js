import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    TouchableOpacity,
    Alert,
    TextInput
} from "react-native";
import firebase from 'firebase';
import moment from 'moment';
import {Dropdown} from 'react-native-material-dropdown';

const initialState = {
    selectedMonth: "",
    selectedDay: "",
    technicianName: "",
    selectedHour: "",
    selectedMins: "",
    selectedYear: "",
    selectedPeriod: ""
};

export default class AddBookingsScreen extends Component {
    static navigationOptions = {
        title: "Home",
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
            data: [],
            cars: [],
            stateMonths: [],
            selectedMonth: "",
            stateDays: [],
            selectedDay: "",
            technicianName: "",
            stateHours: [],
            selectedHour: "",
            stateMins: [],
            selectedMins: "",
            stateYears: [],
            selectedYear: "",
            statePeriod: [],
            selectedPeriod: "",
            fieldError: "",
        }
    }

    _addSchedule(techName, start, end) {
        if (techName !== "") {
            firebase.database().ref('schedule/').push({
                techName,
                times: {
                    start,
                    end
                }
            }).then((data) => {
                console.log('data ', data);
            }).catch((error) => {
                console.log('error ', error)
            })
        } else {
            this.setState({fieldError: "Missing Technician Name"})
        }
    }

    refreshData() {
        this.setState(initialState)
    }

    loadMonths() {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
            'November', 'December'];
        let monthsData = [];
        for (let j of months) {
            monthsData.push({
                value: j
            })
        }
        this.setState({stateMonths: monthsData})
    }

    loadDays(month) {
        let days = [];
        let daysData = [];
        if (month === 'January' || month === 'March' || month === 'May' || month === 'July' || month === 'August' ||
            month === 'October' || month === 'December') {
            for (let i = 0; i < 31; i++) {
                days[i] = i + 1;
            }
        } else if (month === 'April' || month === 'June' || month === 'September' || month === 'November') {
            for (let i = 0; i < 30; i++) {
                days[i] = i + 1;
            }
        } else if (month === 'February') {
            for (let i = 0; i < 29; i++) {
                days[i] = i + 1;
            }
        }
        for (let j of days) {
            daysData.push({
                value: j
            })
        }

        this.setState({stateDays: daysData})
    };

    loadDefaultDays() {
        let days = [];
        let daysData = [];
        for (let i = 0; i < 31; i++) {
            days[i] = i + 1;
        }

        for (let j of days) {
            daysData.push({
                value: j
            })
        }
        this.setState({stateDays: daysData})
    }

    loadHours() {
        let hours = [];
        let hoursData = [];
        for (let i = 0; i < 12; i++) {
            hours[i] = i + 1;
        }
        for (let j of hours) {
            hoursData.push({
                value: j
            })
        }
        this.setState({stateHours: hoursData})
    }

    loadMins() {
        let minutes = [];
        let minutesData = [];
        for (let i = 1; i <= 12; i++) {
            minutes[0] = "00";
            minutes[i] = i * 5;
        }
        for (let j of minutes) {
            minutesData.push({
                value: j
            })
        }
        this.setState({stateMins: minutesData})
    }

    loadYears() {
        let years = [];
        let d = new Date();
        let n = d.getFullYear();
        let yearsData = [];
        for (let i = 0; i < 20; i++) {
            years[i] = n + i;
        }
        for (let j of years) {
            yearsData.push({
                value: j
            })
        }
        this.setState({stateYears: yearsData})
    }

    formatTime(month, day, year, hour, minute, period) {
        if (month == "" || day == "" || year == "" || minute == "" || period == "") {
            this.setState({fieldError: "Missing Date/Time Values"})
        } else {
            let formattedTime = month + ' ' + day + ' ' + year + ', ' + hour + ':' + minute + ':00' + period;
            return moment(formattedTime).format();
        }
    }

    loadPeriod() {
        let periods = ['am', 'pm'];
        let periodData = [];
        for (let j of periods) {
            periodData.push({
                value: j
            })
        }
        this.setState({statePeriod: periodData})
    }

    componentDidMount(): void {
        this.loadMonths();
        this.loadHours();
        this.loadMins();
        this.loadYears();
        this.loadPeriod();
        this.loadDefaultDays();
    }

    render() {
        let {navigation} = this.props;
        return (
            <ScrollView style={styles.container}>
                <TextInput
                    placeholder='Technician Name'
                    value={this.state.technicianName}
                    onChangeText={text => this.setState({technicianName: text})}
                />
                <View style={styles.row_container}>
                    <Dropdown
                        containerStyle={styles.month_container}
                        label='Month'
                        data={this.state.stateMonths}
                        onChangeText={(value) => {
                            this.setState({selectedMonth: value});
                            this.loadDays(value)
                        }}
                    />
                    <Dropdown
                        containerStyle={styles.flex_1_container}
                        label='Day'
                        data={this.state.stateDays}
                        onChangeText={(value) => {
                            this.setState({selectedDay: value})
                        }}
                    />
                    <Dropdown
                        containerStyle={styles.flex_1_container}
                        label='Year'
                        data={this.state.stateYears}
                        onChangeText={(value) => {
                            this.setState({selectedYear: value})
                        }}
                    />
                </View>
                <View style={styles.row_container}>
                    <Dropdown
                        containerStyle={styles.flex_1_container}
                        label='Hour'
                        data={this.state.stateHours}
                        onChangeText={(value) => {
                            this.setState({selectedHour: value})
                        }}
                    />
                    <Dropdown
                        containerStyle={styles.flex_1_container}
                        label='Minute'
                        data={this.state.stateMins}
                        onChangeText={(value) => {
                            this.setState({selectedMins: value})
                        }}
                    />
                    <Dropdown
                        containerStyle={styles.flex_1_container}
                        label='Period'
                        data={this.state.statePeriod}
                        onChangeText={(value) => {
                            this.setState({selectedPeriod: value})
                        }}
                    />
                </View>
                <Button title={'Add Schedule'}
                        style={styles.styleButton}
                        onPress={() => Alert.alert(
                            'Add Schedule',
                            'Are you sure you want to add this schedule',
                            [
                                {text: 'Cancel', onPress: () => console.log('Canceled')},
                                {
                                    text: 'Add', onPress: () => {
                                        if (this.state.technicianName == ""
                                            || this.state.selectedMonth == ""
                                            || this.state.selectedDay == ""
                                            || this.state.selectedYear == ""
                                            || this.state.selectedHour == ""
                                            || this.state.selectedMins == ""
                                            || this.state.selectedPeriod == "") {
                                            Alert.alert(
                                                'Error',
                                                'Missing Technician Name/Date/Time Values',
                                                [{
                                                    text: "OK", onPress: () => console.log(this.state.fieldError)
                                                }]
                                            )
                                        }
                                        else {
                                            this._addSchedule(this.state.technicianName,
                                                this.formatTime(this.state.selectedMonth,
                                                    this.state.selectedDay, this.state.selectedYear, this.state.selectedHour,
                                                    this.state.selectedMins, this.state.selectedPeriod),
                                                this.formatTime(this.state.selectedMonth,
                                                    this.state.selectedDay, this.state.selectedYear, this.state.selectedHour,
                                                    this.state.selectedMins, this.state.selectedPeriod))
                                        }
                                    }
                                }
                            ]
                        )}>Test</Button>
                {/*<Button title={"Testing Param Pass"} onPress={()=>{navigation.push("TestPage",{*/}
                {/*    month: this.state.selectedMonth,*/}
                {/*    day: this.state.selectedDay,*/}
                {/*    year: this.state.selectedYear*/}
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