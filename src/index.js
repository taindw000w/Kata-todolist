import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/app";

const initialTasks = [
  {
    description: "Completed task",
    isDone: true,
    isEditing: false,
  },
  {
    description: "Editing task",
    isDone: false,
    isEditing: true,
  },
  {
    description: "Active task",
    isDone: false,
    isEditing: false,
  },
];

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(<App initialTasks={initialTasks} />);
