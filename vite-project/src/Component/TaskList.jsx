import React from "react";
import TaskContext from "../context/TaskContext";
import TaskCard from "./TaskCard";
import TableShowCardData from "./TableShowCardData";
import { useLocation } from "react-router-dom";
class TaskList extends React.Component {
  static contextType = TaskContext;
 
  render() {
    const { activeTasks } = this.context;
    const sortedTasks = [...activeTasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const tasks=this.context.tasks;
    const isTable=this.context.isTable;
    
    const doneTasks=this.context.doneTasks;
    

    
   
    return (
     <div>
      {isTable ? (
        <TableShowCardData tasks={activeTasks} />
      ) : (
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
        {activeTasks.length === 0 ? (
          <p className="text-(--text) bg-(--card) rounded-lg p-1">No tasks found</p>
        ) : (
          activeTasks.map((task) => (
            <TaskCard key={task.id} task={task} />

          ))
        )}
      </div>
      )}

     </div>
    );
  }
}

export default TaskList;