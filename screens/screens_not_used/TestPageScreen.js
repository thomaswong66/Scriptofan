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

export default class TestPageScreen extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        let {navigation} = this.props;
        return (
            <View>
                <Text>Month:{navigation.getParam("month", "")}</Text>
            </View>
        )
    }
}