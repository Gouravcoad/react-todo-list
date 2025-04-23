import './App.css';
import Myheader from './components/header';
import { Todos } from './components/Todos';
import { Footer } from './components/Footer';
import { AddTodo } from './components/AddTodo';
import { About } from './components/About';

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function App() {
  let initTodo;

  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const [todos, setTodos] = useState(initTodo);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title, desc) => {
    const myTodo = {
      id: uuidv4(),
      title: title,
      desc: desc,
    };
    setTodos([...todos, myTodo]);
  };

  const onDelete = (todo) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      setTodos(todos.filter((e) => e.id !== todo.id));
    }
  };

  return (
    <Router>
      <Myheader title="My Todos List" searchBar={true} />
      
      <Routes>
        <Route path="/" element={
          <>
            <AddTodo addTodo={addTodo} />
            <Todos todos={todos} onDelete={onDelete} />
          </>
        } />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;
