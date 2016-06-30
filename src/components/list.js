import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {list as listItems} from '../actions/todo';
import Item from './item';

@connect(state => ({
  list: state.list,
  loading: state.loading
}))
export default class List extends Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.string),
    loading: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.dispatch(listItems());
  }

  render() {
    const {list, loading, dispatch} = this.props;

    return (
      <div>
        {!loading && list.map((v, i) => (
          <Item key={i} index={i} item={v} dispatch={dispatch} />
        ))}
      </div>
    );
  }
}
