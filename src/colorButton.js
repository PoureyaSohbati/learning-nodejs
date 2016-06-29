import React, {Component, PropTypes} from 'react';
import {Button} from 'react-bootstrap';

const colorArray = ['default', 'primary', 'success', 'info', 'warning', 'danger', 'link'];
const initialState = {color: colorArray[0], colorIndex: 0};

export default class ColorButton extends Component {
  static propTypes = {
    title: PropTypes.string
  }
  componentWillMount() {
    this.setState(initialState);
  }

  toggle() {
    const index = (this.state.colorIndex + 1) % colorArray.length;
    this.setState({
      color: colorArray[index],
      colorIndex: index
    });
  }

  render() {
    const {color} = this.state;
    const {title} = this.props;
    return (
      <Button bsStyle={color} onClick={::this.toggle}>{title}</Button>
    );
  }
}
