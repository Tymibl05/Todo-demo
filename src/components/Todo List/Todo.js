import './todo.css';
import { Form } from './Form';
import { List } from './List';
import { useState, useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMailForward } from '@fortawesome/free-solid-svg-icons';
library.add(faMailForward);

export const Todo = () => {
  const keyGen = () => {
    let n = Math.random() * 100;
    return n.toFixed(3);
  };

  // STATES
  const [todos, setTodos] = useState(() => {
    const localTodos = JSON.parse(localStorage.getItem('todos'));
    return localTodos || [];
  });
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('incomplete');
  const [filteredTodos, setFilteredTodos] = useState([]);

  // EFFECTS
  useEffect(() => {
    setLocalTodos();
    filterHandler();
  }, [filter, todos]);

  // FUNCTIONS
  const setLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };
  const filterHandler = () => {
    setFilteredTodos(
      todos.filter((item) => {
        if (filter === 'all') return item;
        else if (item.isComplete && filter === 'completed') return item;
        else if (!item.isComplete && filter === 'incomplete') return item;
      })
    );
  };

  return (
    <div id="Todo">
      <h1>Todo List</h1>
      <Form
        input={input}
        setInput={setInput}
        todos={todos}
        setTodos={setTodos}
        keyGen={keyGen}
        filter={filter}
        setFilter={setFilter}
      />
      <List todos={todos} setTodos={setTodos} filteredTodos={filteredTodos} />
    </div>
  );
};
