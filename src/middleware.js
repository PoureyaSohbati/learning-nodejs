import Client from './api';

const client = new Client();

export default function middleware(dispatch, getState) {
  return next => action => {
    const {types, promise, ...rest} = action;
    if (!promise) return next(action);
    const [START, SUCCESS, ERROR] = types;
    next({...rest, type: START});
    return promise(client, dispatch, getState).then(result => {
      next({...rest, type: SUCCESS, result});
    }).catch((error) => {
      next({...rest, type: ERROR, error});
    });
  };
}
