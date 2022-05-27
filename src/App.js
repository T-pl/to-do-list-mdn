
import React, { useState } from "react";
import { nanoid } from "nanoid";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import Tarefas from "./components/Tarefas";
const FILTER_MAP = {
  Todas: () => true,
  Atuais: task => !task.completed,
  Completas: task => task.completed
};


function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('Todas');
  const FILTER_NAMES = Object.keys(FILTER_MAP);
  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));


  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
    <Tarefas
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));
  const tasksNoun = taskList.length <= 1 ? 'Tarefa' : 'Tarefas';
  const headingText = `${taskList.length} ${tasksNoun}`;
  
  
  
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  function addTask(name) {
    const newTask = { id: "tarefa-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }
  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }
  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  return (
    <div className="todoapp stack-large">
      <h1>Lista de Tarefas</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
      {filterList}
      </div>
      <h2 id="list-heading">
      {headingText}
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}

      </ul>
    </div>
  );
}

export default App
