import React from "react";
import PropTypes from "prop-types";

import "./newTaskForm.css";

export class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);

    const { initialLabel } = this.props;

    this.state = {
      label: initialLabel,
    };
  }


  render() {
    const { onAdd, initialLabel } = this.props;
    const { label } = this.state;

    const handleSubmit = (event) => {
      event.preventDefault();
      onAdd(label);
      this.setState({
        label: initialLabel,
      });
    };

    const handleChange = (event) => {
      this.setState({
        label: event.target.value,
      });
    };

    return (
      <form onSubmit={handleSubmit}>
        <input
          className="new-todo"
          onChange={handleChange}
          value={label}
          placeholder="What needs to be done?"
        />
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  initialLabel: "",
};

NewTaskForm.propTypes = {
  initialLabel: PropTypes.string,
  onAdd: PropTypes.func.isRequired,
};
