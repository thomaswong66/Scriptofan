import React, { Component } from "react";
import firebase from "firebase";
import { CalendarList, Agenda } from "react-native-calendars";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import moment from "moment";
import { withNavigation } from "react-navigation";

class HorizontalCalendarList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      dates: [],
      loaded: false
    };
  }

  // loadItems () {
  //   console.log("got here2");
  //   console.log("dates:", this.state.dates);
  //   for (let i = 0; i < this.state.dates.length; i++) {
  //     const strTime = this.state.dates[i].format("YYYY-MM-DD");
  //     console.log("strTime: ", strTime);
  //     if (!this.state.items[strTime]) {
  //       this.state.items[strTime] = [];
  //     }
  //     this.state.items[strTime].push({
  //       name: "Technician name",
  //       date: strTime
  //     });
  //     console.log("loop num:", i);
  //   }
  //   console.log("items: ", this.state.items);
  //   const newItems = {};
  //   Object.keys(this.state.items).forEach(key => {
  //     newItems[key] = this.state.items[key];
  //   });
  //   console.log("newitems: ", newItems);
  //   this.setState({
  //     items: newItems
  //   });
  //   console.log("items: ", this.state.items);
  // }

  componentDidMount() {
    const { navigation } = this.props;
    let dateArray = [];
    this.focusListener = navigation.addListener("didFocus", () => {
      console.log("loaded page");
      firebase.database().ref("schedule/").once("value").then(function(userSnapshot) {
          userSnapshot.forEach(function(snapshot) {
            dateArray.push(snapshot.val().times.start);
            console.log("dates loading:", snapshot.val().times.start);
          });
          return dateArray;
          }).then(function(dateArray) {
            console.log("got to second then");
            console.log(dateArray);
          });
    });
  }
  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
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

  renderItem(item) {
    return (
      <TouchableOpacity
        onPress={() => Alert.alert(item.name + "\n" + item.date)}
        style={styles.item}
      >
        <Text>{item.name}</Text>
        <Text>{item.date}</Text>
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
    return date.toISOString().split("T")[0];
  }
}
export default withNavigation(HorizontalCalendarList);
const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    height: 120
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 40,
    paddingBottom: 10,
    paddingLeft: 5
  }
});

HorizontalCalendarList.navigationOptions = {
  title: "Calendar"
};
