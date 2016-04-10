import { createAction } from 'redux-actions';
import DB from './DB';
import { AsyncStorage } from 'react-native';
import InitialWorkout from './Fixtures'

import {
  SET_WORKING_OUT,
  GET_WORKING_OUT,
  GET_CURRENT_STATS,
  GET_CURRENT_WORKOUT,
  COMPLETE_EXERCISE,
  UPDATE_CURRENT_STATS,
  FINISH_WORKOUT,
  GET_NEW_WORKOUT
} from './actionTypes';

export const setIsWorkingOut = createAction(SET_WORKING_OUT, async isWorkingOut => {
  await AsyncStorage.setItem('IS_WORKING_OUT', isWorkingOut.toString());
  var value = await AsyncStorage.getItem('IS_WORKING_OUT');
  return value === 'true'
});

export const getIsWorkingOut = createAction(GET_WORKING_OUT, async () => {
  var value = await AsyncStorage.getItem('IS_WORKING_OUT');
  return value === 'true'
});

export const getCurrentStats = createAction(GET_CURRENT_STATS, async () => {
  let stats = [];

  await DB.pushups.find().then((resp) => {
      if (resp === null) {
        stats.push({
          activity: 'Push Ups',
          value: 0,
          score: 'Weak'
        })
      } else {
        stats.push({
          activity: 'Push Ups',
          value: resp[0].maxRep,
          totalValue: resp[0].total,
          score: resp[0].score
        })
      }
    }).catch((error) => {
      console.log(error)
    });

  await DB.situps.find().then((resp) => {
      if (resp === null) {
        stats.push({
          activity: 'Sit Ups',
          value: 0,
          score: 'Weak'
        })
      } else {
        stats.push({
          activity: 'Sit Ups',
          value: resp[0].maxRep,
          totalValue: resp[0].total,
          score: resp[0].score
        })
      }
    }).catch((error) => {
      console.log(error)
    });

  await DB.squats.find().then((resp) => {
      if (resp === null) {
        stats.push({
          activity: 'Squats',
          value: 0,
          score: 'Weak'
        })
      } else {
        stats.push({
          activity: 'Squats',
          value: resp[0].maxRep,
          totalValue: resp[0].total,
          score: resp[0].score
        })
      }
    }).catch((error) => {
      console.log(error)
    });


  await DB.dips.find().then((resp) => {
      if (resp === null) {
        stats.push({
          activity: 'Tricep Dips',
          value: 0,
          score: 'Weak'
        })
      } else {
        stats.push({
          activity: 'Tricep Dips',
          value: resp[0].maxRep,
          totalValue: resp[0].total,
          score: resp[0].score
        })
      }
    }).catch((error) => {
      console.log(error)
    });


  await DB.hipraises.find().then((resp) => {
      if (resp === null) {
        stats.push({
          activity: 'Hip Raises',
          value: 0,
          score: 'Weak'
        })
      } else {
        stats.push({
          activity: 'Hip Raises',
          value: resp[0].maxRep,
          totalValue: resp[0].total,
          score: resp[0].score
        })

      }
    }).catch((error) => {
      console.log(error)
    });

  await DB.lunges.find().then((resp) => {
      if (resp === null) {
        stats.push({
          activity: 'Lunges',
          value: 0,
          score: 'Weak'
        })
      } else {
        stats.push({
          activity: 'Lunges',
          value: resp[0].maxRep,
          totalValue: resp[0].total,
          score: resp[0].score
        })

      }
    }).catch((error) => {
      console.log(error)
    });

  return stats
});

export const getCurrentWorkout = createAction(GET_CURRENT_WORKOUT, async () => {
  let currentWorkout = [];

  const workoutArray = await DB.currentWorkout.find()

  if (workoutArray === null) {
    //adding current workout for the first time
    await DB.currentWorkout.add({
      currentWorkout: InitialWorkout
    }).then((response) => {
      currentWorkout = response.currentWorkout
    })
  } else {
    currentWorkout = workoutArray[0].currentWorkout;
  }

  return currentWorkout
});

