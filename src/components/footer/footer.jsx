import React from "react";
import PropTypes from "prop-types";

import "./footer.css";
import { TasksFilter } from "../filters/filters";

export const Footer = ({ activeTasksCount, onFilterChange, onClearCompleted, filter }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{activeTasksCount()} items left</span>
      <TasksFilter onFilterChange={onFilterChange} filter={filter} />
      <button
        type="button"
        onClick={onClearCompleted}
        className="clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  activeTasksCount: PropTypes.func.isRequired,
};

