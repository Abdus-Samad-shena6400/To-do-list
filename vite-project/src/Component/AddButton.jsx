import React from "react";
import TaskContext from "../context/TaskContext";

class AddButton extends React.Component {
  static contextType = TaskContext;

  render() {
    const { openForm } = this.context;

    return (
      <div className="flex flex-col justify-between items-center h-[80vh] relative w-full">
        {/* Main button centered vertically */}
        <div className="flex-1 flex justify-center items-center">
          <button
            onClick={openForm}
            className="bg-(--bg) text-(--text) card-(--card) border-(--border) px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 hover:opacity-80 hover:-translate-y-1"
          >
            <span className="text-2xl ">+</span>
            Add Task
          </button>
        </div>

        {/* Footer section */}
        <div className="w-full mb-2">
          <div className="bg-(--card) border border-(--border) rounded-2xl p-5 flex items-center gap-5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:border-emerald-500/50">
            {/* Profile Image */}
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-500 shrink-0 shadow-inner">
              <img 
                src="/profile.jpeg" 
                alt="Abdus Samad" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            
            {/* Name and Text */}
            <div className="flex flex-col text-left overflow-hidden">
              <h3 className="font-bold text-xl text-(--text) tracking-wide">Abdus Samad</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                Web Developer | Crafting elegant, interactive, and highly responsive web applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddButton;