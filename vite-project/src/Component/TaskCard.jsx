import React from "react";
import TaskContext from "../context/TaskContext";
import ThemeContext from "../context/ThemeContext";

class TaskCard extends React.Component {
  static contextType = TaskContext;

  handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );
    if (confirmed) {
      const { deleteTask } = this.context;
      deleteTask(this.props.task.id);
    }
  };

  render() {
    const { task, mode = "active" } = this.props;
    const { editTask, markDone, markUndone } = this.context;
   

    const isOverdue = new Date(task.dueDate) < new Date() && !task.isDone;

    const truncate = (text, maxLength) => {
      return text.length > maxLength
        ? text.substring(0, maxLength) + "..."
        : text;
    };

    return (
      <ThemeContext.Consumer>
        {({ theme }) => {
          let cardClass = "flex h-full flex-col justify-between rounded-3xl p-2 shadow-sm transition-all duration-200 hover:shadow-lg hover:scale-105 animate-fade-in relative bg-(--card) text-(--text) border-2 ";
          
          if (isOverdue) {
            cardClass += "border-red-500 border-4";
          } else {
            cardClass += "border-(--border)";
          }

          return (
            <>
              <div
                className={cardClass}
            >
              <div className="flex gap-2 absolute top-3 right-3">
                {mode === "active" && !task.isDone && (
                  <button
                    onClick={() => editTask(task)}
                    className="w-8 h-8 flex items-center justify-center text-(--text) rounded-full transition-colors hover:opacity-80"
                    title="Edit task"
                  >
                    ✏️
                  </button>
                )}

                {mode === "active" && (
                  <button
                    onClick={() => markDone(task.id)}
                    className="w-8 h-8 flex items-center justify-center text-(--text) bg-(--card) rounded-full transition-colors hover:opacity-80"
                    title={task.isDone ? "Already done" : "Mark as done"}
                  >
                    {task.isDone ? "✔️" : "✅"}
                  </button>
                )}

                {mode === "done" && (
                  <button
                    onClick={() => markUndone(task.id)}
                    className="w-8 h-8 flex items-center justify-center text-(--text) bg-(--card) rounded-full transition-colors hover:opacity-80"
                    title="Mark as undone"
                  >
                    ↩️
                  </button>
                )}

                <button
                  onClick={this.handleDelete}
                  className="w-8 h-8 flex items-center justify-center text-(--text) bg-(--card) rounded-full transition-colors hover:opacity-80"
                  title="Delete task"
                >
                  🗑️
                </button>
              </div>

              <div className="space-y-3 pt-8">
                <h2
                  className="text-xl font-semibold text-(--text) bg-(--card) rounded-lg p-1"
                  title={task.title}
                >
                  {truncate(task.title, 10)}
                </h2>

                <p
                  className="text-sm leading-6 text-(--text) bg-(--card) rounded-lg p-1"
                  title={task.description || "No description"}
                >
                  {truncate(task.description || "No description", 13)}
                </p>

                <p className="text-xs uppercase tracking-[0.18em] text-(--text) bg-(--card) rounded-lg p-1">
                  Created: {new Date(task.createdAt).toLocaleDateString()}
                </p>

                <p className="text-xs uppercase tracking-[0.18em] text-(--text) bg-(--card) rounded-lg p-1">
                  Due: {task.dueDate} 

                </p>
              </div>
            </div>
             
            </>

          );
        }}

      </ThemeContext.Consumer>

    );
  }
}
export default TaskCard;
