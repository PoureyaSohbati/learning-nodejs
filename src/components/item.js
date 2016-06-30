import React, {Component, PropTypes} from 'react';
import {Button, Glyphicon, Well, Row, Col} from 'react-bootstrap';
import Form from './form';

import {remove} from '../actions/todo';

export default class Item extends Component {
  static propTypes = {
    index: PropTypes.number,
    item: PropTypes.string,
    dispatch: PropTypes.func
  }

  componentWillMount() {
    this.setState({edit: false, text: this.props.item});
  }

  done() {
    const {index, dispatch} = this.props;
    dispatch(remove(index));
  }

  edit() {
    this.setState({edit: true});
    // const {item, index, dispatch} = this.props;
    // dispatch(remove(index));
  }

  doneEditing() {
    this.setState({edit: false});
  }

  changeText(text) {
    this.setState({...this.state, text});
  }

  render() {
    const {edit, text} = this.state;
    const {index, item} = this.props;
    return (
      <Row>
        <Well>
          <Col xsOffset={2} xs={4}>
            {!edit ? item : <Form newItem={false} formNum={index} changeText={::this.changeText} doneEditing={::this.doneEditing} item={text}/>}
          </Col>
          <Col xsOffset={1} xs={2}>
            <Button bsStyle="success" onClick={::this.done}>
              <Glyphicon glyph="ok" />
            </Button>
          </Col>
          <Col xsOffset={1} xs={2}>
            <Button bsStyle="primary" onClick={::this.edit}>
              <Glyphicon glyph="edit" />
            </Button>
          </Col>
        </Well>
      </Row>
    );
  }
}
