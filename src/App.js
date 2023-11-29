import './App.css';
import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");

  const priorityOrder = { high: 1, medium: 2, low: 3 };

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") {
      return task.completed;
    } else if (filter === "active") {
      return !task.completed;
    }
    return true;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sort === "newest") {
      return b.id - a.id;
    } else if (sort === "oldest") {
      return a.id - b.id;
    } else if (sort === "priority") {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    } else {
    return 0;
    }
  });

  const filteredSortedTasks = sortedTasks;

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Function to add a new task
  const addTask = (text, priority = 'low', category = '', dueDate = "") => {
    const newId = new Date().getTime();
    const updatedTasks = [...tasks, { id: newId, text: text, completed: false, priority, category, dueDate }];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Function to remove a task
  const removeTask = (idToRemove) => {
    const newTasks = tasks.filter(task => task.id !== idToRemove);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  // Function for toggling tasks as completed
  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return {...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  //Function for editing tasks
  const editTask = (id, newText) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return {...task, text: newText};
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div className="App">
      <h1>Task List</h1>
      <TaskForm addTask={addTask}/>

      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <select onChange={(e) => setSort(e.target.value)} value={sort}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="priority">By priority</option>
        </select>
      </div>

      <TaskList 
      tasks ={filteredSortedTasks} 
      removeTask={removeTask} 
      toggleTaskCompletion={toggleTaskCompletion}
      editTask={editTask}
      />
    </div>
  );
}

export default App;
