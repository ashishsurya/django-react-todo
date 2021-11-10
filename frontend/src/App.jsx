import React, { Component } from 'react';
import Modal from './components/Modal';
import axios from 'axios';

const todoItems = [
  {
    id: 1,
    title: 'Go to Market',
    description: 'Buy ingredients to prepare dinner',
    completed: true,
  },
  {
    id: 2,
    title: 'Study',
    description: 'Read Algebra and History textbook for the upcoming test',
    completed: false,
  },
  {
    id: 3,
    title: "Sammy's books",
    description: "Go to library to return Sammy's books",
    completed: true,
  },
  {
    id: 4,
    title: 'Article',
    description: 'Write article on how to use Django with React',
    completed: false,
  },
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      todoList: [],
      modal: false,
      activeItem: {
        title: '',
        description: '',
        completed: false,
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get('/api/todos/')
      .then((res) => this.setState({ todoList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();
    if (item.id) {
      axios
        .put(`/api/todos/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios.post('/api/todos', item).then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    axios.delete(`/api/todos/${item}/`).then((res) => this.refreshList);
  };

  createItem = () => {
    const item = { title: '', description: '', completed: false };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };

  renderTabsList = () => {
    return (
      <div className='nav nav-tabs'>
        <span
          className={this.state.viewCompleted ? 'nav-link active' : 'nav-link'}
          onClick={() => this.displayCompleted(true)}
        >
          Complete
        </span>
        <span
          className={this.state.viewCompleted ? 'nav-link' : 'nav-link active'}
          onClick={() => this.displayCompleted(false)}
        >
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.completed === viewCompleted
    );

    return newItems.map((item) => (
      <li
        key={item.id}
        className='list-group-item d-flex justify-content-between align-items-center'
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? 'completed-todo' : ''
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            onClick={() => this.editItem(item)}
            className='btn btn-secondary mr-2'
          >
            Edit
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className='btn btn-danger'
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className='container'>
        <h1 className='text-white text-uppercase text-center my-4'>Todo App</h1>
        <div className='row'>
          <div className='col-md-6 col-sm-10 mx-auto p-0'>
            <div className='card p-3'>
              <div className='mb-4'>
                <button onClick={this.createItem} className='btn btn-primary'>
                  Add Task
                </button>
              </div>
              {this.renderTabsList()}
              <ul className='list-grup list-group-flush border-top-0'>
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
