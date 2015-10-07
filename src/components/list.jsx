var React = require('react');
var TodoItem = require('./todo-item');

module.exports = React.createClass({

  render: function() {
    return <div>
      {this._renderTodoList()}
    </div>
  },

  _renderTodoList: function() {
    if (!this.props.items) {
      return <h3>Add a Todo Item</h3>;
    } else {
      var todos = [];

      for (var key in this.props.items) {
        if (key !== '.key' && key !== '.value') {
          var item = this.props.items[key];
          item.key = key;

          todos.push(
            <TodoItem
              item={item}
              key={key}
              >
            </TodoItem>
          );
        }
      }

      return todos;
    }
  }

});
