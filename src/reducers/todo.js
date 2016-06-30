/* eslint no-multi-spaces: 0 */
import {
  NEW_ITEM,
  NEW_ITEM_SUCCESS,
  NEW_ITEM_FAIL,
  REMOVE_ITEM,
  REMOVE_ITEM_SUCCESS,
  REMOVE_ITEM_FAIL,
  GET_ITEM,
  GET_ITEM_SUCCESS,
  GET_ITEM_FAIL,
  EDIT_ITEM,
  EDIT_ITEM_SUCCESS,
  EDIT_ITEM_FAIL
} from '../actions/types';

const initialState = {
  list: [],
  loading: false,
  err: null
};

function load(state) {
  return {
    ...state,
    loading: true
  };
}

function success(state, action) {
  return {
    ...state,
    loading: false,
    list: action.result.body.todos
  };
}

function fail(state, action) {
  return {
    ...state,
    loading: false,
    err: action.error
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case NEW_ITEM:            return load(state);
    case NEW_ITEM_SUCCESS:    return success(state, action);
    case NEW_ITEM_FAIL:       return fail(state, action);
    case REMOVE_ITEM:         return load(state);
    case REMOVE_ITEM_SUCCESS: return success(state, action);
    case REMOVE_ITEM_FAIL:    return fail(state, action);
    case GET_ITEM:            return load(state);
    case GET_ITEM_SUCCESS:    return success(state, action);
    case GET_ITEM_FAIL:       return fail(state, action);
    case EDIT_ITEM:           return load(state);
    case EDIT_ITEM_SUCCESS:   return success(state, action);
    case EDIT_ITEM_FAIL:      return fail(state, action);
    default:                  return state;
  }
}
