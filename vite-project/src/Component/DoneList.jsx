import React from "react";
import TaskContext from "../context/TaskContext";
import TaskCard from "./TaskCard";
import TableShowCardData from "./TableShowCardData";

class DoneList extends React.Component {
  static contextType = TaskContext;

  render() {
    const { doneTasks, isTable } = this.context;
    console.log("DoneList - doneTasks:", isTable, doneTasks, isTable);

    return (
      isTable ? (
        <TableShowCardData tasks={doneTasks} mode="done"  />
        
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
          {doneTasks.length === 0 ? (
            <p className="text-(--text)">No completed tasks</p>
          ) : (
            doneTasks.map((task) => (
              <TaskCard key={task.id} task={task} mode="done" />
            ))
          )}
        </div>
      )
    );
  }
}

export default DoneList;