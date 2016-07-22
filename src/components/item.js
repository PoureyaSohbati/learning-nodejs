import React, {Component, PropTypes} from 'react';
import {ButtonGroup, Button, Glyphicon, Well, Row, Col} from 'react-bootstrap';
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
    const wellStyle = {
      marginBottom: '15px',
      marginTop: '5px'
    };
    const buttonStyle = {
      padding: '10px',
      paddingLeft: '14px'
    };
    const {edit, text} = this.state;
    const {index, item} = this.props;
    if (!edit) {
      return (
        <Row>
          {/* <Well>*/}
          <Col xsOffset={2} xs={7}>
            <div style={wellStyle}>
              <Well>
                {item}
              </Well>
            </div>
          </Col>

          <Col xs={1}>
            <ButtonGroup block bsSize="large" style={buttonStyle}>
              <Button bsStyle="success" onClick={::this.done}>
                <Glyphicon glyph="ok" />
              </Button>
              <Button bsStyle="primary" onClick={::this.edit}>
                <Glyphicon glyph="edit" />
              </Button>
            </ButtonGroup>
          </Col>
          {/* </Well>*/}
        </Row>
      );
    } else {
      return (
        <Row>
          {/* <Well>*/}
          <Col xs={12}>
            <Form
              newItem={false}
              formNum={index}
              changeText={::this.changeText}
              doneEditing={::this.doneEditing}
              item={text}
            />
          </Col>
          {/* </Well>*/}
        </Row>
      );
    }
  }
}
