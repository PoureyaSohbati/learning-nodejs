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
} from './types';

export function list() {
  return ({
    types: [GET_ITEM, GET_ITEM_SUCCESS, GET_ITEM_FAIL],
    promise: client => client.get('/todos')
  });
}

export function create(item) {
  return ({
    types: [NEW_ITEM, NEW_ITEM_SUCCESS, NEW_ITEM_FAIL],
    promise: client => client.post('/todos', {data: item})
  });
}

export function remove(index) {
  return ({
    types: [REMOVE_ITEM, REMOVE_ITEM_SUCCESS, REMOVE_ITEM_FAIL],
    promise: client => client.put('/todos', {data: '', index})
  });
}

export function edit(item, index) {
  return ({
    types: [EDIT_ITEM, EDIT_ITEM_SUCCESS, EDIT_ITEM_FAIL],
    promise: client => client.put('/todos', {data: item, index})
  });
}
