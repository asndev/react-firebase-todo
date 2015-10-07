var React = require('react');
var FireBase = require('firebase');

var fbUrl = 'https://scorching-fire-4745.firebaseio.com/';

module.exports = React.createClass({

  getInitialState: function() {
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      dirty: false
    };
  },

  componentWillMount: function() {
    this.fb = new Firebase(fbUrl + '/items/' + this.props.item.key);
  },

  render: function() {
    return <div className='item-group'>
      <span className='input-group-addon'>
        <input
          type='checkbox'
          checked={this.state.done}
          onChange={this._onCheckboxChange}
        />
      </span>
      <input type='text'
        disabled={this.state.done}
        className='form-control'
        value={this.state.text}
        onChange={this._onTextChange}
        />
      <span className='input-group-btn'>
        {this._dirtyButton()}
        <button
          className='btn btn-default'
          onClick={this._onDeleteClick}
          >
          Delete
        </button>
      </span>
    </div>
  },

  _dirtyButton: function() {
    if (!this.state.dirty) {
      return '';
    } else {
      return [
        <button
          className="btn btn-default"
          onClick={this._onSaveClick}
          >
          Save
        </button>,
        <button
          onClick={this._onUndoClick}
          className="btn btn-default"
          >
          Undo
        </button>
      ];
    }
  },

  _onCheckboxChange: function(e) {
    var updated = { done: e.target.checked };
    this.setState(updated);
    this.fb.update(updated);
  },

  _onTextChange: function(e) {
    this.setState({
      text: e.target.value,
      dirty: true
    });
  },

  _onDeleteClick: function() {
    this.fb.remove();
  },

  _onSaveClick: function() {
    this.fb.update({ text: this.state.text });
    this.setState({ dirt: false });
  },

  _onUndoClick: function() {
    this.setState({
      text: this.props.item.text,
      dirty: false
    });
  }

});
