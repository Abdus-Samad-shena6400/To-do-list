import React from "react";
import TaskContext from "./TaskContext";
import TableShowCardData from "../Component/TableShowCardData";

class TaskProvider extends React.Component {
  constructor(props) {
    super(props);

    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const savedView = localStorage.getItem("isTable");

    this.state = {
      tasks: savedTasks,
      showForm: false,
      editingTask: null,
      isTable: savedView === "true" ? true : false,
    };
  }

  // TOGGLE TABLE VIEW
  toggleTable = () => {
    this.setState(
      (prev) => ({
        isTable: !prev.isTable,
      }),
      () => {
        localStorage.setItem("isTable", JSON.stringify(this.state.isTable));
      }
    );
  };


  // ADD NEW TASK
  addTask = (task) => {
    const updated = [...this.state.tasks, { ...task, isDone: false }];

    localStorage.setItem("tasks", JSON.stringify(updated));

    this.setState({
      tasks: updated,
      showForm: false,
    });
  };

  // UPDATE TASK (EDIT)
  updateTask = (updatedTask) => {
    const updated = this.state.tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );

    localStorage.setItem("tasks", JSON.stringify(updated));

    this.setState({
      tasks: updated,
      showForm: false,
      editingTask: null,
    });
  };

  // MARK AS DONE
  markDone = (id) => {
    const updated = this.state.tasks.map((t) =>
      t.id === id && !t.isDone ? { ...t, isDone: true } : t
    );

    localStorage.setItem("tasks", JSON.stringify(updated));

    this.setState({ tasks: updated });
  };

  // MARK AS UNDONE
  markUndone = (id) => {
    const updated = this.state.tasks.map((t) =>
      t.id === id && t.isDone ? { ...t, isDone: false } : t
    );

    localStorage.setItem("tasks", JSON.stringify(updated));

    this.setState({ tasks: updated });
  };

  // DELETE TASK
  deleteTask = (id) => {
    const updated = this.state.tasks.filter((t) => t.id !== id);

    localStorage.setItem("tasks", JSON.stringify(updated));

    this.setState({ tasks: updated });
  };

  // EDIT TASK (OPEN FORM WITH DATA)
  editTask = (task) => {
    this.setState({
      showForm: true,
      editingTask: task,
    });
  };

  // OPEN EMPTY FORM
  openForm = () => {
    this.setState({
      showForm: true,
      editingTask: null,
    });
  };

  // CLOSE FORM
  closeForm = () => {
    this.setState({
      showForm: false,
      editingTask: null,
    });
  };

  render() {
    const activeTasks = this.state.tasks.filter((t) => !t.isDone);
    const doneTasks = this.state.tasks.filter((t) => t.isDone);
    const activeCount = this.state.tasks.filter((t) => !t.isDone).length;

    return (
      <TaskContext.Provider
        value={{
          tasks: this.state.tasks,
          activeTasks,
          doneTasks,
          activeCount,
          showForm: this.state.showForm,
          editingTask: this.state.editingTask,
          isTable: this.state.isTable,
          toggleTable: this.toggleTable,
          addTask: this.addTask,
          updateTask: this.updateTask,
          deleteTask: this.deleteTask,
          editTask: this.editTask,
          markDone: this.markDone,
          markUndone: this.markUndone,
          openForm: this.openForm,
          closeForm: this.closeForm,
        }}
      >
        {this.props.children}
      </TaskContext.Provider>
    );
  }
}

export default TaskProvider;