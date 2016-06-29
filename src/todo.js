import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import ColorButton from './colorButton';
import DocumentTitle from 'react-document-title';

class Todo extends Component {
  render() {
    return (
      <DocumentTitle title={'My Todo List'}>
        <ColorButton title={'Change Color'} />
      </DocumentTitle>
    );
  }
}

ReactDOM.render(<Todo />, document.getElementById('content'));