export const completeExercise = createAction(COMPLETE_EXERCISE, async (activityId, value, skip) => {
  let currentWorkout = [];
  let currentUpdatedWorkout = [];
  let removedStep =[];
  let newWorkout = false;
  let updated = false;

  await DB.currentWorkout.find().then((resp) => {
    const currentSavedWorkout = resp[0].currentWorkout;
    removedStep = _.remove(currentSavedWorkout, (exercise) => {
      return exercise.activityId === activityId;
    });
    currentUpdatedWorkout = currentSavedWorkout;
  });

  if (!skip) {
    if (activityId === 1) {
      const pushups = await DB.pushups.find()

      if (pushups !== null) {
        await DB.pushups.updateById({
            total: pushups[0].total + value,
            maxRep: value,
            score: getPushupScore(value)
          }, pushups[0]._id).then(response => {
            updated = true;
          });
      } else {
        await DB.pushups.add({
            activityId: activityId,
            total: value,
            maxRep: value,
            score: getPushupScore(value)
          }).then(response => {
            updated = true;
          });
      }
    }

    if (activityId === 2) {
      const situps = await DB.situps.find()

      if (situps !== null) {
        await DB.situps.updateById({
            total: situps[0].total + value,
            maxRep: value,
            score: getSitupScore(value)
          }, situps[0]._id).then(response => {
            updated = true;
          });
      } else {
        await DB.situps.add({
            activityId: activityId,
            total: value,
            maxRep: value,
            score: getSitupScore(value)
          }).then(response => {
            updated = true;
          });
      }
    }

    if (activityId === 3) {
      const squats = await DB.squats.find()

      if (squats !== null) {
        await DB.squats.updateById({
            total: squats[0].total + value,
            maxRep: value,
            score: getSquatScore(value)
          }, squats[0]._id).then(response => {
            updated = true;
          });
      } else {
        await DB.squats.add({
            activityId: activityId,
            total: value,
            maxRep: value,
            score: getSquatScore(value)
          }).then(response => {
            updated = true;
          });
      }
    }

    if (activityId === 4) {
      const dips = await DB.dips.find()

      if (dips !== null) {
        await DB.dips.updateById({
            total: dips[0].total + value,
            maxRep: value,
            score: getDipScore(value)
          }, dips[0]._id).then(response => {
            updated = true;
          });
      } else {
        await DB.dips.add({
            activityId: activityId,
            total: value,
            maxRep: value,
            score: getDipScore(value)
          }).then(response => {
            updated = true;
          });
      }
    }

    if (activityId === 5) {
      const hipraises = await DB.hipraises.find()

      if (hipraises !== null) {
        await DB.hipraises.updateById({
            total: hipraises[0].total + value,
            maxRep: value,
            score: getHipRaiseScore(value)
          }, hipraises[0]._id).then(response => {
            updated = true;
          });
      } else {
        await DB.hipraises.add({
            activityId: activityId,
            total: value,
            maxRep: value,
            score: getHipRaiseScore(value)
          }).then(response => {
            updated = true;
          });
      }
    }

    if (activityId === 6) {
      const lunges = await DB.lunges.find()

      if (lunges !== null) {
        await DB.lunges.updateById({
            total: lunges[0].total + value,
            maxRep: value,
            score: getLungeScore(value)
          }, lunges[0]._id).then(response => {
            updated = true;
          });
      } else {
        await DB.lunges.add({
            activityId: activityId,
            total: value,
            maxRep: value,
            score: getLungeScore(value)
          }).then(response => {
            updated = true;
          });
      }
    }
  }

  //update DB with changed state of current workout
  if (currentUpdatedWorkout.length === 0) {
      newWorkout = true;
    }
  await DB.currentWorkout.updateById({
    currentWorkout: currentUpdatedWorkout
  }, 1).then((response) => {
    currentWorkout = response.currentWorkout;
  });

  return { currentWorkout, newWorkout, updated }
});

