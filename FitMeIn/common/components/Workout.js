'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Picker
} from 'react-native';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Button from 'react-native-button';
import ExerciseCard from './ExerciseCard';
import DB from '../DB';

import { isWorkingOutSelector, currentWorkoutSelector, fetchNewWorkoutSelector } from '../reducers/workoutReducer';
import * as actionCreators from '../actionCreators';

class Workout extends Component {

  static propTypes = {
    isWorkingOut: React.PropTypes.bool,
    setIsWorkingOut: React.PropTypes.func,
    getIsWorkingOut: React.PropTypes.func,
    currentWorkout: React.PropTypes.array,
    getCurrentWorkout: React.PropTypes.func,
    completeExercise: React.PropTypes.func,
    finishWorkout: React.PropTypes.func,
    getNewWorkout: React.PropTypes.func,
    fetchNewWorkout: React.PropTypes.bool
  };

  componentWillMount = () => {
    this.props.getIsWorkingOut();
    this.props.getCurrentWorkout();
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      dataSource: ds.cloneWithRows(this.props.currentWorkout)
    })
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.fetchNewWorkout) {
      this.props.finishWorkout();
      this.props.setIsWorkingOut(false);
    }
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      dataSource: ds.cloneWithRows(nextProps.currentWorkout)
    });
  };

  _handleBegin = () => {
    this.props.setIsWorkingOut(true);
  };

  _handleFinish = () => {
    this.props.setIsWorkingOut(false);
    this.props.finishWorkout();
  };


  render() {
    const { isWorkingOut } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.selectBar}>
          {isWorkingOut ? <Button
            containerStyle={styles.buttonContainer}
            style={{
              color: 'red',
              letterSpacing: 1
            }}
            styleDisabled={{color: 'red'}}
            onPress={this._handleFinish}
          >
            Reset Workout
          </Button>
          :
          <Button
            containerStyle={styles.buttonContainer}
            style={{
              color: 'midnightblue',
              letterSpacing: 1
            }}
            styleDisabled={{color: 'red'}}
            onPress={this._handleBegin}
          >
            Begin Workout
          </Button>
        }

        </View>
        {isWorkingOut ?
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <ExerciseCard
              exercise={rowData}
              completeExercise={this.props.completeExercise}
              updateCurrentStats={this.props.updateCurrentStats}/>}
          />
          : WelcomeScreen()
        }
      </View>
    );
  }
}

export default Workout = connect(createStructuredSelector({
  isWorkingOut: isWorkingOutSelector,
  currentWorkout: currentWorkoutSelector,
  fetchNewWorkout: fetchNewWorkoutSelector
}), {
  setIsWorkingOut: actionCreators.setIsWorkingOut,
  getIsWorkingOut: actionCreators.getIsWorkingOut,
  getCurrentWorkout: actionCreators.getCurrentWorkout,
  completeExercise: actionCreators.completeExercise,
  updateCurrentStats: actionCreators.updateCurrentStats,
  finishWorkout: actionCreators.finishWorkout,
  getNewWorkout: actionCreators.getNewWorkout
})(Workout);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c2edff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  selectBar: {
    backgroundColor: '#F5FCFF',
  },
  buttonContainer: {
    flex: 1,
    padding: 12,
    backgroundColor: '#F5FCFF',
    alignSelf: 'center'
  },
  buttonSelector: {
    borderRadius: 4,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#B8C",
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c2edff',
  },
  welcomeMessage: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  catchPhrase: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 30,

  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

});

const WelcomeScreen = () => {
  return (
    <View style={styles.welcomeContainer}>
      <Text style={styles.welcomeMessage}>
        Welcome to Fit Me In!
      </Text>
      <Text style={styles.catchPhrase}>
        Build a little strength everyday
      </Text>
      <Text style={styles.instructions}>
        To get started, click on Begin Workout.
      </Text>
      <Text style={styles.instructions}>
        Each workout includes a set of 6 simple strength exercises and should take 10 - 15 minutes.
      </Text>
      <Text style={styles.instructions}>
        As you work your way through the exercises your progress is tracked on your dashboard.
      </Text>
      <Text style={styles.instructions}>
        Hope you enjoy incrementally working on your strength!
      </Text>
    </View>
  )
}
