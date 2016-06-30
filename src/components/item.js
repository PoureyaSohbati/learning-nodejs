import React, {Component, PropTypes} from 'react';
import {Button, Glyphicon, Well, Row, Col} from 'react-bootstrap';

import {remove} from '../actions/todo';

export default class Item extends Component {
  static propTypes = {
    index: PropTypes.number,
    item: PropTypes.string,
    dispatch: PropTypes.func
  }

  doneFunc() {
    const {index, dispatch} = this.props;
    dispatch(remove(index));
  }

  render() {
    return (
      <Row>
        <Well>
          <Col xsOffset={2} xs={6} >
            {this.props.item}
          </Col>
        </Well>
        <Col xsOffset={2} xs={2} >
          <Button bsStyle="success" onClick={::this.doneFunc}>
            <Glyphicon glyph="ok" />
          </Button>
        </Col>
      </Row>
    );
  }
}
