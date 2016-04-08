'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

import RowTile from './RowTile';

import _ from 'lodash';
import Exercises from '../Fixtures';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { currentStatsSelector, updatedCurrentStatsSelector } from '../reducers/workoutReducer';
import * as actionCreators from '../actionCreators';

class Dashboard extends Component {
  static propTypes = {
    currentStats: React.PropTypes.array,
    tabLabel: React.PropTypes.string,
    getCurrentStats: React.PropTypes.func,
    updateCurrentStats: React.PropTypes.bool
  };

  componentWillMount = () => {
    this.props.getCurrentStats()
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      dataSource: ds.cloneWithRows(this.props.currentStats)
    })
  };

  componentWillReceiveProps = (nextProps) => {
    if ( nextProps.updateCurrentStats ) {
      nextProps.getCurrentStats()
    }
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      dataSource: ds.cloneWithRows(nextProps.currentStats)
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.dataSource ?
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <RowTile rowData={rowData}/>}
        /> : null}
      </View>
    );
  }
}

export default Dashboard = connect(createStructuredSelector({
  currentStats: currentStatsSelector,
  updateCurrentStats: updatedCurrentStatsSelector
}), {
  getCurrentStats: actionCreators.getCurrentStats
})(Dashboard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c2edff',
  }
});
