import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Form = ({
  input,
  setInput,
  todos,
  setTodos,
  keyGen,
  filter,
  setFilter,
}) => {
  const submitHandler = (e) => {
    e.preventDefault();
    if (input !== '')
      setTodos([
        ...todos,
        { text: input, isCompleted: false, isEditing: false, id: keyGen() },
      ]);
    setInput('');
  };
  return (
    <form onSubmit={submitHandler}>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button>
          <FontAwesomeIcon icon="mail-forward" />
        </button>
      </div>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </form>
  );
};
