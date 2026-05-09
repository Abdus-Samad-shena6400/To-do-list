import React from "react";
import { Routes, Route } from "react-router-dom";
import TaskContext from "./context/TaskContext";
import ThemeContext from "./context/ThemeContext";
import Header from "./Component/Header";
import TaskList from "./Component/TaskList";
import TaskForm from "./Component/TaskForm";
import DoneList from "./Component/DoneList";
import AddButton from "./Component/AddButton";

class App extends React.Component {
  static contextType = TaskContext; 

  render() {
    const { showForm, activeTasks } = this.context;
    const location = this.props.location;

    const showHeader = !(location.pathname === "/" && activeTasks.length === 0);

    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-10 bg-(--bg) text-(--text) transition-colors duration-300">
            <div className="mx-auto w-full max-w-6xl space-y-6">
              {showHeader && <Header location={location} />}

              <Routes>
                <Route path="/done" element={<DoneList />} />
                <Route path="/tasks" element={<TaskList />} />

                <Route
                  path="/"
                  element={
                    activeTasks.length === 0 ? <AddButton /> : <TaskList />
                  }
                />
              </Routes>

              {showForm && <TaskForm />}
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default App;
