import React, {useState,useEffect} from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);
  useEffect(() => {
    if (todos.length > 0) {
      const json = JSON.stringify(todos);
      localStorage.setItem("todos", json);
    }
  }, [todos]);

  // Add the handlesubmit code here
  const handleSubmit = (e) => {
    e.preventDefault();
    let todo = document.getElementById('todoAdd').value;
    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false
    };
    if (newTodo.text.length > 0) {
      setTodos([...todos].concat(newTodo));
    }
    else {
      alert('Enter Valid Task');
    }
    document.getElementById('todoAdd').value = "";
  };


  // Add the deleteToDo code here
  const deleteTodo = (id) => {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };


  // Add the toggleComplete code here
  const toggleComplete = (id) => {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };


  // Add the submitEdits code here
  const submitEdits = (newTodo) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === newTodo.id) {
        todo.text = document.getElementById(newTodo.id).value;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  };

  
  return (
    <div id="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" id="todoAdd" placeholder="Add a new task"/>
        <button type="submit">Add Todo</button>
      </form>
      {
      todos.map((todo) => {
        return (
          <div key={todo.id} className="todo">
            <div className="todo-text">
              <input type="checkbox" id="completed" checked={todo.checked} onChange={() => toggleComplete(todo.id)}/>
              {
                // Use immediate-if to display a text input or the text value of the todo
                todo.id === todoEditing ? 
                (<input type="text" id={todo.id} defaultValue={todo.text}/>) :
                (<div>{todo.text}</div>)
              }
            </div>
            <div className="todo-actions">
              {
                // USe immediate-if to display the edit button or submit button for the todo
                todo.id === todoEditing ? 
                (<button onClick={() => submitEdits(todo)}>Submit Edits</button>) :
                (<button onClick={() => setTodoEditing(todo.id)}>Edit</button>)
              }
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </div>
        );
      })
      }
    </div>
  );
};
export default App;
