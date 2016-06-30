import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import DocumentTitle from 'react-document-title';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

import Form from './components/form';
import reducer from './reducers/todo';
import middleware from './middleware';
import List from './components/list';

const store = applyMiddleware(middleware)(createStore)(reducer);

class Todo extends Component {
  render() {
    return (
      <DocumentTitle title={'My Todo List'}>
        <div>
          <List />
          <Form newItem />
        </div>
      </DocumentTitle>
    );
  }
}

ReactDOM.render(
  <Provider store={store}><Todo /></Provider>,
  document.getElementById('content')
);
