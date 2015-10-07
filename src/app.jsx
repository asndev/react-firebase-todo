var React = require('react');

var App = React.createClass({
  render: function() {
    return <h2>Foobar.</h2>;
  }
});

var element = React.createElement(App, {});

React.render(element, document.querySelector('.todoapp'));
