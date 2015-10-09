var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var InputView = require('./components/input-view');
var List = require('./components/list');

const fbUrl = 'https://scorching-fire-4745.firebaseio.com/';

var App = React.createClass({
  mixins: [ReactFire],

  getInitialState: function() {
    return {
      items: [],
      loaded: false
    };
  },

  componentWillMount: function() {
    this.fb = new Firebase(fbUrl + 'todo-items/');
    this.bindAsArray(this.fb.limitToLast(25), 'items');
    this.fb.on('value', this._onLoaded);
  },

  render: function() {
    return <div className='row panel panel-default'>
      <div className='col-md-8 col-md-offset-2'>
        <h2 className='text-center'>
          Todos
        </h2>
        <InputView itemsStore={this.firebaseRefs.items} />
        <hr/>
        <div className={'content ' + (this.state.loaded ? 'loaded' : '' )}>
          <List items={this.state.items} />
          {this._deleteButton()}
        </div>
      </div>
    </div>
  },

  _onLoaded: function() {
    this.setState({
      loaded: true
    });
  },

  _deleteButton: function() {
    if (!this.state.loaded) {
      return '';
    } else {
      return <div className='text-center clear-complete'>
        <hr/>
        <button
          type='button'
          onClick={this._onDeleteButtonClick}
          className='btn btn-default'>
          Clear Completed
        </button>
      </div>
    }
  },

  _onDeleteButtonClick: function() {
    this.state.items.forEach(e => {
      if (e.done) {
        this.fb.child(e['.key']).remove();
      }
    });
  }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.todoapp'));
