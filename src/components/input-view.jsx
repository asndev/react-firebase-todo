import React from 'react';

export default React.createClass({

  getInitialState: function() {
    return {
      text: ''
    };
  },

  render: function() {
    return <div className='input-group'>
      <input
        value={this.state.text}
        onChange={this._onInputChange}
        type='text'
        className='form-control' />
      <span className='input-group-btn'>
        <button
          onClick={this._onAddClick}
          className='btn btn-default'
          type='button'>
          Add
        </button>
      </span>
    </div>;
  },

  _onInputChange: function(evt) {
    this.setState({text: evt.target.value});
  },

  _onAddClick: function() {
    this.props.itemsStore.push({
      text: this.state.text,
      done: false
    });

    this.setState({text: ''});
  }

});
