import React, { useState, useEffect } from 'react';
import Modal from './components/Modal';
import axios from 'axios';  
import './app.scss';

const TodoApp = () => {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [activeItem, setActiveItem] = useState({
    title: "",
    description: "",
    completed: false
  });
  const [taskList, setTaskList] = useState([]);
  const [modal, setModal] = useState(false);

  // Use effect hook to mimic componentDidMount
  useEffect(() => {
    refreshList();
  }, []);

  // Refresh the list of tasks
  const refreshList = () => {
    axios
      .get("http://localhost:8000/todos/tasks")
      .then(res => setTaskList(res.data))
      .catch(err => console.log(err));
  };

  // Toggle between completed and incompleted tasks
  const displayCompleted = (status) => {
    setViewCompleted(status);
  };

  // Render the tabs for completed and incompleted tasks
  const renderTabList = () => {
    return (
      <div className="my-5 tab-list col-12 d-flex gap-5">
        <span
          onClick={() => displayCompleted(true)}
          className={viewCompleted ? "active btn bg-info" : "btn btn-light"}
        >
          Completed
        </span>
        <span
          onClick={() => displayCompleted(false)}
          className={viewCompleted ? "btn btn-light" : "active btn bg-info"}
        >
          Incompleted
        </span>
      </div>
    );
  };

  // Render the list of items based on the viewCompleted state
  const renderItems = () => {
    const newItems = taskList.filter(item => item.completed === viewCompleted);
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${viewCompleted ? "completed-todo" : ""}`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            onClick={() => editItem(item)}
            className="btn btn-secondary mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(item)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  // Toggle the modal state
  const toggle = () => {
    setModal(!modal);
  };

  // Handle the submission of a task
  const handleSubmit = (item) => {
    toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/todos/tasks/${item.id}/`, item)
        .then(res => refreshList());
    } else {
      axios
        .post("http://localhost:8000/todos/tasks/", item)
        .then(res => refreshList());
    }
  };

  // Handle the deletion of a task
  const handleDelete = (item) => {
    axios
      .delete(`http://localhost:8000/todos/tasks/${item.id}/`)
      .then(res => refreshList());
  };

  // Create a new task item
  const createItem = () => {
    const item = { title: "", description: "", completed: false };
    setActiveItem(item);
    toggle();
  };

  // Edit an existing task item
  const editItem = (item) => {
    setActiveItem(item);
    toggle();
  };

  return (
    <main>
      <h1 className="text-black text-uppercase text-center my-4">Todo App</h1>
      <div className="row ">
        <div className="col-md-12 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="">
              <button onClick={createItem} className="btn btn-primary">
                Add task
              </button>
            </div>
            {renderTabList()}
            <ul className="list-group list-group-flush">
              {renderItems()}
            </ul>
          </div>
        </div>
      </div>
      {modal ? (
        <Modal
          activeItem={activeItem}
          toggle={toggle}
          onSave={handleSubmit}
        />
      ) : null}
    </main>
  );
};

export default TodoApp;
