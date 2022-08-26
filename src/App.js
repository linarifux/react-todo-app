import { useState } from "react";
import "./App.css";

import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [text, setText] = useState("");
  const [editMode, setEditMode] = useState(false)
  const [editId, setEditId] = useState('')

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(text && editMode){
      todoList.map(todo => {
        if(todo.id === editId){
          todo.text = text
        }
        return;
      })
    }
    else if (text) {
      const newTodo = {
        id: Math.floor(Math.random() * 1000),
        text,
      };
      setTodoList([...todoList, newTodo]);
    }

    setText("");
  };

  const deleteTodo = (id) => {
    const filterTodos = todoList.filter(todo => todo.id !== id)
    setTodoList(filterTodos)
    setText('')
    setEditMode(false)
  }


  const editTodo = (todo) => {
    setText(todo.text)
    setEditMode(true)
    setEditId(todo.id)
  }

  return (
    <div className="todo-app">
      <div className="title">
        <h1>What's Your Plan for Today?</h1>
      </div>
      <div className="input-form">
        <form action="#" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            className="input-box"
            placeholder="Add a Todo"
            value={text}
            name={text}
            onChange={(e) => handleChange(e)}
          />
          <div className="action-button">
            <button className="btn">{editMode ? 'Update' : 'Add'} Todo</button>
          </div>
        </form>
      </div>
      <div className="todo-list">
        {todoList.map((todo) => {
          return (
            <div className="to-do" key={todo.id}>
              <p>{todo.text}</p>
              <span className="h-line"></span>
              <div className="icons">
                <p>
                  <FaEdit onClick={(e) => editTodo(todo)}/>
                </p>
                <p>
                  <MdDeleteForever  onClick={(e) => deleteTodo(todo.id)}/>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
