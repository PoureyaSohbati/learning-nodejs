import React, {Component, PropTypes} from 'react';
import {FormGroup, FormControl, ControlLabel, Col, Row} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import {create} from '../actions/todo';
import ColorButton from './colorButton';

@connect(() => ({}))
export default class Form extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  handleSubmit(event) {
    event.preventDefault();
    const newTodo = ReactDOM.findDOMNode(this.refs.newTodo).value;
    return newTodo !== '' && this.props.dispatch(create(newTodo));
  }

  render() {
    return (
      <div>
        <Row>
          <form>
            <Col xs={6} xsOffset={2}>
              <FormGroup controlId="formControlsText">
                <ControlLabel>New Todo Item</ControlLabel>
                <FormControl type="text" ref="newTodo" placeholder="Enter a Todo" />
              </FormGroup>
            </Col>
            <Col xs={4}>
              <ColorButton title="Save" onClick={::this.handleSubmit} />
            </Col>
          </form>
        </Row>
      </div>
    );
  }
}
