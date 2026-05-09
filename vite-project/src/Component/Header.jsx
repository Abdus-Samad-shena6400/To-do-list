import React from "react";
import { Link } from "react-router-dom";
import TaskContext from "../context/TaskContext";
import ThemeContext from "../context/ThemeContext";

class Header extends React.Component {
  static contextType = TaskContext;

  render() {
    const { openForm, activeCount, doneTasks, toggleTable } = this.context;
    const location = this.props.location;

    return (
      <ThemeContext.Consumer>
        {({ theme, changeTheme }) => (
          <>
           
            <div className="flex gap-2 justify-end mb-4 ">
              <button onClick={() => changeTheme("light")}>☀️</button>
              <button onClick={() => changeTheme("dark")}>🌙</button>
              <button onClick={() => changeTheme("blue")}>🔵</button>
            </div>

           
            <div
              className="flex flex-col gap-3 rounded-3xl p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between bg-card border border-border"
            >
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                <h1 className="text-2xl font-semibold sm:text-3xl text-(--text)">
                  {location.pathname === "/done"
                    ? "Done Tasks"
                    : "Active Tasks"}
                </h1>

                <div className="flex gap-2 mt-1 sm:mt-0 sm:ml-3">
                  <Link
                    to="/"
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                      location.pathname === "/" ||
                      location.pathname === "/tasks"
                        ? "bg-(--primary) text-(--primary-text)"
                        : "bg-(--secondary) text-(--secondary-text) hover:opacity-80"
                    }`}
                  >
                    Tasks ({activeCount})
                  </Link>

                  <Link
                    to="/done"
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                      location.pathname === "/done"
                        ? "bg-(--primary) text-(--primary-text)"
                        : "bg-(--secondary) text-(--secondary-text) hover:opacity-80"
                    }`}
                  >
                    Done ({doneTasks.length})
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-2 justify-end">
                {location.pathname !== "/done" && (
                  <button
                    onClick={openForm}
                    className="inline-flex items-center rounded-2xl px-4 py-2 text-sm font-semibold transition bg-(--primary) text-(--primary-text) hover:opacity-80"
                  >
                    + New Task
                  </button>
                )}

                <button
                  onClick={toggleTable}
                  className="inline-flex items-center justify-center rounded-2xl px-3 py-2 text-sm font-semibold transition bg-primary text-primary-text hover:opacity-80"
                >
                  <i className="fa-solid fa-bars"></i>
                </button>
              </div>
            </div>
          </>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default Header;
