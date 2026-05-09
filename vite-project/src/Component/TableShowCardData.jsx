import React from "react";
import TaskContext from "../context/TaskContext";
import ThemeContext from "../context/ThemeContext";

class TableShowCardData extends React.Component {
  static contextType = TaskContext;

  handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmed) {
      const { deleteTask } = this.context;
      deleteTask(id);
    }
  };

  markDone = (id) => {
    const { markDone } = this.context;
    markDone(id);
  };

  render() {
    const { tasks = [], mode } = this.props;
    const { editTask, markUndone } = this.context;
    const isOverdue = new Date(tasks.dueDate) < new Date() && !tasks.isDone;

    const truncate = (text = "", maxLength) => {
      return text.length > maxLength
        ? text.substring(0, maxLength) + "..."
        : text;
    };

    return (
      <ThemeContext.Consumer>
        {({ theme }) => {
          let cardClass=''
          if (isOverdue) {
            cardClass += "border-red-500 border-4";
          } else {
            cardClass += "border-(--border)";
          }

          return (
            <div className="bg-(--card) text-(--text) card-(--card) rounded-3xl p-2 shadow-sm">
              <table className="min-w-full border border-(--border)">
                <thead className="bg-(--secondary) text-(--secondary-text) rounded-t-3xl">
                  <tr className="text-left uppercase text-sm">
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Created</th>
                    <th className="py-3 px-4">Due Date</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {tasks.map((item) => {
                    const isOverdue =
                      new Date(item.dueDate) < new Date() &&
                      !item.isDone;

                    return (
                      <tr key={item.id} className="border-b border-(--border) last:border-0">
                        <td
                          title={item.title}
                          className={`py-3 px-4 text-(--text) ${
                            item.isDone ? "line-through opacity-60" : ""
                          }`}
                        >
                          {truncate(item.title, 13)}
                        </td>

                        <td
                          title={item.description}
                          className={`py-3 px-4 text-(--text) ${
                            item.isDone ? "line-through opacity-60" : ""
                          }`}
                        >
                          {truncate(item.description, 13)}
                        </td>

                        <td className="py-3 px-4 text-(--text)">
                          {item.createdAt}
                        </td>

                        <td className="py-3 px-4 text-(--text) ${isOverdue ? 'text-red-500' : ''}">
                          {item.dueDate}
                        </td>

                        <td className="py-3 px-4 space-x-2">
                          {!item.isDone && (
                            <button
                              onClick={() => editTask(item)}
                              className="px-3 py-1 bg-(--primary) text-(--primary-text) rounded hover:opacity-80 transition inline-block"
                            >
                              ✏️
                            </button>
                          )}

                          {!item.isDone && (
                            <button
                              onClick={() =>
                                this.markDone(item.id)
                              }
                              className="px-3 py-1 bg-(--primary) text-(--primary-text) rounded hover:opacity-80 transition inline-block"
                            >
                              ✅
                            </button>
                          )}

                          {mode === "done" && (
                            <button
                              onClick={() =>
                                markUndone(item.id)
                              }
                              className="px-3 py-1 bg-(--secondary) text-(--secondary-text) rounded hover:opacity-80 transition inline-block"
                            >
                              ↩️
                            </button>
                          )}

                          <button
                            onClick={() =>
                              this.handleDelete(item.id)
                            }
                            className="px-3 py-1 bg-(--primary) text-(--primary-text) rounded hover:opacity-80 transition inline-block"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

export default TableShowCardData;