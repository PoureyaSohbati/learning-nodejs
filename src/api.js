import agent from 'superagent';
import superagent from 'superagent-promise';

const request = superagent(agent, Promise);

export default class Client {
  get(path) {
    return request.get(path);
  }
  post(path, data) {
    return request.post(path, data);
  }
  del(path) {
    return request.del(path);
  }
  put(path, data) {
    return request.put(path, data);
  }
}
