import React from "react";
import PropTypes from "prop-types";

import "./filters.css";

export const TasksFilter = ({ filter, onFilterChange }) => {
  const buttons = [ 
    { name: 'All', label: 'All' },
    { name: 'Active', label: 'Active' },
    { name: 'Completed', label: 'Completed' },
  ]
  const destructureFilters = buttons.map(({name, label}) => {
    const isActive = filter === name;
    const className = isActive ? 'selected' : '';

    return (
      <li key={name}>
        <button className={`${className}`} type="button" onClick={()=> onFilterChange(name)}>
          {label}
        </button>
      </li>
    )
  })
  
  return (
    <ul className="filters">{destructureFilters}</ul>
  )
}

TasksFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired
};
