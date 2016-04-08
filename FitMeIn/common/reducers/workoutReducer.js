import { handleActions } from 'redux-actions';

import {
  SET_WORKING_OUT,
  GET_WORKING_OUT,
  GET_CURRENT_STATS,
  GET_CURRENT_WORKOUT,
  COMPLETE_EXERCISE,
  UPDATE_CURRENT_STATS,
  FINISH_WORKOUT,
  GET_NEW_WORKOUT
} from '../actionTypes';
import InitialWorkout from '../Fixtures'

const initialState = {
  isWorkingOut: false,
  fetchNewWorkout: null,
  currentStats: [],
  currentWorkout: [],
  updatedCurrentStats: null
};

export default handleActions({
  [SET_WORKING_OUT]: (state, action) => {
    return {
      ...state,
      isWorkingOut: action.payload
    }
  },

  [GET_WORKING_OUT]: (state, action) => {
    return {
      ...state,
      isWorkingOut: action.payload
    }
  },

  [GET_CURRENT_STATS]: (state, action) => {
    return {
      ...state,
      currentStats: action.payload,
      updatedCurrentStats: false
    }
  },

  [GET_CURRENT_WORKOUT]: (state, action) => {
    console.log('ACTION', action.payload);
    return {
      ...state,
      currentWorkout: action.payload
    }
  },

  [COMPLETE_EXERCISE]: (state, action) => {
    if (action.payload.newWorkout) {
      return {
        ...state,
        isWorkingOut: false,
        fetchNewWorkout: true,
        updatedCurrentStats: action.payload.updated,
        currentWorkout: action.payload.currentWorkout
      }
    }
    return {
      ...state,
      updatedCurrentStats: action.payload.updated,
      currentWorkout: action.payload.currentWorkout
    }
  },

  [FINISH_WORKOUT]: (state, action) => {
    return {
      ...state,
      isWorkingOut: false,
      fetchNewWorkout: false,
      currentWorkout: action.payload
    }
  },

  [GET_NEW_WORKOUT]: (state, action) => {
    return {
      ...state,
      currentWorkout: action.payload
    }
  }
}, initialState);


export const isWorkingOutSelector = state => state.workout.isWorkingOut;

export const currentStatsSelector = state => state.workout.currentStats;

export const currentWorkoutSelector = state => state.workout.currentWorkout;

export const updatedCurrentStatsSelector = state => state.workout.updatedCurrentStats;

export const fetchNewWorkoutSelector = state => state.workout.fetchNewWorkout;
