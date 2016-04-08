'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import _ from 'lodash';

export default class RowTile extends Component {
  render() {
    const rowData = this.props.rowData;

    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <Text style={styles.letter}>{_.upperFirst(rowData.activity)}</Text>
          <View style={styles.metadataContainer}>
            <Text style={styles.letterValue}>Last Rep: {rowData.value}</Text>
            <Text style={styles.scoreValue}>
              <Text style={getScoreColor(rowData.score)}>{rowData.score}</Text>
            </Text>
          </View>
        </View>
        <View style={styles.totalValueContainer}>
          <Text style={styles.totalValueLabel}>
            All-time
          </Text>
          <View style={styles.valueContainer}>
            <Text style={styles.totalValue}>
              {rowData.totalValue ? rowData.totalValue : 0}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    flexDirection: 'row',
    marginHorizontal: 9,
    marginTop: 7,
    height: 90
  },
  mainContainer: {
    flex: 3,
    backgroundColor: '#F5FCFF',
    borderTopWidth: 2,
    borderTopColor: '#00b736'
  },
  letter: {
    color: 'slategray',
    fontSize: 30,
    fontWeight: '400',
    marginVertical: 2,
    marginHorizontal: 10
  },
  metadataContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  letterValue: {
    flex: 2,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 20,
    color: 'midnightblue'
  },
  scoreValue: {
    flex: 2,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 20,
    color: 'midnightblue',
    textAlign: 'right'
  },
  totalValueContainer: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  totalValueLabel: {
    fontSize: 15,
    textAlign: 'center',
    color: 'silver'
  },
  valueContainer : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  totalValue: {
    fontSize: 27,
    color: '#00b736'
  },
});

const getScoreColor = (score) => {
  if (score === 'Healthy') {
    return {
      color: 'orange'
    }
  } else if (score === 'Fit') {
    return {
      color: 'green'
    }
  } else if (score === 'Strong') {
    return {
      color: 'darkturquoise'
    }
  } else if (score === 'Too Strong') {
    return {
      color: 'darkviolet'
    }
  } else {
    return {
      color: 'red'
    }
  }
}
