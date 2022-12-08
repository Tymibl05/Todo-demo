import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faTrashAlt,
  faRotateBack,
  faPen,
} from '@fortawesome/free-solid-svg-icons';

export const List = ({ todos, setTodos, filteredTodos }) => {
  const formRef = useRef();
  const inputRef = useRef();
  const [editTodo, setEditTodo] = useState('');
  const completeHandler = (e) => {
    setTodos(
      todos.filter((item) => {
        if (item.id == e.target.value) item.isComplete = !item.isComplete;
        return item;
      })
    );
  };
  const deleteHandler = (e) => {
    setTodos(todos.filter((item) => item.id !== e.target.value));
  };
  const editInput = async (e) => {
    setEditTodo('');
    await setTodos(
      todos.filter((item) => {
        if (item.id == e.target.value) item.isEditing = !item.isEditing;
        else item.isEditing = false;
        return item;
      })
    );
    inputRef.current.focus();
  };
  const submitEdit = (e) => {
    e.preventDefault();

    if (editTodo !== '') {
      setTodos(
        todos.filter((item) => {
          if (item.id === formRef.current.id) item.text = editTodo;
          item.isEditing = false;
          return item;
        })
      );
      setEditTodo('');
    }
  };
  return (
    <ul>
      {filteredTodos.map((item) => (
        <div key={item.id}>
          {item.isEditing ? (
            <form onSubmit={submitEdit} id={item.id} ref={formRef}>
              <input
                type="text"
                placeholder={item.text}
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
                ref={inputRef}
              />
            </form>
          ) : (
            <li className={`${item.isComplete ? 'completed-item' : ''}`}>
              {item.text}
            </li>
          )}

          <button value={item.id} className="edit-btn" onClick={editInput}>
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button
            value={item.id}
            onClick={completeHandler}
            className={`${!item.isComplete ? 'complete-btn' : 'undo-btn'}`}
          >
            {!item.isComplete ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              <FontAwesomeIcon icon={faRotateBack} />
            )}
          </button>
          <button
            value={item.id}
            onClick={deleteHandler}
            className="delete-btn"
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      ))}
    </ul>
  );
};
