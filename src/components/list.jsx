var React = require('react');
var TodoItem = require('./todo-item');

export default React.createClass({

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

      this.props.items.forEach(function(item) {
        todos.push(
          <TodoItem
            item={item}
            key={item['.key']}
            >
          </TodoItem>
        );
      }, this);

      return todos;
    }
  }

});
