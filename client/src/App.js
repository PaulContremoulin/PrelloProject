import React, { Component } from 'react';

import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import VisibilityFilters from "./components/VisibilityFilters";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <h1>TODO list</h1>
            <AddTodo />
            <TodoList />
            <VisibilityFilters />
        </header>
      </div>
    );
  }
}

export default App;
