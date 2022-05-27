import React, { useState } from "react";


function Form(props) {
  const [name, setName] = useState('');

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    if (name.length === 0) {
      alert("Digite uma Tarefa!");
    } 
    e.preventDefault();
    props.addTask(name);
    setName("");

  }
  

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          O que preciso fazer?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Adicionar
      </button>
    </form>
  );
}

export default Form