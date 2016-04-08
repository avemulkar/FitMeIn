'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import _ from 'lodash';

import Button from 'react-native-button';

export default class ExerciseCard extends Component {
  static propTypes = {
    exercise: React.PropTypes.object,
    completeExercise: React.PropTypes.func,
  };

  componentDidMount = () => {
    this.setState({
      exerciseValue: this.props.exercise.value
    })
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      exerciseValue: nextProps.exercise.value
    })
  };

  _handleSkip(activityId, value, completeExercise) {
    completeExercise(activityId, value, true);
  };

  _handleComplete(activityId, value, completeExercise) {
    completeExercise(activityId, value, false);
  };

  _handleIncreaseValue = () => {
    this.setState({
      exerciseValue: this.state.exerciseValue + 1
    })
  };

  _handleDecreaseValue = () => {
    (this.state.exerciseValue > 0) && this.setState({
      exerciseValue: this.state.exerciseValue - 1
    })
  };

  render() {
    return (
      <View style={styles.listContainer}>
        <View style={styles.exerciseTextContainer}>
          <Text style={styles.exerciseText}>
            {this.props.exercise.activity}
          </Text>
          <View style={styles.actionsContainer}>
            <Button
              containerStyle={styles.skipButtonContainer}
              style={
                {
                  color: 'midnightblue',
                  fontSize: 13,
                  letterSpacing: 1
                }
              }
              styleDisabled={{color: 'red'}}
              onPress={_.partial(
                this._handleSkip,
                this.props.exercise.activityId,
                (this.state && this.state.exerciseValue),
                this.props.completeExercise
              )}
            >
              SKIP
            </Button>
            <Button
              containerStyle={styles.completeButtonContainer}
              style={
                {
                  color: 'midnightblue',
                  fontSize: 13,
                  letterSpacing: 1
                }
              }
              styleDisabled={{color: 'red'}}
              onPress={_.partial(
                this._handleComplete,
                this.props.exercise.activityId,
                (this.state && this.state.exerciseValue),
                this.props.completeExercise
              )}
            >
              COMPLETE
            </Button>
          </View>
        </View>
        <View style={styles.exerciseValueContainer}>
          <Text style={styles.exerciseValue}>
            {this.state && this.state.exerciseValue}
          </Text>
          <View style={styles.valueActionsContainer}>
            <Button
              containerStyle={styles.rightButtonContainer}
              style={
                {
                  color: 'midnightblue',
                  fontSize: 13,
                  letterSpacing: 1
                }
              }
              styleDisabled={{color: 'red'}}
              onPress={this._handleDecreaseValue}
            >
              {'<'}
            </Button>
            <Button
              containerStyle={styles.rightButtonContainer}
              style={
                {
                  color: 'midnightblue',
                  fontSize: 13,
                  letterSpacing: 1
                }
              }
              styleDisabled={{color: 'red'}}
              onPress={this._handleIncreaseValue}
            >
              {'>'}
            </Button>

          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 7,
    marginHorizontal: 9,
    flex: 4,
    flexDirection:'row',
    height: 90
  },
  exerciseTextContainer: {
    flex: 3,
    backgroundColor: '#F5FCFF',
    borderTopWidth: 2,
    borderTopColor: '#00b736'
  },
  exerciseText: {
    paddingTop: 5,
    color: 'slategray',
    fontSize: 30,
    fontWeight: '400',
    textAlign: 'center',
    letterSpacing: 1
  },
  exerciseValueContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },
  exerciseValue: {
    fontSize: 40,
    textAlign: 'center',
    color: '#00b736',
    paddingTop: 5
  },
  completeButtonContainer: {
    flex: 2,
    alignSelf: 'flex-end',
    padding: 5,
  },
  skipButtonContainer: {
    flex: 2,
    alignSelf: 'flex-end',
    padding: 5,
  },
  actionsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rightButtonContainer: {
    flex: 2,
    alignSelf: 'flex-end',
    padding: 5
  },
  leftButtonContainer: {
    flex: 2,
    alignSelf: 'flex-start',
    padding: 5
  },
  valueActionsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  }
});
