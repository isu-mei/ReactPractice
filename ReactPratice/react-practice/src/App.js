import React, { useState, useRef, useEffect } from 'react';
import Todolist from './TodoList';
import uuidv4 from 'uuid/v4';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodosString = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedTodosString) {
      setTodos([]);
      return; 
    } 
      
    const storedTodos = JSON.parse(storedTodosString);
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify ())
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [ ...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null 
  }

  function handleClearTodos () {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <Todolist todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text" />
      <button onClink={handleAddTodo}>Add Todo</button>
      <button onClink={handleClearTodos}>Clear Completed Todos</button>
      <div>{todos.filter(todo => !todo.complete).length}  left to do</div>
    </>
  ) 
}

export default App;
