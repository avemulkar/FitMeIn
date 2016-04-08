/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {
  AsyncStorage,
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import reduceReducers from 'reduce-reducers';
import _ from 'lodash';

import rootReducer from './common/reducers'

import DB from './common/DB';
import Dashboard from './common/components/Dashboard';
import Workout from './common/components/Workout';
import ScrollableTabView from 'react-native-scrollable-tab-view';

class FitMeIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentStats: null,
      messages: []
    };
  };

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            FIT ME IN
          </Text>
        </View>
        <ScrollableTabView tabBarPosition="bottom">
          <Dashboard tabLabel="Dashboard" />
          <Workout tabLabel="Workout"/>
        </ScrollableTabView>
      </View>
    );
  }
}

const appStateReducer = reduceReducers(
  (state, action) => ({
    ...state,
    ..._.mapValues(rootReducer, (reducer, name) => reducer(state[name], action))
  })
);

function appReducer(state = {}, action) {
  const appState = appStateReducer(state, action);

  return {
    ...appState
  };
}

const createStoreWithMiddleware = applyMiddleware(thunk, promise)(createStore)
const store = createStoreWithMiddleware(appReducer)

const wrapper = () => {
  return (
    <Provider store={store}>
      {<FitMeIn />}
    </Provider>
  )
}


const styles = StyleSheet.create({
  container: {
     flex: 1
  },
  header: {
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: '#ffb190'
  },
  headerText: {
    fontSize: 30,
    color: 'white',
    fontWeight: '800',
    letterSpacing: 1
  }
});

AppRegistry.registerComponent('FitMeIn', () => wrapper);