export const finishWorkout = createAction(FINISH_WORKOUT, async () => {
  let currArray = [];

  await DB.pushups.find().then((resp) => {
      if (resp === null) {
        currArray.push({
          activityId: 1,
          activity: 'Push Ups',
          value: 5
        })
      } else {
        currArray.push({
          activityId: 1,
          activity: 'Push Ups',
          value: resp[0].maxRep + 1
        })
      }
    }).catch((error) => {
      console.log(error)
    });

  await DB.situps.find().then((resp) => {
      if (resp === null) {
        currArray.push({
          activityId: 2,
          activity: 'Sit Ups',
          value: 5
        })
      } else {
        currArray.push({
          activityId: 2,
          activity: 'Sit Ups',
          value: resp[0].maxRep + 1
        })
      }
    }).catch((error) => {
      console.log(error)
    });

  await DB.squats.find().then((resp) => {
      if (resp === null) {
        currArray.push({
          activityId: 3,
          activity: 'Squats',
          value: 5
        })
      } else {
        currArray.push({
          activityId: 3,
          activity: 'Squats',
          value: resp[0].maxRep + 1
        })
      }
    }).catch((error) => {
      console.log(error)
    });


  await DB.dips.find().then((resp) => {
      if (resp === null) {
        currArray.push({
          activityId: 4,
          activity: 'Tricep Dips',
          value: 5
        })
      } else {
        currArray.push({
          activityId: 4,
          activity: 'Tricep Dips',
          value: resp[0].maxRep + 1
        })
      }
    }).catch((error) => {
      console.log(error)
    });


  await DB.hipraises.find().then((resp) => {
      if (resp === null) {
        currArray.push({
          activityId: 5,
          activity: 'Hip Raises',
          value: 5
        })
      } else {
        currArray.push({
          activityId: 5,
          activity: 'Hip Raises',
          value: resp[0].maxRep + 1
        })

      }
    }).catch((error) => {
      console.log(error)
    });

  await DB.lunges.find().then((resp) => {
      if (resp === null) {
        currArray.push({
          activityId: 6,
          activity: 'Lunges',
          value: 5
        })
      } else {
        currArray.push({
          activityId: 6,
          activity: 'Lunges',
          value: resp[0].maxRep + 1
        })
      }
    }).catch((error) => {
      console.log(error)
    });

  await DB.currentWorkout.updateById({
    currentWorkout: currArray
  }, 1).then((response) => {
    currArray = response.currentWorkout;
  });

  return currArray
});

const getPushupScore = (value) => {
  if (value > 10 && value <= 20) {
    return 'Novice'
  } else if (value > 20 && value <= 30) {
    return 'Fit'
  } else if (value > 30 && value <= 40) {
    return 'Strong'
  } else if (value > 40) {
    return 'Too Strong'
  } else {
    return 'Weak'
  }
};

const getSitupScore = (value) => {
  if (value > 20 && value <= 30) {
    return 'Novice'
  } else if (value > 30 && value <= 40) {
    return 'Fit'
  } else if (value > 40 && value <= 50) {
    return 'Strong'
  } else if (value > 50) {
    return 'Too Strong'
  } else {
    return 'Weak'
  }
};

const getSquatScore = (value) => {
  if (value > 10 && value <= 20) {
    return 'Novice'
  } else if (value > 20 && value <= 30) {
    return 'Fit'
  } else if (value > 30 && value <= 40) {
    return 'Strong'
  } else if (value > 40) {
    return 'Too Strong'
  } else {
    return 'Weak'
  }
};

const getDipScore = (value) => {
  if (value > 10 && value <= 20) {
    return 'Novice'
  } else if (value > 20 && value <= 30) {
    return 'Fit'
  } else if (value > 30 && value <= 40) {
    return 'Strong'
  } else if (value > 40) {
    return 'Too Strong'
  } else {
    return 'Weak'
  }
}

const getHipRaiseScore = (value) => {
  if (value > 15 && value <= 25) {
    return 'Novice'
  } else if (value > 25 && value <= 35) {
    return 'Fit'
  } else if (value > 35 && value <= 45) {
    return 'Strong'
  } else if (value > 45) {
    return 'Too Strong'
  } else {
    return 'Weak'
  }
}

const getLungeScore = (value) => {
  if (value > 10 && value <= 20) {
    return 'Novice'
  } else if (value > 20 && value <= 30) {
    return 'Fit'
  } else if (value > 30 && value <= 40) {
    return 'Strong'
  } else if (value > 40) {
    return 'Too Strong'
  } else {
    return 'Weak'
  }
}
