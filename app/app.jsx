import React from "react";
import PropTypes from "prop-types";

import "./app.css";

import { TaskList } from "../taskList/taskList";
import { Footer } from "../footer/footer";
import { NewTaskForm } from "../newTaskForm/newTaskForm";

export class App extends React.Component {
  constructor(props) {
    super(props);
    const { initialTasks, initialFilter } = this.props;
    
    this.currentID = 1;

    this.incrementID = () => {
      this.currentID += this.currentID + 1;
      return this.currentID;
    };

    this.createTask = (
      description,
      time = 0,
      isDone = false,
      isEditing = false,
      createdDate = new Date(),
      id = this.incrementID()
    ) => {
      return {
        description,
        isDone,
        isEditing,
        time,
        createdDate,
        id,
      };
    };

    this.state = {
      tasksData: initialTasks.map((task) => {
        return this.createTask(task.description, task.time, task.isDone, task.isEditing);
      }),
      filter: initialFilter,
    };

  }

  render() {
    const { tasksData, filter} = this.state;

    const addTask = (label, min = 12, sec = 2) => {
      const newTask = this.createTask(label, ((parseInt(min * 60) + parseInt(sec))));

      if (label === '' || isNaN(min) || isNaN(sec)) return null;
      
      this.setState((state) => {
        const newTasksData = [...state.tasksData, newTask];

        return {
          tasksData: newTasksData,
        };
      });
    };

    const findIndexByID = (id) => {
      const { tasksData } = this.state;

      return tasksData.findIndex((task) => task.id === id);
    };

    const toggleProperty = (property, id) => {
      this.setState((state) => {
        const index = findIndexByID(id);

        const modifiedTaskData = {
          ...state.tasksData[index],
          [property]: !state.tasksData[index][property],
        };

        const modifiedTasksData = [
          ...state.tasksData.slice(0, index),
          modifiedTaskData,
          ...state.tasksData.slice(index + 1),
        ];

        return {
          tasksData: modifiedTasksData,
        };
      });
    };

    const deleteTask = (id) => {
      this.setState((state) => {
        const index = findIndexByID(id);

        const newTasksData = [
          ...state.tasksData.slice(0, index),
          ...state.tasksData.slice(index + 1),
        ];
        
        return {
          tasksData: newTasksData,
        };
      });
    };

    const handleFilterChange = (newFilter) => {
      this.setState({
        filter: newFilter,
      });
    };

    const clearCompleted = () => {
      const { tasksData } = this.state;

      const activeTasks = tasksData.filter((task) => !task.isDone);

      this.setState({
        tasksData: activeTasks,
      });
    };

    const countActiveTasks = () => {
      const { tasksData } = this.state;

      return tasksData.filter((task) => !task.isDone).length;
    };

    const changeDescription = (description, id) => {
      this.setState((state) => {
        const index = findIndexByID(id);

        const modifiedTaskData = {
          ...state.tasksData[index],
          description,
        };

        const modifiedTasksData = [
          ...state.tasksData.slice(0, index),
          modifiedTaskData,
          ...state.tasksData.slice(index + 1),
        ];

        return {
          tasksData: modifiedTasksData,
        };
      });
    };

    const finishEditing = (id) => {
      this.setState((state) => {
        const index = findIndexByID(id);

        const modifiedTaskData = {
          ...state.tasksData[index],
          isEditing: false,
        };

        const modifiedTasksData = [
          ...state.tasksData.slice(0, index),
          modifiedTaskData,
          ...state.tasksData.slice(index + 1),
        ];

        return {
          tasksData: modifiedTasksData,
        };
      });
    };

    return (
      <div>
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <NewTaskForm 
              onAdd={addTask} 
            />
          </header>
          <section className="main">
            <TaskList
              tasksData={tasksData}
              onToggleProperty={toggleProperty}
              filter={filter}
              onChangeDescription={changeDescription}
              onFinishEditing={finishEditing}
              onDelete={deleteTask}
            />
            <Footer
              filter={filter}
              onFilterChange={handleFilterChange}
              onClearCompleted={clearCompleted}
              activeTasksCount={countActiveTasks}
            />
          </section>
        </section>
      </div>
    );
  }
}

App.defaultProps = {
  initialTasks: [],
  initialFilter: "All",
};

App.propTypes = {
  initialTasks: PropTypes.arrayOf(PropTypes.object),
  initialFilter: PropTypes.oneOf(["All", "Active", "Completed"]),
};
