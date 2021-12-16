import React, { useEffect, useState } from 'react';
import Todo from './components/Todo';
import { Button, FormControl, Input, InputLabel } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import firebase from 'firebase';
import db from './firebase';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const unsubscribe = db
      .collection('todos')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data() }))
        );
      });
    return () => {
      unsubscribe();
    };
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    if (input) {
      db.collection('todos').add({
        todo: input,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    setInput('');
    setMessage('');
  };

  return (
    <div className='app'>
      <h3 className='app__title'> Add a Todo</h3>
      <form className='app__form'>
        <FormControl>
          <div className='app__layout'>
            <InputLabel>Write a TO-DO</InputLabel>
            <Input
              placeholder='Write a TO-DO'
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <Button type='submit' onClick={addTodo}>
              <AddCircle />
            </Button>
          </div>
        </FormControl>
        <FormControl>
          <InputLabel>About the task</InputLabel>
          <Input
            placeholder='About the task'
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </FormControl>
      </form>
      {todos.map((todo, index) => (
        <Todo key={index} todo={todo} message={message} />
      ))}
    </div>
  );
};

export default App;
