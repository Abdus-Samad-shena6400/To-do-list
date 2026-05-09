import React from "react";
import TaskContext from "../context/TaskContext";
import ThemeContext from "../context/ThemeContext";

class TaskForm extends React.Component {
  static contextType = TaskContext;

  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      dueDate: "",
    };
  }

  componentDidMount() {
    const { editingTask } = this.context;

    if (editingTask) {
      this.setState({
        title: editingTask.title || "",
        description: editingTask.description || "",
        dueDate: editingTask.dueDate || "",
      });
    }
  }

  componentDidUpdate() {
    const { editingTask } = this.context;

    if (!editingTask && this.lastEditingTaskId) {
      this.lastEditingTaskId = null;
      this.setState({ title: "", description: "", dueDate: "" });
    }

    if (editingTask && editingTask.id !== this.lastEditingTaskId) {
      this.lastEditingTaskId = editingTask.id;
      this.setState({
        title: editingTask.title || "",
        description: editingTask.description || "",
        dueDate: editingTask.dueDate || "",
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { addTask, updateTask, editingTask, closeForm } = this.context;

    const task = {
      id: editingTask ? editingTask.id : Date.now(),
      title: this.state.title,
      description: this.state.description,
      dueDate: this.state.dueDate,
      isDone: editingTask?.isDone || false,
      createdAt: editingTask?.createdAt || new Date().toISOString(),
    };

    editingTask ? updateTask(task) : addTask(task);

    closeForm();
  };

  render() {
    const { closeForm, editingTask } = this.context;

    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
            <div className="p-6 rounded-xl w-96 max-w-[90vw] bg-(--card) text-(--text) border border-(--border)">
              <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold text-(--text)">
                  {editingTask ? "Edit Task" : "Add New Task"}
                </h1>
                <button
                  onClick={closeForm}
                  className="text-(--text) text-xl font-bold hover:opacity-80 transition"
                  title="Close"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={this.handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-(--text) mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter task title"
                    className="w-full p-2 rounded border bg-(--card) text-(--text) border-(--border)"
                    value={this.state.title}
                    onChange={(e) => this.setState({ title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-(--text) mb-1">
                    Description
                  </label>
                  <textarea
                    placeholder="Enter task description"
                    className="w-full p-2 rounded border bg-(--card) text-(--text) border-(--border)"
                    rows="3"
                    value={this.state.description}
                    onChange={(e) =>
                      this.setState({ description: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-(--text) mb-1">
                    Due Date
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full p-2 rounded border bg-(--card) text-(--text) border-(--border)"
                    value={this.state.dueDate}
                    onChange={(e) => this.setState({ dueDate: e.target.value })}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="px-4 py-2 text-(--text) border border-(--border) rounded-lg hover:opacity-80 transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-(--primary) text-(--primary-text) rounded-lg hover:opacity-80 transition-colors font-medium"
                  >
                    {editingTask ? "Update Task" : "Save Task"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default TaskForm;
