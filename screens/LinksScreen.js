import React, {Component} from 'react';
import firebase from "firebase";
import moment from "moment";

import {CalendarList, Agenda} from 'react-native-calendars';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';

export default class HorizontalCalendarList extends Component {
  static navigationOptions = {
        title: "Calendar",
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
      items: {}
    };
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        selected={new Date()}
        minDate={new Date()}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        pastScrollRange={1}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={5}
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#666'},
        //    '2017-05-09': {textColor: '#666'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        //theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      />
    );
  }

  componentDidMount() {
    const self = this;

      firebase.database().ref("schedule/").once("value").then(function(userSnapshot) {
          userSnapshot.forEach(function(snapshot) {
            var currentDate = moment(snapshot.val().times.start).format('YYYY-MM-DD');
            var techName = snapshot.val().techName;
            var StartTime = moment(snapshot.val().times.start).format('HH: mm');
            var EndTime = moment(snapshot.val().times.end).format('HH: mm');
            console.log(currentDate);
            console.log(techName);
            if (!self.state.items[currentDate]) {
              self.state.items[currentDate] = []; 
              self.state.items[currentDate].push({
                name: techName,
                date: currentDate,
                startTime: StartTime,
                endTime: EndTime
            });
            } else {
              self.state.items[currentDate].push({
                name: techName,
                date: currentDate,
                startTime: StartTime,
                endTime: EndTime
            });
            }

            
          });
          const newItems = {};
            Object.keys(self.state.items).forEach(key => {newItems[key] = self.state.items[key];});
            self.setState({
              items: newItems
            });
          console.log(self.state.items);
          })
  }


  renderItem(item) {
    return (
      <TouchableOpacity 
        onPress={() => this.props.navigation.navigate('ConfirmScreen', {
                            name: item.name,
                            date: item.date,
                            startTime: item.startTime,
                            endTime: item.endTime,
                        })}
        style={styles.item}
      >
      <Text style={styles.technician}>Technician: {item.name}</Text>
      <Text style={styles.text}>Date: {item.date}</Text>
      <Text style={styles.text}>Start Time: {item.startTime}</Text>
      <Text style={styles.text}>End Time: {item.endTime}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
      <Text>No avaliable technicians</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    height: 130,
    justifyContent: 'center',
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 40,
    paddingBottom: 10,
    paddingLeft: 5
  },
  technician: {
    margin: 5,
    fontWeight: 'bold',
    fontSize: 15
  },
  text: {
    margin: 5
  }
});

