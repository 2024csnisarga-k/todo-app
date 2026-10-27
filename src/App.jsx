
import { Component } from "react";
import "./App.css";

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task-item">
      <span
        className={task.done ? "task-text completed" : "task-text"}
        onClick={() => onToggle(task.id)}
      >
        {task.text}
      </span>

      <button
        className="delete-btn"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </li>
  );
}

class App extends Component {
  state = {
    text: "",
    tasks: [],
    nextId: 1,
  };

  handleAdd = () => {
    const text = this.state.text.trim();

    if (!text) return;

    const newTask = {
      id: this.state.nextId,
      text,
      done: false,
    };

    this.setState((prevState) => ({
      tasks: [...prevState.tasks, newTask],
      text: "",
      nextId: prevState.nextId + 1,
    }));
  };

  handleToggle = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      ),
    }));
  };

  handleDelete = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter(
        (task) => task.id !== id
      ),
    }));
  };

  render() {
    const { text, tasks } = this.state;
    const completedCount = tasks.filter(
      (task) => task.done
    ).length;

    return (
      <div className="app">
        <div className="todo-card">
          <h1>My To-Do List</h1>

          <div className="input-row">
            <input
              type="text"
              placeholder="Enter a task..."
              value={text}
              onChange={(e) =>
                this.setState({ text: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") this.handleAdd();
              }}
            />

            <button onClick={this.handleAdd}>
              Add
            </button>
          </div>

          <p className="counter">
            {completedCount} of {tasks.length} tasks done
          </p>

          {tasks.length === 0 ? (
            <p className="empty">
              No tasks yet. Add one!
            </p>
          ) : (
            <ul className="task-list">
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={this.handleToggle}
                  onDelete={this.handleDelete}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default App;
