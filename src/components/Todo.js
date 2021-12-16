import React, { useState } from 'react';
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Modal,
} from '@mui/material';
import { AddTask, DeleteForever, Edit } from '@mui/icons-material';
import firebase from 'firebase';
import db from '../firebase';
import '../css/Todo.css';

const Todo = ({ todo }) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(todo.todo.todo);
  const [message, setMessage] = useState(todo.todo.message);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    if (input && message) {
      db.collection('todos').doc(todo.id).set(
        {
          todo: input,
          message: message,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    }
    setInput(todo.todo.todo);
    setMessage(todo.todo.message);
    setOpen(false);
  };

  return (
    <div className='todo'>
      <Modal
        className='todo__modal'
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 350,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
        open={open}
      >
        <div>
          <h3 className='todo__title'>Update Todo</h3>
          <form className='todo__form'>
            <FormControl>
              <InputLabel>Edit TO-DO</InputLabel>
              <Input
                placeholder='Edit TO-DO'
                type='text'
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Edit About the Task</InputLabel>
              <Input
                placeholder='Edit About the Task'
                type='text'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </FormControl>
            <Button type='submit' onClick={handleClose}>
              <AddTask />
            </Button>
          </form>
        </div>
      </Modal>
      <List className='todo__list'>
        <ListItem>
          <ListItemText
            primary={todo.todo.todo}
            secondary={todo.todo.message}
          />
        </ListItem>
        <Button onClick={handleOpen}>
          <Edit />
        </Button>
        <Button
          onClick={() => {
            db.collection('todos').doc(todo.id).delete();
          }}
        >
          <DeleteForever />
        </Button>
      </List>
    </div>
  );
};

export default Todo;
