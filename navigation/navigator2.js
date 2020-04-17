import React, {Component} from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AddBookingsScreen from '../screens/AddBookingsScreen.js'

import LinksScreen from '../screens/LinksScreen.js'

import HomeScreen from '../screens/HomeScreen.js'

import HomeScreen2 from '../screens/HomeScreen2.js'
import SecondScreen2 from '../screens/SecondScreen2.js'

import MenuScreen from '../screens/MenuScreen.js'
import ProfileScreen from '../screens/ProfileScreen.js'
import Sample2 from '../screens/sample2.js'

import ModalScreen from '../screens/ThirdScreen.js'

import ConfirmScreen from '../screens/ConfirmScreen.js'

import LoginScreen from '../screens/LoginScreen.js'
import SignupScreen from '../screens/SignupScreen.js'
import LoginFormScreen from '../screens/LoginFormScreen.js'

const MainStack = createStackNavigator(
  {
    Home: {
      screen: AddBookingsScreen,
      navigationOptions: {
        title: 'Home',
      }
    }
  },
  {
    initialRouteName: 'Home',
  }
)

const MainStack1 = createStackNavigator(
  {
    Home1: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Home1',
      }
    },  
    Details1: {
      screen: LinksScreen,
    },
    ConfirmScreen: {
      screen: ConfirmScreen
    },
  },
  {
    initialRouteName: 'Home1',
  }
)

const MainStack2 = createStackNavigator(
  {
    Home2: {
      screen: HomeScreen2,
      navigationOptions: {
        title: 'Home2',
      }
    },
    
    Details2: {
      screen: SecondScreen2,
    },
  },
  {
    initialRouteName: 'Home2',
  }
)

const MainStack3 = createStackNavigator(
  {
    
    Home3: {
      screen: MenuScreen,
      navigationOptions: {
        title: 'Home3',
      }
    },
    
    Profile: {
      screen: ProfileScreen
    },
    Sample2: {
      screen: Sample2
    },
  },
  {
    initialRouteName: 'Home3',
  }
)

const AppTabNavigator = createBottomTabNavigator(
    {
        Tab1: {
            screen: MainStack,
            navigationOptions: {
              tabBarLabel: 'Home',
              tabBarIcon: ({ focused, horizontal, tintColor }) => {
                  let IconComponent = Ionicons;
                  return <IconComponent
                    style={{ marginBottom: -4 }}
                    name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
                    size={23}
                    color={tintColor}
                  />;
                }
            },
        },
        Tab2: {
            screen: MainStack1,
            navigationOptions: {
              tabBarLabel: 'Home1',
              tabBarIcon: ({ focused, horizontal, tintColor }) => {
                  let IconComponent = Ionicons;
                  return <IconComponent
                    style={{ marginBottom: -4 }}
                    name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'}
                    size={23}
                    color={tintColor}
                  />;
                }
            },
        },
        Tab3: {
            screen: MainStack2,
            navigationOptions: {
                tabBarLabel: 'Home2',
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                  let IconComponent = Ionicons;
                  return <IconComponent
                    style={{ marginBottom: -4 }}
                    name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
                    size={23}
                    color={tintColor}
                  />;
                }
            }
        },
        Tab4: {
            screen: MainStack3,
            navigationOptions: {
                tabBarLabel: 'Home3',
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                  let IconComponent = Ionicons;
                  return <IconComponent
                    style={{ marginBottom: -4 }}
                    name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
                    size={23}
                    color={tintColor}
                  />;
                }
            }
        },
    }, 
);

MainStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

MainStack1.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

MainStack2.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

MainStack3.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};


const AppStack = createStackNavigator(
  {
    Main: {
        screen: AppTabNavigator,
        navigationOptions: {
            header: null,
        }
    },
    Modal: {
        screen: ModalScreen,
        navigationOptions: {
            header: null
        }
    }
  },
  {
    mode: "modal",
    initialRouteName: 'Main',
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
        screen: AppStack,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    },
    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: {
            header: null,
        }
    },
    LoginForm: {
        screen: LoginFormScreen,
        mode: 'modal'
    },
    Signup: {
        screen: SignupScreen,
    },
  },
  {
    initialRouteName: 'Main',
  }
);

const AppContainer = createAppContainer(RootStack);

export default AppContainer;