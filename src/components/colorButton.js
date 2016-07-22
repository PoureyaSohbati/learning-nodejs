import React, {Component, PropTypes} from 'react';
import {Button} from 'react-bootstrap';

const colorArray = ['primary', 'success', 'info', 'warning', 'danger'];
const initialState = {color: colorArray[0], colorIndex: 0};

export default class ColorButton extends Component {
  static propTypes = {
    title: PropTypes.string,
    onClick: PropTypes.func.isRequired
  }
  componentWillMount() {
    this.setState(initialState);
  }

  toggle(event) {
    const index = (this.state.colorIndex + 1) % colorArray.length;
    this.setState({
      color: colorArray[index],
      colorIndex: index
    });
    this.props.onClick(event);
  }

  render() {
    const {color} = this.state;
    const {title} = this.props;
    return (
      <Button bsStyle={color} onClick={::this.toggle} block>{title}</Button>
    );
  }
}
