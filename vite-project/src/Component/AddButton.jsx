import React from "react";
import TaskContext from "../context/TaskContext";

class AddButton extends React.Component {
  static contextType = TaskContext;

  render() {
    const { openForm } = this.context;

    return (
      <div className="flex justify-center items-center h-[70vh]">
        <button
          onClick={openForm}
          className="bg-(--bg) text-(--text) card-(--card) border-(--border) px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 hover:opacity-80"
        >
          <span className="text-2xl ">+</span>
          Add Task
        </button>
      </div>
    );
  }
}

export default AddButton;