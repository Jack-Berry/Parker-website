import React, { Component } from "react";
import Nav from "./Nav";
import "../css/todo.scss";

const Todo = () => {
  return (
    <div className="todo-container">
      <h1>What To Do?</h1>
      <Nav />
    </div>
  );
};

export default Todo;
