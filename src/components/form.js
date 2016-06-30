import React, {Component, PropTypes} from 'react';
import {FormGroup, FormControl, ControlLabel, Col, Row} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import {create, edit} from '../actions/todo';
import ColorButton from './colorButton';

@connect(() => ({}))
export default class Form extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    newItem: PropTypes.bool,
    item: PropTypes.string,
    changeText: PropTypes.func,
    formNum: PropTypes.number,
    doneEditing: PropTypes.func
  }

  componentWillMount() {
    const text = this.props.item ? this.props.item : false;
    this.setState({text});
  }

  handleSubmit(event) {
    const {dispatch, newItem, formNum} = this.props;
    event.preventDefault();
    if (newItem) {
      const newTodo = ReactDOM.findDOMNode(this.refs.newTodo).value;
      if (newTodo !== '') {
        ReactDOM.findDOMNode(this.refs.newTodo).value = '';
        dispatch(create(newTodo));
      }
    } else {
      const editTodo = ReactDOM.findDOMNode(this.refs[formNum]).value;
      if (editTodo !== '') {
        this.props.doneEditing();
        dispatch(edit(editTodo, formNum));
      }
    }
  }

  handleChangeText(event) {
    const text = event.target.value;
    this.props.changeText(text);
  }

  makeForm() {
    const {item, formNum} = this.props;
    return (
      this.props.newItem ?
        <div>
          <ControlLabel>New Todo Item</ControlLabel>
          <FormControl type="text" ref="newTodo" placeholder="Enter a Todo" />
        </div>
        :
        <FormControl type="text" ref={formNum} onChange={::this.handleChangeText} value={item} />
    );
  }

  render() {
    return (
      <div>
        <Row>
          <form>
            <Col xs={6} xsOffset={2}>
              <FormGroup controlId="formControlsText">
                {this.makeForm()}
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
